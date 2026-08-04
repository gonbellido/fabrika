import type { ComponentDSL } from "@fabrika/dsl";
import type { LLMProvider } from "./provider";
import { buildSystemPrompt } from "./prompt";
import { validateComponent } from "@fabrika/dsl";

interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: { content: string };
    finish_reason: string;
  }>;
}

export class DeepSeekProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.deepseek.com/v1";
  private readonly model = "deepseek-chat";

  constructor() {
    const key = process.env["DEEPSEEK_API_KEY"];
    if (!key) {
      throw new Error(
        "DEEPSEEK_API_KEY not set. Add it to packages/core-api/.env",
      );
    }
    this.apiKey = key;
  }

  async generateComponent(
    prompt: string,
    componentType: string,
  ): Promise<ComponentDSL> {
    const systemPrompt = buildSystemPrompt(componentType);

    let lastError: string | null = null;

    // Retry once on validation failure
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await this.callAPI(systemPrompt, prompt, lastError);
        const parsed = this.extractJSON(response);
        const validation = validateComponent(parsed);

        if (validation.valid) {
          return parsed as ComponentDSL;
        }

        lastError = validation.errors.join("; ");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);
        if (attempt === 1) {
          throw new Error(`DeepSeek API failed: ${message}`);
        }
        lastError = message;
      }
    }

    throw new Error(
      `Failed to generate valid DSL after retry: ${lastError}`,
    );
  }

  private async callAPI(
    systemPrompt: string,
    userPrompt: string,
    previousError?: string | null,
  ): Promise<DeepSeekResponse> {
    const messages: DeepSeekMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    if (previousError) {
      messages.push({
        role: "user",
        content: `Previous attempt failed validation: ${previousError}. Please fix the JSON and try again. Output ONLY valid JSON matching the schema.`,
      });
    }

    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`DeepSeek API error ${res.status}: ${body}`);
    }

    const data = (await res.json()) as DeepSeekResponse;
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Empty response from DeepSeek API");
    }

    return data;
  }

  private extractJSON(response: DeepSeekResponse): unknown {
    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content in response");

    // Try direct parse
    try {
      return JSON.parse(content);
    } catch {
      // Try to extract JSON from markdown code blocks
      const match = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match?.[1]) {
        return JSON.parse(match[1].trim());
      }
      // Try to find first { ... } block
      const braceMatch = content.match(/\{[\s\S]*\}/);
      if (braceMatch?.[0]) {
        return JSON.parse(braceMatch[0]);
      }
      throw new Error("Could not parse JSON from response");
    }
  }
}
