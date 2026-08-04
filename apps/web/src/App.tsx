import { useRef } from "react";
import { Canvas } from "./editor/Canvas";
import { Panel } from "./editor/Panel";
import { Toolbar } from "./editor/Toolbar";
import { useEditorStore } from "./editor/store";
import { generateComponent } from "./ai/generate";
import { initRenderers } from "./components/renderers";

initRenderers();

export default function App() {
  const tree = useEditorStore((s) => s.tree);
  const loadTree = useEditorStore((s) => s.loadTree);
  const cardBtnRef = useRef<HTMLButtonElement>(null);

  const handleGenerate = async (type: string) => {
    if (cardBtnRef.current) {
      cardBtnRef.current.textContent = "Generando...";
      cardBtnRef.current.disabled = true;
    }
    const comp = await generateComponent("", type);
    loadTree(comp);
    if (cardBtnRef.current) {
      cardBtnRef.current.textContent = "Generar ProductCard";
      cardBtnRef.current.disabled = false;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <Toolbar />
      {!tree ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, background: "#f3f4f6" }}>
          <h1 style={{ fontSize: 28, color: "#1e3a5f", margin: 0 }}>Fabrika Editor</h1>
          <p style={{ color: "#6b7280" }}>Genera un componente con IA o carga un archivo DSL</p>
          <div style={{ display: "flex", gap: 12 }}>
            <button ref={cardBtnRef} onClick={() => handleGenerate("ProductCard")} style={{ padding: "12px 24px", background: "#1e3a5f", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 600 }}>
              Generar ProductCard
            </button>
            <button onClick={() => handleGenerate("Section")} style={{ padding: "12px 24px", background: "#374151", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 600 }}>
              Generar Section
            </button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <Canvas />
          <Panel />
        </div>
      )}
    </div>
  );
}
