// src/processors/segment.ts

export function segment(text: string): string[] {
    // Add segmentation logic here (e.g., split by sentence)
    return text.split(/(?<=[.?!])\s+/);
}
