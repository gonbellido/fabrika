import type { FC } from "react";
import type { ComponentDSL } from "@fabrika/dsl";
import { useEditorStore } from "../editor/store";

const registry = new Map<string, FC<{ dsl: ComponentDSL }>>();

export function registerRenderer(type: string, comp: FC<{ dsl: ComponentDSL }>) {
  registry.set(type, comp);
}

function resolveBinding(path: string): string {
  const mock: Record<string, string> = {
    "product.name": "Producto Demo",
    "product.price": "49.99 €",
    "product.image": "https://placehold.co/400x300/1e3a5f/white?text=Producto",
    "product.images.0.url": "https://placehold.co/400x300/1e3a5f/white?text=Producto",
    "product.rating": "4.5",
    "product.reviewCount": "128",
    "hero.title": "Productos increíbles",
    "hero.cta": "Ver colección",
    "hero.image": "https://placehold.co/600x400/1e3a5f/white?text=Hero",
    "site.copyright": "© 2026 Fabrika",
  };
  return mock[path] ?? `[${path}]`;
}

export function DslRenderer({ dsl }: { dsl: ComponentDSL }) {
  const selectComponent = useEditorStore((s) => s.selectComponent);
  const selectedId = useEditorStore((s) => s.selectedId);

  const Renderer = registry.get(dsl.type);

  const isSelected = selectedId === dsl.label;
  const border = isSelected ? "2px solid #3b82f6" : undefined;
  const padding = dsl.type === "Section" || dsl.type === "Page" ? 4 : 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectComponent(dsl.label ?? null);
  };

  if (Renderer) {
    return (
      <div onClick={handleClick} style={{ border, padding }}>
        <Renderer dsl={dsl} />
      </div>
    );
  }

  // Fallback: render children/slots
  return (
    <div onClick={handleClick} style={{ border, padding }}>
      {dsl.slots &&
        Object.entries(dsl.slots).map(([name, children]) => (
          <div key={name}>
            {children.map((c, i) => (
              <DslRenderer key={i} dsl={c} />
            ))}
          </div>
        ))}
      {dsl.children?.map((c, i) => (
        <DslRenderer key={i} dsl={c} />
      ))}
    </div>
  );
}

export { resolveBinding, registry };
