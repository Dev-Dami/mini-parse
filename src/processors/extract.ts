// src/processors/extract.ts

export function extract(text: string): Record<string, any> {
    // Add extraction logic here (e.g., regex for entities)
    return {
        "raw": text,
        "entities": []
    };
}
