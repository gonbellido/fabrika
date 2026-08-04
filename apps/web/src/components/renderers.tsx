import type { FC } from "react";
import type { ComponentDSL } from "@fabrika/dsl";
import { resolveBinding } from "./DslRenderer";
import { registerRenderer } from "./DslRenderer";

const card: React.CSSProperties = {
  background: "white",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const ProductCardView: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const b = dsl.bindings ?? {};
  const p = dsl.props ?? {};
  return (
    <div style={card}>
      <img src={resolveBinding(b.image ?? "")} style={{ width: "100%", borderRadius: 8, aspectRatio: "4/3", objectFit: "cover" }} />
      <strong>{resolveBinding(b.title ?? "")}</strong>
      <span style={{ fontSize: 20, fontWeight: 700, color: "#1e3a5f" }}>{resolveBinding(b.price ?? "")}</span>
      {p.showRating ? <span style={{ color: "#f59e0b" }}>{"★".repeat(4)}☆ ({resolveBinding(b.reviewCount ?? "")})</span> : null}
      <button style={{ width: "100%", padding: 10, background: "#1e3a5f", color: "white", border: "none", borderRadius: 8 }}>
        {String(p.buttonLabel ?? "Añadir al carrito")}
      </button>
    </div>
  );
};

const SectionView: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const style = dsl.styles?.desktop ?? {};
  return <div style={style as React.CSSProperties} />;
};

const HeadingView: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  return <h2 style={{ margin: 0 }}>{dsl.label ?? "Heading"}</h2>;
};

const TextView: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  return <p style={{ margin: 0 }}>{dsl.label ?? ""}</p>;
};

const ButtonView: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const p = dsl.props ?? {};
  const label = String(p.label ?? dsl.label ?? "Click");
  return (
    <button style={{ padding: "12px 24px", background: p.variant === "primary" ? "#1e3a5f" : "#e5e7eb", color: p.variant === "primary" ? "white" : "#333", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
      {label}
    </button>
  );
};

const ImageView: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const b = dsl.bindings ?? {};
  return <img src={b.src ?? "https://placehold.co/400x300"} alt="" style={{ width: "100%", borderRadius: 8 }} />;
};

export function initRenderers() {
  registerRenderer("ProductCard", ProductCardView);
  registerRenderer("Section", SectionView);
  registerRenderer("Heading", HeadingView);
  registerRenderer("Text", TextView);
  registerRenderer("Button", ButtonView);
  registerRenderer("Image", ImageView);
}
