import { useDraggable } from "@dnd-kit/core";
import type { FC } from "react";

interface PaletteItem {
  type: string;
  label: string;
  icon: string;
}

const items: PaletteItem[] = [
  { type: "Section", label: "Sección", icon: "▦" },
  { type: "Heading", label: "Título", icon: "H" },
  { type: "Text", label: "Texto", icon: "¶" },
  { type: "Button", label: "Botón", icon: "▢" },
  { type: "Image", label: "Imagen", icon: "🖼" },
  { type: "ProductCard", label: "Producto", icon: "🛒" },
];

function PaletteButton({ item }: { item: PaletteItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `palette-${item.type}`,
      data: { type: item.type, label: item.label },
    });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 12px",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    cursor: "grab",
    fontSize: 14,
    marginBottom: 8,
    transition: "box-shadow 0.2s",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <span style={{ fontSize: 18 }}>{item.icon}</span>
      <span>{item.label}</span>
    </div>
  );
}

export const ComponentPalette: FC = () => {
  return (
    <div
      style={{
        width: 220,
        background: "#f9fafb",
        borderRight: "1px solid #e5e7eb",
        padding: 16,
        overflow: "auto",
      }}
    >
      <h3
        style={{
          margin: "0 0 12px",
          fontSize: 13,
          textTransform: "uppercase",
          color: "#6b7280",
          letterSpacing: "0.05em",
        }}
      >
        Componentes
      </h3>
      {items.map((item) => (
        <PaletteButton key={item.type} item={item} />
      ))}
      <div
        style={{
          marginTop: 20,
          padding: 12,
          background: "#dbeafe",
          borderRadius: 8,
          fontSize: 12,
          color: "#1e40af",
        }}
      >
        Arrastra componentes al canvas o genera con IA
      </div>
    </div>
  );
};
