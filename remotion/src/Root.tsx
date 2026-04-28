import React from "react";
import { Composition } from "remotion";
import { ShortVideo } from "./compositions/ShortVideo";
import type { ShortVideoProps } from "./lib/types";
import { shortVideoPropsSchema } from "./lib/types";

const DEFAULT_PROPS: ShortVideoProps = {
  videoUrl: "",
  durationInFrames: 900, // 30fps で 30 秒
  fps: 30,
  width: 1080,
  height: 1920,
  subtitles: {
    captions: [
      { text: "これは", startMs: 0, endMs: 600 },
      { text: "Remotion", startMs: 600, endMs: 1400 },
      { text: "の", startMs: 1400, endMs: 1600 },
      { text: "アニメーション", startMs: 1600, endMs: 2600 },
      { text: "字幕", startMs: 2600, endMs: 3200 },
      { text: "デモ", startMs: 3200, endMs: 3800 },
      { text: "です", startMs: 3800, endMs: 4400 },
      { text: "単語", startMs: 4500, endMs: 5000 },
      { text: "ごとに", startMs: 5000, endMs: 5500 },
      { text: "ハイライト", startMs: 5500, endMs: 6000 },
    ],
    position: "bottom",
    style: {
      fontFamily: "Arial",
      fontSize: 52,
      fontColor: "#FFFFFF",
      highlightColor: "#FFDD00",
      borderColor: "#000000",
      borderWidth: 3,
      bgColor: "#000000",
      bgOpacity: 0,
      animation: "pop",
    },
  },
  hook: {
    text: "POV: OpenShorts を見つけてしまった",
    position: "top",
    size: "M",
    entranceAnimation: "spring",
    displayDurationSec: 5,
  },
  effects: {
    segments: [
      {
        startSec: 2,
        endSec: 5,
        zoom: 1.2,
        zoomCenterX: 0.5,
        zoomCenterY: 0.35,
        brightness: 1.05,
        contrast: 1.1,
        saturate: 1.15,
      },
      {
        startSec: 8,
        endSec: 12,
        zoom: 1.15,
        zoomCenterX: 0.5,
        zoomCenterY: 0.4,
        brightness: 1,
        contrast: 1,
        saturate: 1,
      },
    ],
  },
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShortVideo"
        schema={shortVideoPropsSchema}
        component={ShortVideo}
        durationInFrames={DEFAULT_PROPS.durationInFrames}
        fps={DEFAULT_PROPS.fps}
        width={DEFAULT_PROPS.width}
        height={DEFAULT_PROPS.height}
        defaultProps={DEFAULT_PROPS}
      />
    </>
  );
};
