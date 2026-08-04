import { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Canvas } from "./editor/Canvas";
import { Panel } from "./editor/Panel";
import { Toolbar } from "./editor/Toolbar";
import { ComponentPalette } from "./editor/ComponentPalette";
import { useEditorStore } from "./editor/store";
import { generateComponent } from "./ai/generate";
import { initRenderers } from "./components/renderers";

initRenderers();

export default function App() {
  const tree = useEditorStore((s) => s.tree);
  const loadTree = useEditorStore((s) => s.loadTree);
  const addComponent = useEditorStore((s) => s.addComponent);
  const [loading, setLoading] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || over.id !== "canvas") return;

    const type = active.data.current?.type as string;
    if (!type) return;

    addComponent(null, type, `${type}-${Date.now()}`);
  };

  const handleGenerate = async (type: string) => {
    setLoading(true);
    try {
      const comp = await generateComponent(`Crea un componente ${type}`, type);
      loadTree(comp);
    } catch (e) {
      alert("Error generando: " + (e instanceof Error ? e.message : "error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <Toolbar />
        {!tree ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              background: "#f3f4f6",
            }}
          >
            <h1 style={{ fontSize: 28, color: "#1e3a5f", margin: 0 }}>
              Fabrika Editor
            </h1>
            <p style={{ color: "#6b7280" }}>
              Genera un componente con IA o arrastra desde la paleta
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => handleGenerate("ProductCard")}
                disabled={loading}
                style={{
                  padding: "12px 24px",
                  background: "#1e3a5f",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Generando..." : "Generar ProductCard"}
              </button>
              <button
                onClick={() => handleGenerate("Section")}
                disabled={loading}
                style={{
                  padding: "12px 24px",
                  background: "#374151",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Generando..." : "Generar Section"}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <ComponentPalette />
            <Canvas />
            <Panel />
          </div>
        )}
      </div>
    </DndContext>
  );
}
