import type { FeatureFlag } from "./types.js";

/**
 * Edge middleware para evaluar feature flags en el CDN.
 * En producción, esto se despliega como Cloudflare Worker, Fastly Compute@Edge, o similar.
 */
export interface EdgeRequest {
  url: string;
  headers: Record<string, string>;
  cookies: Record<string, string>;
}

export interface EdgeResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}

/**
 * Edge handler que evalúa feature flags y sirve la versión correcta de la página.
 */
export function createEdgeHandler(flags: FeatureFlag[]) {
  return (request: EdgeRequest, pageVariants: Map<string, string>): EdgeResponse => {
    // Determinar variante basada en flags + cookies
    let variantKey = "default";

    // Cookie-based flag targeting
    for (const flag of flags) {
      const cookieName = `ff_${flag.key}`;
      if (request.cookies[cookieName] === "on") {
        variantKey += `+${flag.key}`;
      }
    }

    const body = pageVariants.get(variantKey) ?? pageVariants.get("default") ?? "";

    return {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Fabrika-Feature-Flags": flags
          .filter((f) => f.enabled)
          .map((f) => f.key)
          .join(","),
      },
      body,
    };
  };
}
