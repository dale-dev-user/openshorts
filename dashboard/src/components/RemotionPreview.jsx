import React, { useMemo } from 'react';
import { Player } from '@remotion/player';
import { ShortVideo } from '../remotion/compositions/ShortVideo';

/**
 * モーダル内のリアルタイムプレビュー用に Remotion の Player をラップ。
 * Remotion コンポジションと同じ ShortVideoProps を受け取る。
 *
 * @param {object} props
 * @param {string} props.videoUrl - ベースクリップの動画 URL
 * @param {number} props.durationInSeconds - 動画の長さ（秒）
 * @param {object|null} props.subtitles - SubtitleConfig もしくは null
 * @param {object|null} props.hook - HookConfig もしくは null
 * @param {object|null} props.effects - EffectsConfig もしくは null
 * @param {string} [props.className] - 追加 CSS クラス
 */
export default function RemotionPreview({
    videoUrl,
    durationInSeconds = 30,
    subtitles = null,
    hook = null,
    effects = null,
    className = '',
}) {
    const fps = 30;
    const durationInFrames = Math.max(1, Math.round(durationInSeconds * fps));

    const inputProps = useMemo(
        () => ({
            videoUrl,
            durationInFrames,
            fps,
            width: 1080,
            height: 1920,
            subtitles,
            hook,
            effects,
        }),
        [videoUrl, durationInFrames, subtitles, hook, effects]
    );

    return (
        <div className={`w-full h-full ${className}`}>
            <Player
                component={ShortVideo}
                inputProps={inputProps}
                durationInFrames={durationInFrames}
                fps={fps}
                compositionWidth={1080}
                compositionHeight={1920}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                controls
                autoPlay
                loop
            />
        </div>
    );
}
