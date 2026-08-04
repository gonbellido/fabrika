import React, { type FC } from "react";
import type { ComponentDSL } from "../dsl/types";
import { DslRenderer } from "./DslRenderer";

export const SectionRenderer: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const styles = { ...(dsl.styles?.desktop ?? {}) };

  return (
    <div style={styles as React.CSSProperties}>
      {dsl.slots &&
        Object.entries(dsl.slots).map(([slotName, children]) => (
          <div key={slotName} data-slot={slotName}>
            {children.map((child, i) => (
              <DslRenderer key={i} component={child} />
            ))}
          </div>
        ))}
      {dsl.children?.map((child, i) => (
        <DslRenderer key={i} component={child} />
      ))}
    </div>
  );
};

// Single renderer for all heading levels
const HEADING_TAGS = { h1: true, h2: true, h3: true, h4: true, h5: true, h6: true } as const;
type HeadingTag = keyof typeof HEADING_TAGS;

function isHeadingTag(tag: string): tag is HeadingTag {
  return tag in HEADING_TAGS;
}

export const HeadingRenderer: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const b = dsl.bindings ?? {};
  const text = b.text ?? b.label ?? dsl.label ?? "Heading";
  const level = String(dsl.props?.level ?? "h2");
  const Tag = isHeadingTag(level) ? level : "h2";
  return <Tag style={{ margin: 0 }}>{text}</Tag>;
};

export const TextRenderer: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const b = dsl.bindings ?? {};
  const text = b.text ?? dsl.label ?? "";
  return <p style={{ margin: 0 }}>{text}</p>;
};

export const ButtonRenderer: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const b = dsl.bindings ?? {};
  const p = dsl.props ?? {};
  const label = b.label ?? String(p.label ?? "Click");

  return (
    <button
      style={{
        padding: "12px 24px",
        background: p.variant === "primary" ? "#1e3a5f" : "#e5e7eb",
        color: p.variant === "primary" ? "white" : "#333",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: 600,
        fontSize: p.size === "lg" ? 16 : 14,
      }}
      onClick={() => {
        if (dsl.actions?.onClick) {
          alert(`Action: ${JSON.stringify(dsl.actions.onClick)}`);
        }
      }}
    >
      {label}
    </button>
  );
};

export const ImageRenderer: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const b = dsl.bindings ?? {};
  const src = b.src ?? "https://placehold.co/400x300/1e3a5f/white?text=Image";
  return (
    <img
      src={src}
      alt={dsl.label ?? ""}
      style={{
        width: "100%",
        objectFit: String(dsl.props?.fit ?? "cover") as React.CSSProperties["objectFit"],
        borderRadius: dsl.props?.rounded ? 8 : 0,
      }}
    />
  );
};

export const HeaderRenderer: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const p = dsl.props ?? {};
  const menuItems = (p.menuItems as Array<{ label: string; link: string }>) ?? [];
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 60px",
        background: "#1e3a5f",
        color: "white",
        position: p.sticky ? "sticky" : "static",
        top: 0,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 18 }}>{String(p.logo ?? "Fabrika")}</span>
      <nav style={{ display: "flex", gap: 24 }}>
        {menuItems.map((item, i) => (
          <a key={i} href={item.link} style={{ color: "white", textDecoration: "none", fontSize: 14 }}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export const FooterRenderer: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const b = dsl.bindings ?? {};
  return (
    <footer
      style={{
        padding: "40px 60px",
        background: "#111827",
        color: "#9ca3af",
        textAlign: "center",
        fontSize: 14,
      }}
    >
      <p>{b.copyright ?? "© 2026 Fabrika"}</p>
    </footer>
  );
};
