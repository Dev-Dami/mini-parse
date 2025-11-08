import { PipelineComponent } from "../core/pipeline";
import { IntentResult } from "../types";

export const normalize: PipelineComponent = (
  input: IntentResult,
): IntentResult => {
  // Normalize tokens (lowercase words, standardize numbers, etc.)
  input.tokens.forEach((token) => {
    if (token.type === "word") {
      token.value = token.value.toLowerCase();
    } else if (token.type === "number") {
      // Ensure consistent number representation
      token.value = parseFloat(token.value).toString();
    }
  });
  
  // Normalize entities as well
  input.entities.forEach(entity => {
    entity.value = entity.value.toLowerCase();
  });
  
  return input;
};
