import type { ComponentDSL } from "@fabrika/dsl";

export interface LLMProvider {
  generateComponent(prompt: string, componentType: string): Promise<ComponentDSL>;
}

export interface AIError {
  message: string;
  details?: string[];
  retryable: boolean;
}
