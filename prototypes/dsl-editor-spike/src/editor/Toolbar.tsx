import type { FC } from "react";
import { useEditorStore } from "./useEditorStore";
import type { PublicationState } from "../dsl/types";

const viewports = [
  { key: "desktop" as const, icon: "🖥", label: "Desktop" },
  { key: "tablet" as const, icon: "📱", label: "Tablet" },
  { key: "mobile" as const, icon: "📱", label: "Mobile" },
];

const states: { key: PublicationState; label: string; color: string }[] = [
  { key: "draft", label: "Draft", color: "#6b7280" },
  { key: "preview", label: "Preview", color: "#f59e0b" },
  { key: "published", label: "Published", color: "#22c55e" },
];

export const Toolbar: FC = () => {
  const viewport = useEditorStore((s) => s.viewport);
  const setViewport = useEditorStore((s) => s.setViewport);
  const publicationState = useEditorStore((s) => s.publicationState);
  const setPublicationState = useEditorStore((s) => s.setPublicationState);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const historyIndex = useEditorStore((s) => s.historyIndex);
  const historyLength = useEditorStore((s) => s.history.length);
  const component = useEditorStore((s) => s.component);

  const exportDSL = () => {
    if (!component) return;
    const json = JSON.stringify(component, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${component.type}-${component.version}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 16, marginRight: 16 }}>Fabrika Editor</span>

        <button onClick={undo} disabled={historyIndex <= 0} style={btnStyle}>
          ↩ Undo
        </button>
        <button onClick={redo} disabled={historyIndex >= historyLength - 1} style={btnStyle}>
          ↪ Redo
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {viewports.map((v) => (
          <button
            key={v.key}
            onClick={() => setViewport(v.key)}
            style={{
              ...btnStyle,
              background: viewport === v.key ? "#3b82f6" : "transparent",
            }}
          >
            {v.icon} {v.label}
          </button>
        ))}

        <div style={{ width: 1, height: 24, background: "#4b5563", margin: "0 8px" }} />

        {states.map((s) => (
          <button
            key={s.key}
            onClick={() => setPublicationState(s.key)}
            style={{
              ...btnStyle,
              background: publicationState === s.key ? s.color : "transparent",
              color: publicationState === s.key ? "white" : "#d1d5db",
            }}
          >
            {s.label}
          </button>
        ))}

        <div style={{ width: 1, height: 24, background: "#4b5563", margin: "0 8px" }} />

        <button onClick={exportDSL} style={{ ...btnStyle, background: "#22c55e" }}>
          Export DSL
        </button>
      </div>
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  padding: "4px 12px",
  border: "1px solid #4b5563",
  borderRadius: 6,
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
};
