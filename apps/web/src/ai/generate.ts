import type { ComponentDSL } from "@fabrika/dsl";

export async function generateComponent(_prompt: string, type: string = "ProductCard"): Promise<ComponentDSL> {
  await new Promise((r) => setTimeout(r, 600));

  return {
    type,
    version: "1.0.0",
    schema: "https://fabrika.dev/schemas/component-v1",
    label: type,
    category: "ecommerce",
    props: { theme: "light", showRating: true, buttonLabel: "Añadir al carrito" },
    styles: { desktop: { maxWidth: "320px", borderRadius: "12px", padding: "16px" } },
    bindings: {
      title: "product.name",
      image: "product.image",
      price: "product.price",
      rating: "product.rating",
      reviewCount: "product.reviewCount",
    },
    actions: {
      onClickAddToCart: { capability: "cart.write", params: { productId: "product.id", quantity: 1 } },
    },
    permissions: ["catalog.read", "cart.write"],
    children: [],
    meta: { author: "ai-builder", source: "ai", createdAt: new Date().toISOString(), tags: ["product", "card"] },
  };
}
