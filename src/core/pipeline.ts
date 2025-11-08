import type { Token } from "./Tokenizer";
import { Tokenizer } from "./Tokenizer";
import { clean, extract, normalize, segment } from "../processors";
import type { Entity, IntentResult } from "../types";
import type { PipelineComponent } from "./types";
import { ConfigLoader } from "../config/loader";
import type { MiniparseConfig } from "../config/defaults";

export class Pipeline {
  private readonly components: PipelineComponent[] = [];
  private readonly tokenizer: Tokenizer;
  private readonly config: MiniparseConfig;

  constructor(configPath?: string) {
    // Load configuration
    this.config = ConfigLoader.loadConfig(configPath);
    
    // Initialize tokenizer with config
    this.tokenizer = new Tokenizer({
      lowercase: this.config.tokenizer.lowercase,
      mergeSymbols: this.config.tokenizer.mergeSymbols,
    });
    
    // Add default processors based on config
    if (this.config.pipeline.enableNormalization) this.use(normalize);
    if (this.config.pipeline.enableCleaning) this.use(clean);
    if (this.config.pipeline.enableExtraction) this.use(extract);
    if (this.config.pipeline.enableSegmentation) this.use(segment);
  }

  public use(component: PipelineComponent): this {
    this.components.push(component);
    return this;
  }

  public async process(text: string): Promise<IntentResult> {
    const tokens = this.tokenizer.tokenize(text);
    let result: IntentResult = {
      text,
      tokens,
      entities: [],
    };

    for (const component of this.components) {
      result = await component(result);
    }

    return result;
  }

  public getConfig(): MiniparseConfig {
    return this.config;
  }

  public addCustomProcessor(component: PipelineComponent): this {
    this.components.push(component);
    return this;
  }
}
