import type {
  CatalogProvider,
  CartProvider,
  OrdersProvider,
  CustomerProvider,
} from "./providers/index.js";

export type AdapterType = "woocommerce" | "shopify" | "postgres";

export interface AdapterInstance {
  catalog?: CatalogProvider;
  cart?: CartProvider;
  orders?: OrdersProvider;
  customer?: CustomerProvider;
  type: AdapterType;
}

const registry = new Map<string, AdapterInstance>();

export function registerAdapter(
  tenantId: string,
  adapter: AdapterInstance,
): void {
  registry.set(tenantId, adapter);
}

export function getAdapter(tenantId: string): AdapterInstance | undefined {
  return registry.get(tenantId);
}

export function removeAdapter(tenantId: string): void {
  registry.delete(tenantId);
}

export function getCatalogProvider(
  tenantId: string,
): CatalogProvider | undefined {
  return registry.get(tenantId)?.catalog;
}

export function getCartProvider(
  tenantId: string,
): CartProvider | undefined {
  return registry.get(tenantId)?.cart;
}

export function getOrdersProvider(
  tenantId: string,
): OrdersProvider | undefined {
  return registry.get(tenantId)?.orders;
}
