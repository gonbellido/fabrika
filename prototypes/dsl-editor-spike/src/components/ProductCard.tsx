import type { FC } from "react";
import type { ComponentDSL } from "../dsl/types";
import { resolveBinding } from "./DslRenderer";

export const ProductCardRenderer: FC<{ dsl: ComponentDSL }> = ({ dsl }) => {
  const p = dsl.props ?? {};
  const b = dsl.bindings ?? {};
  const imageRatio = String(p.imageRatio ?? "1");

  return (
    <div className="product-card" style={{ ...cardStyles, ...(dsl.styles?.desktop ?? {}) }}>
      <img
        src={resolveBinding(b.image ?? b["product.images.0.url"] ?? "", dsl)}
        alt={resolveBinding(b.title ?? "", dsl)}
        style={{
          width: "100%",
          aspectRatio: imageRatio === "4:3" ? "4/3" : "1",
          objectFit: "cover",
          borderRadius: 8,
        }}
      />
      <h3 style={{ margin: 0, fontSize: 16 }}>{resolveBinding(b.title ?? "", dsl)}</h3>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#1e3a5f" }}>
          {resolveBinding(b.price ?? "", dsl)}
        </span>
        {Boolean(p.showDiscount) && b.compareAtPrice && (
          <span style={{ fontSize: 14, textDecoration: "line-through", color: "#999" }}>
            {resolveBinding(b.compareAtPrice, dsl)}
          </span>
        )}
      </div>
      {Boolean(p.showRating) && b.rating && (
        <div style={{ fontSize: 14, color: "#f59e0b" }}>
          {"★".repeat(Math.round(Number(resolveBinding(b.rating, dsl)) || 0))}
          {"☆".repeat(5 - Math.round(Number(resolveBinding(b.rating, dsl)) || 0))}
          <span style={{ color: "#666", marginLeft: 4 }}>
            ({resolveBinding(b.reviewCount ?? "", dsl)})
          </span>
        </div>
      )}
      <span style={{ fontSize: 12, color: b.stockStatus ? "#22c55e" : "#ef4444" }}>
        {b.stockStatus ? resolveBinding(b.stockStatus, dsl) : ""}
      </span>
      <button
        style={{
          width: "100%",
          padding: "10px 0",
          background: "#1e3a5f",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600,
          marginTop: 8,
        }}
        onClick={() => alert(`Action: ${JSON.stringify(dsl.actions?.onClickAddToCart)}`)}
      >
        {String(p.buttonLabel ?? "Añadir al carrito")}
      </button>
    </div>
  );
};

const cardStyles: React.CSSProperties = {
  background: "white",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
