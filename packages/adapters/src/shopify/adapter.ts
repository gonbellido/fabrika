import type {
  CatalogProvider,
  Product,
  Category,
  CatalogFilters,
  PaginatedResult,
  CartProvider,
  Cart,
  OrdersProvider,
  Order,
  OrderStatus,
  CustomerProvider,
  Customer,
} from "../providers/index.js";

/** Configuración de conexión a Shopify */
export interface ShopifyConfig {
  storeDomain: string;
  accessToken: string;
}

/**
 * Shopify Adapter — traduce la API Admin de Shopify a los Providers de Fabrika.
 * Implementa CatalogProvider, CartProvider, OrdersProvider, CustomerProvider.
 */
export class ShopifyAdapter
  implements CatalogProvider, CartProvider, OrdersProvider, CustomerProvider
{
  private readonly storeDomain: string;
  private readonly accessToken: string;

  constructor(config: ShopifyConfig) {
    this.storeDomain = config.storeDomain.replace(/\/$/, "");
    this.accessToken = config.accessToken;
  }

  private async graphql<T>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    const res = await fetch(
      `https://${this.storeDomain}/admin/api/2024-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": this.accessToken,
        },
        body: JSON.stringify({ query, variables }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Shopify API error ${res.status}: ${body}`);
    }

    const data = (await res.json()) as { data?: T; errors?: unknown };
    if (data.errors) {
      throw new Error(`Shopify GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    return data.data as T;
  }

  // ── CatalogProvider ──────────────────────────────────

  async getProduct(id: string): Promise<Product> {
    const gid = id.startsWith("gid://") ? id : `gid://shopify/Product/${id}`;
    const data = await this.graphql<{
      product: ShopifyProduct;
    }>(
      `query getProduct($id: ID!) {
        product(id: $id) {
          id title descriptionHtml
          priceRangeV2 { minVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantPrice { amount } }
          featuredImage { id url altText width height }
          images(first: 10) { edges { node { id url altText width height } } }
          variants(first: 50) { edges { node { id title price availableForSale } } }
          collections(first: 20) { edges { node { id title handle } } }
        }
      }`,
      { id: gid },
    );

    return this.mapProduct(data.product);
  }

  async getProducts(
    filters?: CatalogFilters,
  ): Promise<PaginatedResult<Product>> {
    const first = filters?.limit ?? 20;
    const query = filters?.search
      ? `query:"${filters.search}"`
      : filters?.categoryId
        ? `collection_id:"${filters.categoryId}"`
        : "";

    const data = await this.graphql<{
      products: { edges: Array<{ node: ShopifyProduct }> };
    }>(
      `query getProducts($first: Int!, $query: String) {
        products(first: $first, query: $query) {
          edges { node {
            id title descriptionHtml
            priceRangeV2 { minVariantPrice { amount currencyCode } }
            compareAtPriceRange { minVariantPrice { amount } }
            featuredImage { id url altText width height }
            images(first: 5) { edges { node { id url altText } } }
            variants(first: 10) { edges { node { id title price availableForSale } } }
            collections(first: 5) { edges { node { id title handle } } }
          }}
        }
      }`,
      { first, query: query || undefined },
    );

    const items = data.products.edges.map((e) => this.mapProduct(e.node));

    return {
      items,
      total: items.length,
      hasMore: items.length >= first,
    };
  }

  async getCategories(): Promise<Category[]> {
    const data = await this.graphql<{
      collections: { edges: Array<{ node: ShopifyCollection }> };
    }>(
      `query getCollections {
        collections(first: 100) {
          edges { node { id title handle } }
        }
      }`,
    );

    return data.collections.edges.map((e) => ({
      id: e.node.id,
      name: e.node.title,
      slug: e.node.handle,
    }));
  }

  async getProductsByCategory(
    categoryId: string,
    filters?: CatalogFilters,
  ): Promise<PaginatedResult<Product>> {
    return this.getProducts({ ...filters, categoryId });
  }

  // ── CartProvider ─────────────────────────────────────

  async getCart(_userId: string): Promise<Cart> {
    return {
      id: `shopify-cart-${_userId}`,
      items: [],
      subtotal: 0,
      total: 0,
      currency: "EUR",
      itemCount: 0,
    };
  }

  async addItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const product = await this.getProduct(productId);
    // Shopify usa Storefront API para carrito — aquí simulamos
    return {
      id: `shopify-cart-${userId}`,
      items: [
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images[0]?.url,
        },
      ],
      subtotal: product.price * quantity,
      total: product.price * quantity,
      currency: "EUR",
      itemCount: quantity,
    };
  }

  async updateItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    return this.addItem(userId, productId, quantity);
  }

  async removeItem(userId: string, _productId: string): Promise<Cart> {
    return this.getCart(userId);
  }

  async clearCart(_userId: string): Promise<void> {
    // Shopify storefront API
  }

  // ── OrdersProvider ──────────────────────────────────

  async getOrder(_userId: string, orderId: string): Promise<Order> {
    const gid = orderId.startsWith("gid://")
      ? orderId
      : `gid://shopify/Order/${orderId}`;
    const data = await this.graphql<{ order: ShopifyOrder }>(
      `query getOrder($id: ID!) {
        order(id: $id) {
          id name displayFulfillmentStatus
          totalPriceSet { shopMoney { amount currencyCode } }
          subtotalPriceSet { shopMoney { amount } }
          totalTaxSet { shopMoney { amount } }
          lineItems(first: 50) {
            edges { node { product { id } name quantity originalTotalSet { shopMoney { amount } } } }
          }
          createdAt updatedAt
        }
      }`,
      { id: gid },
    );

    return this.mapOrder(data.order);
  }

  async getOrders(_userId: string): Promise<Order[]> {
    const data = await this.graphql<{
      orders: { edges: Array<{ node: ShopifyOrder }> };
    }>(
      `query getOrders {
        orders(first: 50) {
          edges { node {
            id name displayFulfillmentStatus
            totalPriceSet { shopMoney { amount currencyCode } }
            subtotalPriceSet { shopMoney { amount } }
            totalTaxSet { shopMoney { amount } }
            lineItems(first: 10) {
              edges { node { product { id } name quantity originalTotalSet { shopMoney { amount } } } }
            }
            createdAt updatedAt
          }}
        }
      }`,
    );

    return data.orders.edges.map((e) => this.mapOrder(e.node));
  }

  async createOrder(_userId: string, _cartId: string): Promise<Order> {
    throw new Error("Shopify: createOrder requires checkout API");
  }

  async updateOrderStatus(
    _userId: string,
    _orderId: string,
    _status: OrderStatus,
  ): Promise<Order> {
    throw new Error("Shopify: updateOrderStatus not implemented");
  }

  // ── CustomerProvider ────────────────────────────────

  async getCustomer(_userId: string): Promise<Customer> {
    return {
      id: _userId,
      email: "",
      addresses: [],
      orderCount: 0,
      totalSpent: 0,
      createdAt: "",
    };
  }

  async updateCustomer(
    userId: string,
    _data: Partial<Customer>,
  ): Promise<Customer> {
    return this.getCustomer(userId);
  }

  // ── Mappers ─────────────────────────────────────────

  private mapProduct(raw: ShopifyProduct): Product {
    const price = parseFloat(
      raw.priceRangeV2?.minVariantPrice?.amount ?? "0",
    );
    const compareAt = raw.compareAtPriceRange?.minVariantPrice?.amount
      ? parseFloat(raw.compareAtPriceRange.minVariantPrice.amount)
      : undefined;

    const images = raw.images?.edges?.map((e) => ({
      id: e.node.id,
      url: e.node.url,
      alt: e.node.altText ?? undefined,
      width: e.node.width ?? undefined,
      height: e.node.height ?? undefined,
    })) ?? [];

    if (raw.featuredImage) {
      images.unshift({
        id: raw.featuredImage.id,
        url: raw.featuredImage.url,
        alt: raw.featuredImage.altText ?? undefined,
        width: raw.featuredImage.width ?? undefined,
        height: raw.featuredImage.height ?? undefined,
      });
    }

    return {
      id: raw.id,
      name: raw.title,
      description: raw.descriptionHtml,
      price,
      compareAtPrice: compareAt !== price ? compareAt : undefined,
      currency: raw.priceRangeV2?.minVariantPrice?.currencyCode ?? "EUR",
      images,
      stockStatus: raw.variants?.edges?.[0]?.node?.availableForSale
        ? "in_stock"
        : "out_of_stock",
      categories: raw.collections?.edges?.map((e) => e.node.id) ?? [],
      variants: raw.variants?.edges?.map((e) => ({
        id: e.node.id,
        name: e.node.title,
        price: parseFloat(e.node.price ?? "0"),
        stockStatus: e.node.availableForSale
          ? "in_stock" as const
          : "out_of_stock" as const,
        attributes: {},
      })),
    };
  }

  private mapOrder(raw: ShopifyOrder): Order {
    const amount = raw.totalPriceSet?.shopMoney?.amount ?? "0";
    return {
      id: raw.id,
      userId: "",
      status: this.mapOrderStatus(raw.displayFulfillmentStatus ?? "UNFULFILLED"),
      items: raw.lineItems?.edges?.map((e) => ({
        productId: e.node.product?.id ?? "",
        name: e.node.name ?? "",
        price: parseFloat(
          e.node.originalTotalSet?.shopMoney?.amount ?? "0",
        ),
        quantity: e.node.quantity ?? 0,
      })) ?? [],
      subtotal: parseFloat(
        raw.subtotalPriceSet?.shopMoney?.amount ?? amount,
      ),
      tax: parseFloat(raw.totalTaxSet?.shopMoney?.amount ?? "0"),
      shipping: 0,
      total: parseFloat(amount),
      currency:
        raw.totalPriceSet?.shopMoney?.currencyCode ?? "EUR",
      createdAt: raw.createdAt ?? "",
      updatedAt: raw.updatedAt ?? "",
    };
  }

  private mapOrderStatus(status: string): OrderStatus {
    const map: Record<string, OrderStatus> = {
      FULFILLED: "delivered",
      IN_PROGRESS: "processing",
      ON_HOLD: "pending",
      OPEN: "pending",
      UNFULFILLED: "pending",
      CANCELLED: "cancelled",
    };
    return map[status] ?? "pending";
  }
}

// ── Shopify API types ──────────────────────────────────

interface ShopifyProduct {
  id: string;
  title: string;
  descriptionHtml?: string;
  priceRangeV2?: {
    minVariantPrice?: { amount: string; currencyCode: string };
  };
  compareAtPriceRange?: {
    minVariantPrice?: { amount: string };
  };
  featuredImage?: {
    id: string;
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  } | null;
  images?: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      };
    }>;
  };
  variants?: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price?: string;
        availableForSale: boolean;
      };
    }>;
  };
  collections?: {
    edges: Array<{ node: { id: string; title: string; handle: string } }>;
  };
}

interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

interface ShopifyOrder {
  id: string;
  name?: string;
  displayFulfillmentStatus?: string;
  totalPriceSet?: {
    shopMoney?: { amount: string; currencyCode: string };
  };
  subtotalPriceSet?: {
    shopMoney?: { amount: string };
  };
  totalTaxSet?: {
    shopMoney?: { amount: string };
  };
  lineItems?: {
    edges: Array<{
      node: {
        product?: { id: string } | null;
        name?: string;
        quantity?: number;
        originalTotalSet?: { shopMoney?: { amount: string } };
      };
    }>;
  };
  createdAt?: string;
  updatedAt?: string;
}
