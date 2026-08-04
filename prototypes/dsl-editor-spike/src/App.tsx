import { useCallback, useRef } from "react";
import { Canvas } from "./editor/Canvas";
import { Panel } from "./editor/Panel";
import { Toolbar } from "./editor/Toolbar";
import { useEditorStore } from "./editor/useEditorStore";
import { generateComponent } from "./ai/generate";
import { initComponents } from "./components/init";
import { validateComponent } from "./dsl/validator";

// Initialize component registry
initComponents();

function App() {
  const loadComponent = useEditorStore((s) => s.loadComponent);
  const component = useEditorStore((s) => s.component);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = useCallback(async (type: string) => {
    const comp = await generateComponent(`Generate a ${type}`, type);
    loadComponent(comp);
  }, [loadComponent]);

  const handleFileLoad = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const result = validateComponent(json);
          if (!result.valid) {
            alert("DSL inválido:\n" + result.errors.join("\n"));
            return;
          }
          loadComponent(json);
        } catch {
          alert("Error al parsear el JSON");
        }
      };
      reader.readAsText(file);
    },
    [loadComponent]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Toolbar />

      {!component ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            background: "#f3f4f6",
          }}
        >
          <h1 style={{ fontSize: 28, color: "#1e3a5f", margin: 0 }}>Fabrika Editor</h1>
          <p style={{ color: "#6b7280", fontSize: 16, margin: 0 }}>
            Genera un componente con IA o carga un DSL JSON
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => handleGenerate("ProductCard")}
              style={{
                padding: "12px 24px",
                background: "#1e3a5f",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Generar ProductCard
            </button>
            <button
              onClick={() => handleGenerate("Hero")}
              style={{
                padding: "12px 24px",
                background: "#374151",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Generar Hero
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "12px 24px",
                background: "white",
                color: "#1e3a5f",
                border: "2px solid #1e3a5f",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Cargar DSL JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileLoad}
              style={{ display: "none" }}
            />
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

export default App;
