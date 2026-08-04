// Providers (contracts)
export type {
  Product,
  ProductImage,
  ProductVariant,
  Category,
  CatalogFilters,
  PaginatedResult,
  CatalogProvider,
} from "./providers/index.js";

export type {
  CartItem,
  Cart,
  CartProvider,
} from "./providers/index.js";

export type {
  OrderItem,
  Order,
  OrderStatus,
  Address,
  OrdersProvider,
} from "./providers/index.js";

export type {
  Customer,
  CustomerProvider,
} from "./providers/index.js";

// Adapters
export {
  WooCommerceAdapter,
  type WooCommerceConfig,
} from "./woocommerce/adapter.js";

export {
  ShopifyAdapter,
  type ShopifyConfig,
} from "./shopify/adapter.js";

// Registry
export {
  registerAdapter,
  getAdapter,
  removeAdapter,
  getCatalogProvider,
  getCartProvider,
  getOrdersProvider,
  type AdapterType,
  type AdapterInstance,
} from "./registry.js";
