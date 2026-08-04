/** Producto de catálogo — forma canónica independiente del backend */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  rating?: number;
  reviewCount?: number;
  stockStatus: "in_stock" | "out_of_stock" | "backorder";
  stockQuantity?: number;
  categories: string[];
  variants?: ProductVariant[];
  attributes?: Record<string, string>;
  metadata?: Record<string, string>;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  stockStatus: "in_stock" | "out_of_stock";
  attributes: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  image?: string;
}

export interface CatalogFilters {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "name_desc" | "newest";
  limit?: number;
  offset?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

/** Contrato del CatalogProvider que implementan los adapters */
export interface CatalogProvider {
  getProduct(id: string): Promise<Product>;
  getProducts(filters?: CatalogFilters): Promise<PaginatedResult<Product>>;
  getCategories(): Promise<Category[]>;
  getProductsByCategory(categoryId: string, filters?: CatalogFilters): Promise<PaginatedResult<Product>>;
}

// ── Cart ────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  currency: string;
  itemCount: number;
}

export interface CartProvider {
  getCart(userId: string): Promise<Cart>;
  addItem(userId: string, productId: string, quantity: number, variantId?: string): Promise<Cart>;
  updateItem(userId: string, productId: string, quantity: number): Promise<Cart>;
  removeItem(userId: string, productId: string): Promise<Cart>;
  clearCart(userId: string): Promise<void>;
}

// ── Orders ──────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface OrdersProvider {
  getOrder(userId: string, orderId: string): Promise<Order>;
  getOrders(userId: string): Promise<Order[]>;
  createOrder(userId: string, cartId: string): Promise<Order>;
  updateOrderStatus(userId: string, orderId: string, status: OrderStatus): Promise<Order>;
}

// ── Customer ────────────────────────────────────────────

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  addresses: Address[];
  orderCount: number;
  totalSpent: number;
  createdAt: string;
}

export interface CustomerProvider {
  getCustomer(userId: string): Promise<Customer>;
  updateCustomer(userId: string, data: Partial<Customer>): Promise<Customer>;
}
