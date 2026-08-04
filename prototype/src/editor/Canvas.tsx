import type { FC } from "react";
import { useEditorStore } from "./useEditorStore";
import { DslRenderer } from "../components/DslRenderer";

const viewportWidths: Record<string, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export const Canvas: FC = () => {
  const component = useEditorStore((s) => s.component);
  const viewport = useEditorStore((s) => s.viewport);

  if (!component) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
        <p style={{ fontSize: 18 }}>No hay componente cargado</p>
        <p style={{ fontSize: 14 }}>Genera uno con IA o carga un DSL JSON</p>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        background: "#e5e7eb",
        padding: 20,
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: viewportWidths[viewport],
          minHeight: "100%",
          background: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "width 0.3s",
        }}
      >
        <DslRenderer component={component} />
      </div>
    </div>
  );
};
