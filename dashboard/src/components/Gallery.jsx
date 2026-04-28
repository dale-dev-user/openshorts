import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LayoutGrid, AlertCircle, Loader2 } from 'lucide-react';
import { getApiUrl } from '../config';
import GalleryCard from './GalleryCard';

const CLIPS_PER_PAGE = 20;

export default function Gallery() {
    const [clips, setClips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const loaderRef = useRef(null);

    const fetchClips = useCallback(async (currentOffset = 0, append = false) => {
        try {
            if (currentOffset === 0) setLoading(true);
            else setLoadingMore(true);

            const res = await fetch(
                getApiUrl(`/api/gallery/clips?limit=${CLIPS_PER_PAGE}&offset=${currentOffset}`)
            );
            if (!res.ok) throw new Error('クリップの取得に失敗しました');
            const data = await res.json();

            const newClips = data.clips || [];

            if (append) {
                setClips(prev => [...prev, ...newClips]);
            } else {
                setClips(newClips);
            }

            setHasMore(data.has_more ?? newClips.length === CLIPS_PER_PAGE);
            setOffset(currentOffset + newClips.length);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    // 初回ロード
    useEffect(() => {
        fetchClips(0, false);
    }, [fetchClips]);

    // 無限スクロール用オブザーバ
    useEffect(() => {
        if (!hasMore || loadingMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingMore) {
                    fetchClips(offset, true);
                }
            },
            { rootMargin: '200px', threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [hasMore, loadingMore, loading, offset, fetchClips]);

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 animate-[fadeIn_0.5s_ease-out]">
                <Loader2 size={32} className="animate-spin mb-4 text-primary" />
                <p>過去のクリップを読み込み中...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-red-400 p-6">
                <AlertCircle size={32} className="mb-4" />
                <p>ギャラリー読み込みエラー: {error}</p>
                <button
                    onClick={() => {
                        setError(null);
                        setOffset(0);
                        fetchClips(0, false);
                    }}
                    className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
                >
                    再試行
                </button>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto p-6 md:p-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <LayoutGrid className="text-primary" /> クリップギャラリー
                </h1>
                <span className="text-xs bg-white/10 text-white px-3 py-1 rounded-full border border-white/5">
                    {clips.length} クリップ{hasMore ? '+' : ''}
                </span>
            </div>

            {clips.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">
                    <p className="text-lg mb-2">クリップはまだありません。</p>
                    <p className="text-sm">動画を処理してギャラリーを埋めましょう。</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-10">
                        {clips.map((clip, i) => (
                            <GalleryCard key={`${clip.job_id}-${clip.index}`} clip={clip} />
                        ))}
                    </div>

                    {/* 無限スクロールのトリガ要素 */}
                    {hasMore && (
                        <div
                            ref={loaderRef}
                            className="flex justify-center py-8"
                        >
                            {loadingMore && (
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Loader2 size={20} className="animate-spin" />
                                    <span className="text-sm">クリップを追加で読み込み中...</span>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

