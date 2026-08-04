import { useEditorStore } from "./store";

export function Panel() {
  const tree = useEditorStore((s) => s.tree);
  const errors = useEditorStore((s) => s.errors);
  if (!tree) return <div style={{ width: 300, background: "#f9fafb", borderLeft: "1px solid #e5e7eb", padding: 20 }} />;

  return (
    <div style={{ width: 300, background: "#f9fafb", borderLeft: "1px solid #e5e7eb", padding: 20, overflow: "auto", fontSize: 13 }}>
      <h3 style={{ marginTop: 0 }}>Propiedades</h3>
      <Row label="Type" value={tree.type} />
      <Row label="Version" value={tree.version} />
      <Row label="Category" value={tree.category ?? "-"} />
      <Row label="Label" value={tree.label ?? "-"} />

      <h4 style={{ margin: "16px 0 8px", color: "#6b7280", fontSize: 11, textTransform: "uppercase" }}>Permisos</h4>
      {tree.permissions.map((p) => <div key={p} style={{ fontFamily: "monospace", fontSize: 12, color: "#1e3a5f", marginBottom: 2 }}>{p}</div>)}

      <h4 style={{ margin: "16px 0 8px", color: "#6b7280", fontSize: 11, textTransform: "uppercase" }}>Bindings</h4>
      {tree.bindings && Object.entries(tree.bindings).map(([k, v]) => (
        <Row key={k} label={k} value={String(v)} />
      ))}

      <h4 style={{ margin: "16px 0 8px", color: "#6b7280", fontSize: 11, textTransform: "uppercase" }}>Actions</h4>
      {tree.actions && Object.entries(tree.actions).map(([event, action]) => (
        <div key={event} style={{ marginBottom: 8 }}>
          <strong>{event}</strong>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: "#1e3a5f" }}>{action.capability}</div>
        </div>
      ))}

      {errors.length > 0 && (
        <div style={{ marginTop: 16, padding: 12, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8 }}>
          <strong style={{ color: "#dc2626" }}>Errores</strong>
          {errors.map((e, i) => <div key={i} style={{ fontSize: 11, color: "#b91c1c" }}>{e}</div>)}
        </div>
      )}
      {errors.length === 0 && <div style={{ marginTop: 16, padding: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, color: "#15803d", fontSize: 13 }}>DSL válido</div>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
      <span style={{ color: "#6b7280" }}>{label}</span>
      <span style={{ fontFamily: "monospace", color: "#1e3a5f" }}>{value}</span>
    </div>
  );
}
