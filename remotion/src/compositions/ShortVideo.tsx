import React from "react";
import { AbsoluteFill } from "remotion";
import { Video } from "@remotion/media";
import type { ShortVideoProps } from "../lib/types";
import { Subtitles } from "./Subtitles";
import { HookOverlay } from "./HookOverlay";
import { VideoEffects } from "./VideoEffects";

/**
 * ベース動画の上に各種ポストプロセス（エフェクト・字幕・フック）を重ねるメインコンポジション。
 * ブラウザ側レンダリング互換のため @remotion/media の Video を使用。
 */
export const ShortVideo: React.FC<Record<string, unknown>> = (rawProps) => {
  const { videoUrl, subtitles, hook, effects } =
    rawProps as unknown as ShortVideoProps;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* レイヤー1: ベース動画（ズーム/色味エフェクトを任意で適用） */}
      {videoUrl && (
        <VideoEffects config={effects}>
          <Video
            src={videoUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </VideoEffects>
      )}

      {/* レイヤー2: アニメーション字幕 */}
      {subtitles && <Subtitles config={subtitles} />}

      {/* レイヤー3: フック（テキストオーバーレイ） */}
      {hook && <HookOverlay config={hook} />}
    </AbsoluteFill>
  );
};
