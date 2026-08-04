import { describe, it, expect } from "vitest";
import { validateComponent, assertValidComponent } from "./validator";
import type { ComponentDSL } from "./types";

const base: ComponentDSL = {
  type: "ProductCard",
  version: "1.0.0",
  schema: "https://fabrika.dev/schemas/component-v1",
  label: "Test Card",
  category: "ecommerce",
  permissions: ["catalog.read"],
  children: [],
  meta: { source: "ai", author: "test" },
};

describe("validateComponent", () => {
  it("accepts valid component", () => {
    const r = validateComponent(base);
    expect(r.valid).toBe(true);
    expect(r.errors).toHaveLength(0);
  });

  it("accepts component with all optional fields", () => {
    const full: ComponentDSL = {
      ...base,
      description: "A test component",
      props: { theme: "dark", showRating: true },
      styles: {
        desktop: { maxWidth: "320px", padding: "16px" },
        tablet: { maxWidth: "280px" },
        mobile: { maxWidth: "100%" },
      },
      bindings: {
        title: "product.name",
        price: "product.price",
        image: "product.images.0.url",
      },
      actions: {
        onClickAddToCart: {
          capability: "cart.write",
          params: { productId: "product.id", quantity: 1 },
          confirm: "¿Añadir?",
          onSuccess: "cart.updated",
          onError: "cart.error",
        },
      },
      slots: { header: [], footer: [] },
      meta: {
        author: "ai-builder",
        source: "ai",
        createdAt: "2026-08-04T00:00:00Z",
        updatedAt: "2026-08-04T00:00:00Z",
        tags: ["product", "card"],
      },
    };
    const r = validateComponent(full);
    expect(r.valid).toBe(true);
  });

  it("rejects missing required fields", () => {
    const r = validateComponent({ permissions: ["catalog.read"] });
    expect(r.valid).toBe(false);
  });

  it("rejects wrong schema value", () => {
    const r = validateComponent({ ...base, schema: "wrong-schema" });
    expect(r.valid).toBe(false);
  });

  it("rejects empty permissions array", () => {
    const r = validateComponent({ ...base, permissions: [] });
    expect(r.valid).toBe(false);
  });

  it("rejects invalid version format", () => {
    const r = validateComponent({ ...base, version: "v1" });
    expect(r.valid).toBe(false);
  });

  it("rejects duplicate permissions", () => {
    const r = validateComponent({
      ...base,
      permissions: ["catalog.read", "catalog.read"],
    });
    expect(r.valid).toBe(false);
  });

  it("accepts component with children", () => {
    const r = validateComponent({
      ...base,
      children: [base],
    });
    expect(r.valid).toBe(true);
  });

  it("accepts component with slots", () => {
    const r = validateComponent({
      ...base,
      type: "Section",
      slots: { main: [base] },
      permissions: ["catalog.read"],
    });
    expect(r.valid).toBe(true);
  });

  it("accepts all component types", () => {
    const types = [
      "ProductCard",
      "Section",
      "Hero",
      "Button",
      "Image",
      "Heading",
      "Text",
      "Header",
      "Footer",
      "Page",
    ];
    for (const type of types) {
      const r = validateComponent({ ...base, type });
      expect(r.valid, `type ${type} should be valid`).toBe(true);
    }
  });

  it("accepts all categories", () => {
    const cats = [
      "layout",
      "content",
      "ecommerce",
      "media",
      "form",
      "navigation",
      "custom",
    ] as const;
    for (const cat of cats) {
      const r = validateComponent({ ...base, category: cat });
      expect(r.valid, `category ${cat} should be valid`).toBe(true);
    }
  });

  it("rejects invalid category", () => {
    const r = validateComponent({ ...base, category: "invalid" as never });
    expect(r.valid).toBe(false);
  });

  it("rejects unknown additional properties", () => {
    const r = validateComponent({ ...base, unknownField: true } as never);
    expect(r.valid).toBe(false);
  });

  it("returns detailed error messages", () => {
    const r = validateComponent({ type: "X", version: "bad" });
    expect(r.valid).toBe(false);
    expect(r.errors.length).toBeGreaterThan(0);
    expect(r.errors.some((e) => e.includes("schema"))).toBe(true);
  });
});

describe("assertValidComponent", () => {
  it("does not throw for valid component", () => {
    expect(() => assertValidComponent(base)).not.toThrow();
  });

  it("throws for invalid component", () => {
    expect(() => assertValidComponent({ type: "Bad" } as never)).toThrow();
  });
});
