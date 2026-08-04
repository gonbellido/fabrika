import { useEditorStore } from "./store";
import type { ComponentDSL } from "@fabrika/dsl";

export function Panel() {
  const tree = useEditorStore((s) => s.tree);
  const selectedId = useEditorStore((s) => s.selectedId);
  const errors = useEditorStore((s) => s.errors);

  const selected = findSelected(tree, selectedId);

  return (
    <div
      style={{
        width: 280,
        background: "#f9fafb",
        borderLeft: "1px solid #e5e7eb",
        padding: 20,
        overflow: "auto",
        fontSize: 13,
      }}
    >
      <h3 style={{ margin: "0 0 16px" }}>Propiedades</h3>

      {!tree && (
        <p style={{ color: "#999" }}>Carga o genera un componente</p>
      )}

      {tree && !selected && (
        <div>
          <p style={{ color: "#6b7280", marginBottom: 12 }}>
            Selecciona un componente en el árbol
          </p>
          <Section title="Raíz">
            <Row label="Type" value={tree.type} />
            <Row label="Version" value={tree.version} />
            <Row label="Components" value={String(countChildren(tree))} />
          </Section>
        </div>
      )}

      {selected && (
        <div>
          <Section title="Identidad">
            <Row label="Type" value={selected.type} />
            <Row label="Version" value={selected.version} />
            <Row label="Category" value={selected.category ?? "-"} />
            <Row label="Label" value={selected.label ?? "-"} />
          </Section>
          <Section title="Permisos">
            {selected.permissions.map((p) => (
              <div
                key={p}
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#1e3a5f",
                  marginBottom: 2,
                }}
              >
                {p}
              </div>
            ))}
          </Section>
          {selected.bindings &&
            Object.keys(selected.bindings).length > 0 && (
              <Section title="Bindings">
                {Object.entries(selected.bindings).map(([k, v]) => (
                  <Row key={k} label={k} value={String(v)} />
                ))}
              </Section>
            )}
          {selected.actions &&
            Object.keys(selected.actions).length > 0 && (
              <Section title="Actions">
                {Object.entries(selected.actions).map(([event, action]) => (
                  <div key={event} style={{ marginBottom: 6 }}>
                    <strong style={{ fontSize: 11 }}>{event}</strong>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "#1e3a5f",
                      }}
                    >
                      {action.capability}
                    </div>
                  </div>
                ))}
              </Section>
            )}
        </div>
      )}

      {errors.length > 0 && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
          }}
        >
          <strong style={{ color: "#dc2626", fontSize: 11 }}>
            Errores ({errors.length})
          </strong>
          {errors.slice(0, 5).map((e, i) => (
            <div key={i} style={{ fontSize: 11, color: "#b91c1c", marginTop: 2 }}>
              {e}
            </div>
          ))}
        </div>
      )}

      {errors.length === 0 && tree && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            fontSize: 12,
            color: "#15803d",
          }}
        >
          DSL válido
        </div>
      )}
    </div>
  );
}

function findSelected(
  node: ComponentDSL | null,
  label: string | null,
): ComponentDSL | null {
  if (!node || !label) return null;
  if (node.label === label) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findSelected(child, label);
      if (found) return found;
    }
  }
  if (node.slots) {
    for (const children of Object.values(node.slots)) {
      for (const child of children) {
        const found = findSelected(child, label);
        if (found) return found;
      }
    }
  }
  return null;
}

function countChildren(node: ComponentDSL): number {
  let count = node.children?.length ?? 0;
  if (node.slots) {
    for (const children of Object.values(node.slots)) {
      count += children.length;
    }
  }
  return count;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h4
        style={{
          margin: "0 0 6px",
          fontSize: 10,
          textTransform: "uppercase",
          color: "#6b7280",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1px 0",
      }}
    >
      <span style={{ color: "#6b7280" }}>{label}</span>
      <span style={{ fontFamily: "monospace", color: "#1e3a5f" }}>
        {value}
      </span>
    </div>
  );
}
