import { Pipeline } from "../core/pipeline";
import type { IntentResult } from "../types";

export async function processText(
  text: string,
  configPath?: string
): Promise<IntentResult> {
  const pipeline = new Pipeline(configPath);
  return pipeline.process(text);
}
