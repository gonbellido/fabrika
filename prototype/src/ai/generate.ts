import type { ComponentDSL } from "../dsl/types";

// Mocked AI generation — returns a ProductCard for "product card" prompts
// In production, this calls an LLM API with the DSL schema as system prompt
export async function generateComponent(prompt: string, type: string = "ProductCard"): Promise<ComponentDSL> {
  // Simulate AI latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalizedType = type;

  if (normalizedType === "ProductCard" || prompt.toLowerCase().includes("product") || prompt.toLowerCase().includes("producto") || prompt.toLowerCase().includes("tarjeta")) {
    return {
      type: "ProductCard",
      version: "1.0.0",
      schema: "https://fabrika.dev/schemas/component-v1",
      label: prompt.slice(0, 50) || "ProductCard",
      category: "ecommerce",
      props: {
        theme: "light",
        showRating: true,
        showDiscount: true,
        imageRatio: "4:3",
        buttonLabel: "Añadir al carrito",
      },
      styles: {
        desktop: { maxWidth: "320px", borderRadius: "12px", padding: "16px" },
        mobile: { maxWidth: "100%", borderRadius: "8px" },
      },
      bindings: {
        title: "product.name",
        image: "product.images.0.url",
        price: "product.price",
        compareAtPrice: "product.compareAtPrice",
        rating: "product.rating",
        reviewCount: "product.reviewCount",
        stockStatus: "product.stockStatus",
      },
      actions: {
        onClickAddToCart: {
          capability: "cart.write",
          params: { productId: "product.id", quantity: 1 },
          confirm: "¿Añadir al carrito?",
          onSuccess: "cart.updated",
          onError: "cart.error",
        },
      },
      permissions: ["catalog.read", "cart.write"],
      children: [],
      meta: {
        author: "ai-builder-01",
        source: "ai",
        createdAt: new Date().toISOString(),
        tags: ["product", "card", "ai-generated"],
      },
    };
  }

  // Generic fallback
  return {
    type: "Section",
    version: "1.0.0",
    schema: "https://fabrika.dev/schemas/component-v1",
    label: prompt.slice(0, 50),
    category: "layout",
    props: { layout: "column", gap: "16px" },
    styles: {
      desktop: { padding: "40px", display: "flex", flexDirection: "column", gap: "16px" },
    },
    bindings: {},
    actions: {},
    permissions: [],
    children: [],
    meta: {
      author: "ai-builder-01",
      source: "ai",
      createdAt: new Date().toISOString(),
      tags: ["ai-generated"],
    },
  };
}
