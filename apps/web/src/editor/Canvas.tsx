import { useDroppable } from "@dnd-kit/core";
import { DslRenderer } from "../components/DslRenderer";
import { useEditorStore } from "./store";
import type { ComponentDSL } from "@fabrika/dsl";

const widths: Record<string, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function Canvas() {
  const tree = useEditorStore((s) => s.tree);
  const viewport = useEditorStore((s) => s.viewport);
  const removeComponent = useEditorStore((s) => s.removeComponent);
  const selectComponent = useEditorStore((s) => s.selectComponent);
  const selectedId = useEditorStore((s) => s.selectedId);

  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

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
        ref={setNodeRef}
        style={{
          width: widths[viewport],
          minHeight: "100%",
          background: "white",
          boxShadow: isOver ? "0 0 0 2px #3b82f6" : "0 4px 12px rgba(0,0,0,0.1)",
          transition: "width 0.3s, box-shadow 0.2s",
          padding: 20,
          outline: isOver ? "2px dashed #3b82f6" : "none",
          outlineOffset: -4,
        }}
      >
        {tree ? (
          <>
            <DslRenderer dsl={tree} />
            <TreeView
              component={tree}
              onSelect={selectComponent}
              onDelete={removeComponent}
              selectedId={selectedId}
            />
          </>
        ) : (
          <div style={{ textAlign: "center", color: "#999", marginTop: 60 }}>
            <p style={{ fontSize: 18, margin: 0 }}>
              {isOver ? "Suelta aquí" : "Arrastra componentes o genera con IA"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TreeView({
  component,
  onSelect,
  onDelete,
  selectedId,
  depth = 0,
}: {
  component: ComponentDSL;
  onSelect: (id: string | null) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
  depth?: number;
}) {
  const label = component.label ?? component.type;
  const isSelected = selectedId === label;

  const items: ComponentDSL[] = [];
  if (component.children) items.push(...component.children);
  if (component.slots) {
    for (const children of Object.values(component.slots)) {
      items.push(...children);
    }
  }

  return (
    <div style={{ marginTop: 16, borderTop: "1px solid #e5e7eb", paddingTop: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 8px",
          marginLeft: depth * 16,
          borderRadius: 4,
          background: isSelected ? "#dbeafe" : "transparent",
          fontSize: 12,
          fontFamily: "monospace",
        }}
      >
        <span
          style={{ cursor: "pointer", flex: 1 }}
          onClick={() => onSelect(label)}
        >
          {depth > 0 ? "└ " : ""}
          {component.type} <span style={{ color: "#6b7280" }}>{label}</span>
        </span>
        <button
          onClick={() => onDelete(label)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#ef4444",
            fontSize: 14,
            padding: "2px 6px",
          }}
          title="Eliminar"
        >
          ✕
        </button>
      </div>
      {items.map((child, i) => (
        <TreeView
          key={`${child.label}-${i}`}
          component={child}
          onSelect={onSelect}
          onDelete={onDelete}
          selectedId={selectedId}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
