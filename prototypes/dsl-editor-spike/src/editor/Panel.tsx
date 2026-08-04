import type { FC } from "react";
import { useEditorStore } from "./useEditorStore";

export const Panel: FC = () => {
  const component = useEditorStore((s) => s.component);
  const validationErrors = useEditorStore((s) => s.validationErrors);

  if (!component) return null;

  return (
    <div
      style={{
        width: 320,
        background: "#f9fafb",
        borderLeft: "1px solid #e5e7eb",
        padding: 20,
        overflow: "auto",
        fontSize: 14,
      }}
    >
      <h3 style={{ marginTop: 0 }}>Propiedades</h3>

      <Section title="Identidad">
        <Field label="Type" value={component.type} />
        <Field label="Version" value={component.version} />
        <Field label="Category" value={component.category ?? "-"} />
        <Field label="Label" value={component.label ?? "-"} />
      </Section>

      <Section title="Permisos">
        {component.permissions.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {component.permissions.map((p) => (
              <li key={p} style={{ fontFamily: "monospace", fontSize: 12, color: "#1e3a5f" }}>
                {p}
              </li>
            ))}
          </ul>
        ) : (
          <span style={{ color: "#999" }}>Sin permisos</span>
        )}
      </Section>

      <Section title="Bindings">
        {component.bindings && Object.keys(component.bindings).length > 0 ? (
          <table style={{ width: "100%", fontSize: 12 }}>
            <tbody>
              {Object.entries(component.bindings).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ padding: "4px 0", fontFamily: "monospace", color: "#1e3a5f" }}>
                    {key}
                  </td>
                  <td style={{ padding: "4px 0", color: "#666" }}>→ {value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span style={{ color: "#999" }}>Sin bindings</span>
        )}
      </Section>

      <Section title="Actions">
        {component.actions && Object.keys(component.actions).length > 0 ? (
          Object.entries(component.actions).map(([event, action]) => (
            <div key={event} style={{ marginBottom: 8, fontSize: 12 }}>
              <strong>{event}</strong>
              <div style={{ fontFamily: "monospace", color: "#1e3a5f" }}>{action.capability}</div>
              {action.params && (
                <pre
                  style={{
                    fontSize: 11,
                    margin: "4px 0",
                    background: "#e5e7eb",
                    padding: 4,
                    borderRadius: 4,
                  }}
                >
                  {JSON.stringify(action.params, null, 2)}
                </pre>
              )}
            </div>
          ))
        ) : (
          <span style={{ color: "#999" }}>Sin acciones</span>
        )}
      </Section>

      <Section title="Meta">
        <Field label="Author" value={component.meta?.author ?? "-"} />
        <Field label="Source" value={component.meta?.source ?? "-"} />
        <Field label="Created" value={component.meta?.createdAt?.slice(0, 10) ?? "-"} />
      </Section>

      {validationErrors.length > 0 && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
          }}
        >
          <strong style={{ color: "#dc2626", fontSize: 13 }}>Errores de validación</strong>
          <ul style={{ margin: "4px 0 0", paddingLeft: 16, fontSize: 12, color: "#b91c1c" }}>
            {validationErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {validationErrors.length === 0 && component && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            fontSize: 13,
            color: "#15803d",
          }}
        >
          DSL válido
        </div>
      )}
    </div>
  );
};

const Section: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <h4
      style={{
        margin: "0 0 8px",
        fontSize: 13,
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

const Field: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
    <span style={{ color: "#6b7280" }}>{label}</span>
    <span style={{ fontFamily: "monospace", color: "#1e3a5f" }}>{value}</span>
  </div>
);
