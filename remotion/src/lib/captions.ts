import type { CaptionWord } from "./types";

export interface CaptionBlock {
  words: CaptionWord[];
  startMs: number;
  endMs: number;
  text: string;
}

/**
 * 単語単位のキャプションを表示ブロックに束ねる。
 * OpenShorts の generate_srt と同じロジック（ブロックあたり最大文字数・最大秒数）。
 */
export function groupCaptionsIntoBlocks(
  captions: CaptionWord[],
  maxChars = 20,
  maxDurationMs = 2000
): CaptionBlock[] {
  const blocks: CaptionBlock[] = [];
  let currentWords: CaptionWord[] = [];
  let blockStartMs = 0;

  for (const word of captions) {
    if (currentWords.length === 0) {
      currentWords.push(word);
      blockStartMs = word.startMs;
      continue;
    }

    const currentTextLen = currentWords.reduce(
      (sum, w) => sum + w.text.length + 1,
      0
    );
    const duration = word.endMs - blockStartMs;

    if (
      currentTextLen + word.text.length > maxChars ||
      duration > maxDurationMs
    ) {
      // 現在のブロックを確定
      const lastWord = currentWords[currentWords.length - 1];
      blocks.push({
        words: [...currentWords],
        startMs: blockStartMs,
        endMs: lastWord.endMs,
        text: currentWords.map((w) => w.text).join(" "),
      });

      currentWords = [word];
      blockStartMs = word.startMs;
    } else {
      currentWords.push(word);
    }
  }

  // 末尾のブロック
  if (currentWords.length > 0) {
    const lastWord = currentWords[currentWords.length - 1];
    blocks.push({
      words: [...currentWords],
      startMs: blockStartMs,
      endMs: lastWord.endMs,
      text: currentWords.map((w) => w.text).join(" "),
    });
  }

  return blocks;
}

/**
 * 指定時刻（ミリ秒）にアクティブな単語のインデックスを返す。
 */
export function getActiveWordIndex(
  words: CaptionWord[],
  timeMs: number
): number {
  for (let i = 0; i < words.length; i++) {
    if (timeMs >= words[i].startMs && timeMs < words[i].endMs) {
      return i;
    }
  }
  return -1;
}
