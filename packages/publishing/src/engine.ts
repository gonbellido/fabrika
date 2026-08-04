import type { ComponentDSL } from "@fabrika/dsl";
import type { Breakpoint, FeatureFlag, PageMeta, PublishResult } from "./types.js";

/**
 * Publishing engine: toma un árbol DSL y genera HTML estático por breakpoint.
 * Soporta feature flags y versionado.
 */
export class PublishingEngine {
  private activeFlags: FeatureFlag[] = [];

  setFlags(flags: FeatureFlag[]) {
    this.activeFlags = flags;
  }

  /** Publica una página completa */
  publish(
    page: {
      id: string;
      siteId: string;
      slug: string;
      title: string;
      dsl: ComponentDSL;
      version: number;
    },
    baseUrl: string = "https://fabrika.dev",
  ): PublishResult {
    const html: Record<Breakpoint, string> = {
      desktop: this.renderPage(page.dsl, "desktop"),
      tablet: this.renderPage(page.dsl, "tablet"),
      mobile: this.renderPage(page.dsl, "mobile"),
    };

    return {
      pageId: page.id,
      version: page.version,
      url: `${baseUrl}/sites/${page.siteId}/${page.slug}`,
      html,
      flags: this.activeFlags,
    };
  }

  /** Renderiza el árbol DSL a HTML para un breakpoint */
  private renderPage(component: ComponentDSL, breakpoint: Breakpoint): string {
    const parts: string[] = [];
    this.renderComponent(component, breakpoint, parts);
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${component.label ?? "Fabrika Page"}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body>
  ${parts.join("\n")}
</body>
</html>`;
  }

  /** Renderiza un componente individual a HTML */
  private renderComponent(
    component: ComponentDSL,
    breakpoint: Breakpoint,
    parts: string[],
    indent = 0,
  ) {
    // Feature flag check: skip if component is flagged and not in rollout
    if (this.isFlagged(component.label)) {
      return;
    }

    const style = this.resolveStyles(component, breakpoint);
    const styleAttr = this.cssToInline(style);

    // Render slots first
    if (component.slots) {
      for (const [, children] of Object.entries(component.slots)) {
        const slotParts: string[] = [];
        for (const child of children) {
          this.renderComponent(child, breakpoint, slotParts, indent + 1);
        }
        parts.push(
          `${" ".repeat(indent * 2)}<div data-slot style="${styleAttr}">\n${slotParts.join("\n")}\n${" ".repeat(indent * 2)}</div>`,
        );
      }
      return;
    }

    // Render children
    if (component.children && component.children.length > 0) {
      const childParts: string[] = [];
      for (const child of component.children) {
        this.renderComponent(child, breakpoint, childParts, indent + 1);
      }
      parts.push(
        `${" ".repeat(indent * 2)}<div data-component="${component.type}" style="${styleAttr}">\n${childParts.join("\n")}\n${" ".repeat(indent * 2)}</div>`,
      );
      return;
    }

    // Leaf component
    const tag = this.componentTag(component.type);
    const content = this.componentContent(component);
    parts.push(
      `${" ".repeat(indent * 2)}<${tag} data-component="${component.type}" style="${styleAttr}">${content}</${tag}>`,
    );
  }

  /** Resuelve estilos para un breakpoint, con fallback a desktop */
  private resolveStyles(
    component: ComponentDSL,
    breakpoint: Breakpoint,
  ): Record<string, string | number> {
    const styles = component.styles ?? {};
    return styles[breakpoint] ?? styles.desktop ?? {};
  }

  /** Convierte objeto de estilos a inline style string */
  private cssToInline(styles: Record<string, string | number>): string {
    return Object.entries(styles)
      .map(([key, value]) => {
        const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        const cssValue = typeof value === "number" ? `${value}px` : value;
        return `${cssKey}: ${cssValue}`;
      })
      .join("; ");
  }

  /** Tag HTML por tipo de componente */
  private componentTag(type: string): string {
    const tags: Record<string, string> = {
      Heading: "h2",
      Text: "p",
      Button: "button",
      Image: "img",
      ProductCard: "div",
      Section: "section",
      Header: "header",
      Footer: "footer",
      Page: "main",
    };
    return tags[type] ?? "div";
  }

  /** Contenido textual del componente */
  private componentContent(component: ComponentDSL): string {
    const label = component.label ?? "";
    if (component.type === "Image") {
      return ""; // img is self-closing with attributes
    }
    return label;
  }

  /** Verifica si un componente está bajo un feature flag desactivado */
  private isFlagged(label?: string): boolean {
    if (!label || this.activeFlags.length === 0) return false;
    for (const flag of this.activeFlags) {
      if (flag.targets.includes(label) && !flag.enabled) {
        return true;
      }
    }
    return false;
  }

  /** Genera metadata para la página */
  generateMeta(page: {
    id: string;
    siteId: string;
    title: string;
    slug: string;
    version: number;
  }): PageMeta {
    return {
      title: page.title,
      slug: page.slug,
      publishedAt: new Date().toISOString(),
    };
  }
}
