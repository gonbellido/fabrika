import { useEditorStore, type Viewport, type PubState } from "./store";

const viewports: { key: Viewport; label: string }[] = [
  { key: "desktop", label: "Desktop" },
  { key: "tablet", label: "Tablet" },
  { key: "mobile", label: "Mobile" },
];

const states: { key: PubState; label: string; color: string }[] = [
  { key: "draft", label: "Draft", color: "#6b7280" },
  { key: "preview", label: "Preview", color: "#f59e0b" },
  { key: "published", label: "Published", color: "#22c55e" },
];

const btn: React.CSSProperties = {
  padding: "4px 12px",
  border: "1px solid #4b5563",
  borderRadius: 6,
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
};

export function Toolbar() {
  const viewport = useEditorStore((s) => s.viewport);
  const setViewport = useEditorStore((s) => s.setViewport);
  const pubState = useEditorStore((s) => s.pubState);
  const setPubState = useEditorStore((s) => s.setPubState);
  const tree = useEditorStore((s) => s.tree);

  const onExport = () => {
    if (!tree) return;
    const json = JSON.stringify(tree, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${tree.type}-${tree.version}.json`;
    a.click();
  };

  const onLoad = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(String(ev.target?.result));
          useEditorStore.getState().loadTree(json);
        } catch {
          alert("JSON inválido");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        background: "#1e3a5f",
        color: "white",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 16 }}>Fabrika Editor</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {viewports.map((v) => (
          <button
            key={v.key}
            onClick={() => setViewport(v.key)}
            style={{ ...btn, background: viewport === v.key ? "#3b82f6" : "transparent" }}
          >
            {v.label}
          </button>
        ))}
        <div style={{ width: 1, height: 24, background: "#4b5563", margin: "0 8px" }} />
        {states.map((s) => (
          <button
            key={s.key}
            onClick={() => setPubState(s.key)}
            style={{
              ...btn,
              background: pubState === s.key ? s.color : "transparent",
              color: pubState === s.key ? "white" : "#d1d5db",
            }}
          >
            {s.label}
          </button>
        ))}
        <div style={{ width: 1, height: 24, background: "#4b5563", margin: "0 8px" }} />
        <button onClick={onLoad} style={btn}>
          Cargar
        </button>
        <button onClick={onExport} style={{ ...btn, background: "#22c55e" }}>
          Exportar
        </button>
      </div>
    </div>
  );
}
