import { renderMediaOnWeb } from '@remotion/web-renderer';
import { ShortVideo } from '../remotion/compositions/ShortVideo';

/**
 * WebCodecs を用いてブラウザ上で Remotion コンポジションを直接レンダリング。
 * 生成された MP4 の Blob URL を返す。
 *
 * @param {object} params
 * @param {string} params.videoUrl - ソース動画 URL
 * @param {number} params.durationInSeconds - 動画の長さ
 * @param {object|null} params.subtitles - SubtitleConfig
 * @param {object|null} params.hook - HookConfig
 * @param {object|null} params.effects - EffectsConfig
 * @param {function} [params.onProgress] - 進捗コールバック (0-1)
 * @param {AbortSignal} [params.signal] - キャンセル用 AbortSignal
 * @returns {Promise<string>} レンダリング済み MP4 の Blob URL
 */
export async function renderInBrowser({
    videoUrl,
    durationInSeconds = 30,
    subtitles = null,
    hook = null,
    effects = null,
    onProgress,
    signal,
}) {
    const fps = 30;
    const durationInFrames = Math.max(1, Math.round(durationInSeconds * fps));

    const { getBlob } = await renderMediaOnWeb({
        composition: {
            component: ShortVideo,
            durationInFrames,
            fps,
            width: 1080,
            height: 1920,
            id: 'ShortVideo',
            calculateMetadata: null,
        },
        inputProps: {
            videoUrl,
            durationInFrames,
            fps,
            width: 1080,
            height: 1920,
            subtitles,
            hook,
            effects,
        },
        container: 'mp4',
        videoCodec: 'h264',
        videoBitrate: 'high',
        audioCodec: 'aac',
        onProgress: onProgress
            ? ({ progress }) => onProgress(progress)
            : undefined,
        signal,
    });

    const blob = await getBlob();
    return URL.createObjectURL(blob);
}

/**
 * Blob URL を MP4 ファイルとしてダウンロードさせる。
 */
export function downloadBlobUrl(blobUrl, filename = 'output.mp4') {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
