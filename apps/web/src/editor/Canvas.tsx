import { DslRenderer } from "../components/DslRenderer";
import { useEditorStore } from "./store";

const widths: Record<string, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function Canvas() {
  const tree = useEditorStore((s) => s.tree);
  const viewport = useEditorStore((s) => s.viewport);

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
          width: widths[viewport],
          minHeight: "100%",
          background: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "width 0.3s",
          padding: 20,
        }}
      >
        {tree ? (
          <DslRenderer dsl={tree} />
        ) : (
          <p style={{ color: "#999", textAlign: "center", marginTop: 40 }}>
            Genera un componente con IA o carga un archivo DSL
          </p>
        )}
      </div>
    </div>
  );
}
