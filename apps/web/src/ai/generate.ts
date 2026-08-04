import type { ComponentDSL } from "@fabrika/dsl";

const API_BASE = "http://localhost:3000/api";

export async function generateComponent(
  prompt: string,
  type: string = "ProductCard",
): Promise<ComponentDSL> {
  const res = await fetch(`${API_BASE}/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, type }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({
      message: `HTTP ${res.status}`,
    }));
    throw new Error(
      (err as { message?: string }).message ?? "AI generation failed",
    );
  }

  return (await res.json()) as ComponentDSL;
}
