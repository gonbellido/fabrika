import type {
  CatalogProvider,
  Product,
  Category,
  CatalogFilters,
  PaginatedResult,
  CartProvider,
  Cart,
  CartItem,
  OrdersProvider,
  Order,
  OrderStatus,
  CustomerProvider,
  Customer,
} from "../providers/index.js";

/** Configuración de conexión a WooCommerce */
export interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
}

/**
 * WooCommerce Adapter — traduce la API REST de WooCommerce a los Providers de Fabrika.
 * Implementa CatalogProvider, CartProvider, OrdersProvider, CustomerProvider.
 */
export class WooCommerceAdapter
  implements CatalogProvider, CartProvider, OrdersProvider, CustomerProvider
{
  private readonly baseUrl: string;
  private readonly auth: string;

  constructor(config: WooCommerceConfig) {
    this.baseUrl = config.url.replace(/\/$/, "");
    this.auth = Buffer.from(
      `${config.consumerKey}:${config.consumerSecret}`,
    ).toString("base64");
  }

  private async request<T>(
    path: string,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}/wp-json/wc/v3/${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) =>
        url.searchParams.set(k, v),
      );
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `WooCommerce API error ${res.status}: ${body}`,
      );
    }

    return res.json() as Promise<T>;
  }

  // ── CatalogProvider ──────────────────────────────────

  async getProduct(id: string): Promise<Product> {
    const raw = await this.request<WooProduct>(`products/${id}`);
    return this.mapProduct(raw);
  }

  async getProducts(
    filters?: CatalogFilters,
  ): Promise<PaginatedResult<Product>> {
    const params: Record<string, string> = { per_page: "20" };

    if (filters?.categoryId) params["category"] = filters.categoryId;
    if (filters?.search) params["search"] = filters.search;
    if (filters?.minPrice) params["min_price"] = String(filters.minPrice);
    if (filters?.maxPrice) params["max_price"] = String(filters.maxPrice);
    if (filters?.inStock) params["stock_status"] = "instock";
    if (filters?.limit) params["per_page"] = String(filters.limit);
    if (filters?.offset) params["offset"] = String(filters.offset);

    if (filters?.sortBy) {
      const sortMap: Record<string, string> = {
        price_asc: "price",
        price_desc: "price-desc",
        name_asc: "title",
        name_desc: "title-desc",
        newest: "date",
      };
      params["orderby"] = sortMap[filters.sortBy] ?? "date";
    }

    const res = await fetch(
      `${this.baseUrl}/wp-json/wc/v3/products?${new URLSearchParams(params)}`,
      {
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      },
    );

    const total = parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
    const items = (await res.json()) as WooProduct[];

    return {
      items: items.map((p) => this.mapProduct(p)),
      total,
      hasMore: items.length >= (filters?.limit ?? 20),
    };
  }

  async getCategories(): Promise<Category[]> {
    const items = await this.request<WooCategory[]>(
      "products/categories",
      { per_page: "100" },
    );
    return items.map((c) => ({
      id: String(c.id),
      name: c.name,
      slug: c.slug,
      parentId: c.parent ? String(c.parent) : undefined,
      image: c.image?.src,
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
    // WooCommerce no tiene API de carrito nativa — simulado con sesión
    return {
      id: `wc-cart-${_userId}`,
      items: [],
      subtotal: 0,
      total: 0,
      currency: "EUR",
      itemCount: 0,
    };
  }

  async addItem(
    _userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const product = await this.getProduct(productId);
    const item: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0]?.url,
    };
    return {
      id: `wc-cart-${_userId}`,
      items: [item],
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

  async removeItem(
    userId: string,
    _productId: string,
  ): Promise<Cart> {
    return this.getCart(userId);
  }

  async clearCart(_userId: string): Promise<void> {
    // WooCommerce no tiene API de carrito
  }

  // ── OrdersProvider ──────────────────────────────────

  async getOrder(_userId: string, orderId: string): Promise<Order> {
    const raw = await this.request<WooOrder>(`orders/${orderId}`);
    return this.mapOrder(raw);
  }

  async getOrders(userId: string): Promise<Order[]> {
    const items = await this.request<WooOrder[]>("orders", {
      customer: userId,
      per_page: "50",
    });
    return items.map((o) => this.mapOrder(o));
  }

  async createOrder(_userId: string, _cartId: string): Promise<Order> {
    throw new Error("WooCommerce: createOrder requires checkout flow");
  }

  async updateOrderStatus(
    _userId: string,
    _orderId: string,
    _status: OrderStatus,
  ): Promise<Order> {
    throw new Error("WooCommerce: updateOrderStatus not implemented");
  }

  // ── CustomerProvider ────────────────────────────────

  async getCustomer(userId: string): Promise<Customer> {
    const raw = await this.request<WooCustomer>(`customers/${userId}`);
    return {
      id: String(raw.id),
      email: raw.email,
      firstName: raw.first_name,
      lastName: raw.last_name,
      addresses: [],
      orderCount: 0,
      totalSpent: 0,
      createdAt: raw.date_created ?? "",
    };
  }

  async updateCustomer(
    userId: string,
    _data: Partial<Customer>,
  ): Promise<Customer> {
    return this.getCustomer(userId);
  }

  // ── Mappers ─────────────────────────────────────────

  private mapProduct(raw: WooProduct): Product {
    return {
      id: String(raw.id),
      name: raw.name,
      description: raw.description,
      price: parseFloat(raw.price ?? "0"),
      compareAtPrice: raw.regular_price
        ? parseFloat(raw.regular_price)
        : undefined,
      currency: "EUR",
      images: raw.images.map((img) => ({
        id: String(img.id),
        url: img.src,
        alt: img.alt,
      })),
      rating: parseFloat(raw.average_rating ?? "0"),
      reviewCount: raw.rating_count ?? 0,
      stockStatus:
        raw.stock_status === "instock"
          ? "in_stock"
          : raw.stock_status === "outofstock"
            ? "out_of_stock"
            : "backorder",
      categories: raw.categories.map((c) => String(c.id)),
      variants: raw.variations?.map((v) => ({
        id: String(v),
        name: "",
        stockStatus: "in_stock" as const,
        attributes: {},
      })),
    };
  }

  private mapOrder(raw: WooOrder): Order {
    return {
      id: String(raw.id),
      userId: String(raw.customer_id),
      status: this.mapOrderStatus(raw.status),
      items: raw.line_items.map((item) => ({
        productId: String(item.product_id),
        name: item.name,
        price: parseFloat(item.price ?? "0"),
        quantity: item.quantity,
      })),
      subtotal: parseFloat(raw.total ?? "0"),
      tax: parseFloat(raw.total_tax ?? "0"),
      shipping: parseFloat(raw.shipping_total ?? "0"),
      total: parseFloat(raw.total ?? "0"),
      currency: raw.currency ?? "EUR",
      createdAt: raw.date_created ?? "",
      updatedAt: raw.date_modified ?? "",
    };
  }

  private mapOrderStatus(status: string): OrderStatus {
    const map: Record<string, OrderStatus> = {
      pending: "pending",
      processing: "processing",
      completed: "delivered",
      cancelled: "cancelled",
      refunded: "refunded",
    };
    return map[status] ?? "pending";
  }
}

// ── WooCommerce API types ──────────────────────────────

interface WooProduct {
  id: number;
  name: string;
  description?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  average_rating?: string;
  rating_count?: number;
  stock_status: string;
  images: Array<{ id: number; src: string; alt?: string }>;
  categories: Array<{ id: number; name: string; slug: string }>;
  variations?: number[];
}

interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  image?: { src: string } | null;
}

interface WooOrder {
  id: number;
  customer_id: number;
  status: string;
  total: string;
  total_tax: string;
  shipping_total: string;
  currency?: string;
  line_items: Array<{
    product_id: number;
    name: string;
    price?: string;
    quantity: number;
  }>;
  date_created?: string;
  date_modified?: string;
}

interface WooCustomer {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  date_created?: string;
}
