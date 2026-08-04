import type { ComponentDSL } from "../dsl/types";
import { getRenderer } from "./registry";
import { type FC } from "react";

function resolveBinding(binding: string, _component: ComponentDSL): string {
  // Mock resolver — in production, this queries the Provider via Capability layer
  const mockData: Record<string, string> = {
    "product.name": "Producto Demo",
    "product.image": "https://placehold.co/400x300/1e3a5f/white?text=Producto",
    "product.images.0.url": "https://placehold.co/400x300/1e3a5f/white?text=Producto",
    "product.price": "49.99 €",
    "product.compareAtPrice": "79.99 €",
    "product.rating": "4.5",
    "product.reviewCount": "128",
    "product.stockStatus": "En stock",
    "hero.title": "Productos increíbles",
    "hero.cta": "Ver colección",
    "hero.image": "https://placehold.co/600x400/1e3a5f/white?text=Hero",
    "hero.subtitle": "Descubre nuestra selección",
    "site.copyright": "© 2026 Fabrika Demo",
    "site.logo": "Fabrika",
    "catalog.items": "",
  };
  return mockData[binding] ?? `[${binding}]`;
}

export const DslRenderer: FC<{ component: ComponentDSL }> = ({ component }) => {
  const Renderer = getRenderer(component.type);

  if (!Renderer) {
    return (
      <div style={{ padding: 16, border: "2px dashed #ccc", borderRadius: 8 }}>
        <span style={{ color: "#999", fontSize: 14 }}>
          Unknown component: <strong>{component.type}</strong>
        </span>
        <pre style={{ fontSize: 11, marginTop: 8, color: "#666" }}>
          {JSON.stringify(component, null, 2)}
        </pre>
      </div>
    );
  }

  return <Renderer dsl={component} />;
};

export { resolveBinding };
