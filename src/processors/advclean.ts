import type { IntentResult } from "../types";
import type { PipelineComponent } from "../core/types";

function removeEmojis(text: string): string {
   // replace this with a more efficient regex pattern
  // wip: Implement emoji removal logic here.
  return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
}

export const advClean: PipelineComponent = async (result: IntentResult) => {
  const cleanedText = removeEmojis(result.text);
  return {
    ...result,
    text: cleanedText,
  };
};
