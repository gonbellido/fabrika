import { PublishingEngine } from "@fabrika/publishing";
import type { ComponentDSL } from "@fabrika/dsl";

const engine = new PublishingEngine();

export function renderPage(dsl: ComponentDSL, breakpoint: "desktop" | "tablet" | "mobile" = "desktop"): string {
  const result = engine.publish({
    id: dsl.label ?? "page",
    siteId: "published",
    slug: dsl.label?.toLowerCase().replace(/\s+/g, "-") ?? "page",
    title: dsl.label ?? "Page",
    dsl,
    version: 1,
  });

  return result.html[breakpoint] ?? result.html.desktop ?? "";
}

export function renderPageMeta(dsl: ComponentDSL) {
  return {
    title: dsl.label ?? "Fabrika Site",
    description: dsl.description ?? "",
  };
}
