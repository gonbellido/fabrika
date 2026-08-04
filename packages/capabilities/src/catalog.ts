import type { CapabilityCatalog, CapabilityDefinition } from "./types.js";

export const CATALOG: CapabilityCatalog = [
  // ── Core ──────────────────────────────────────────────────
  {
    id: "media.read",
    allows: "Leer archivos multimedia del tenant",
    denies: "Leer media de otro tenant. Escribir/modificar/borrar media",
    scope: "Tenant",
    default: true,
  },
  {
    id: "media.write",
    allows: "Subir y reemplazar archivos multimedia",
    denies: "Borrar media. Acceder a media de otro tenant",
    scope: "Tenant",
    default: true,
  },
  {
    id: "user.read",
    allows: "Leer perfil del usuario autenticado",
    denies: "Leer datos de otros usuarios. Leer credenciales/hashes",
    scope: "Usuario",
    default: true,
  },
  {
    id: "user.write",
    allows: "Modificar perfil propio",
    denies: "Modificar otros usuarios. Cambiar roles",
    scope: "Usuario",
    default: true,
  },
  {
    id: "site.read",
    allows: "Leer configuración del site",
    denies: "Leer sites de otro tenant",
    scope: "Tenant",
    default: true,
  },
  {
    id: "site.write",
    allows: "Modificar configuración del site (nombre, dominio, SEO)",
    denies: "Modificar sites de otro tenant",
    scope: "Tenant",
    default: true,
  },

  // ── Catalog ───────────────────────────────────────────────
  {
    id: "catalog.read",
    allows: "Leer productos y categorías publicados",
    denies: "Leer productos no publicados o de otro tenant",
    scope: "Tenant",
    default: true,
  },
  {
    id: "catalog.write",
    allows: "Crear y modificar productos y categorías",
    denies: "Borrar productos. Modificar catálogo de otro tenant",
    scope: "Tenant",
    default: false,
  },
  {
    id: "catalog.delete",
    allows: "Borrar productos y categorías",
    denies: "Borrar productos con pedidos asociados",
    scope: "Tenant",
    default: false,
  },

  // ── Cart ──────────────────────────────────────────────────
  {
    id: "cart.read",
    allows: "Leer el carrito del usuario actual",
    denies: "Leer carritos de otros usuarios",
    scope: "Usuario",
    default: true,
  },
  {
    id: "cart.write",
    allows: "Añadir, modificar cantidad, quitar items",
    denies: "Modificar carritos de otros usuarios",
    scope: "Usuario",
    default: true,
  },

  // ── Orders ────────────────────────────────────────────────
  {
    id: "orders.read",
    allows: "Leer pedidos del usuario actual",
    denies: "Leer pedidos de otros usuarios",
    scope: "Usuario",
    default: true,
  },
  {
    id: "orders.create",
    allows: "Crear un pedido desde el carrito",
    denies: "Crear pedidos para otros usuarios. Modificar precios",
    scope: "Usuario",
    default: true,
  },
  {
    id: "orders.update",
    allows: "Modificar estado del pedido (cancelar)",
    denies: "Modificar pedidos completados o de otros usuarios",
    scope: "Usuario",
    default: false,
  },

  // ── Content ───────────────────────────────────────────────
  {
    id: "content.read",
    allows: "Leer páginas y entradas publicadas",
    denies: "Leer drafts no publicados. Leer contenido de otro tenant",
    scope: "Tenant",
    default: true,
  },
  {
    id: "content.write",
    allows: "Crear y modificar páginas y entradas",
    denies: "Publicar sin pasar por el pipeline de publicación",
    scope: "Tenant",
    default: false,
  },

  // ── Forms ─────────────────────────────────────────────────
  {
    id: "forms.read",
    allows: "Leer configuraciones de formularios del site",
    denies: "Leer submissions con datos personales",
    scope: "Tenant",
    default: true,
  },
  {
    id: "forms.submit",
    allows: "Enviar datos a un formulario",
    denies: "Leer submissions de otros. Modificar formularios",
    scope: "Usuario",
    default: true,
  },
  {
    id: "forms.submissions.read",
    allows: "Leer submissions de formularios",
    denies: "Leer submissions de otro tenant. Leer datos de pago",
    scope: "Tenant",
    default: false,
  },

  // ── Auth ──────────────────────────────────────────────────
  {
    id: "auth.login",
    allows: "Autenticar usuario",
    denies: "Bypass MFA. Suplantar usuario",
    scope: "Usuario",
    default: true,
  },
  {
    id: "auth.register",
    allows: "Registrar nuevo usuario",
    denies: "Asignar roles. Crear admins",
    scope: "Usuario",
    default: true,
  },
  {
    id: "tenant.users.read",
    allows: "Leer lista de usuarios del tenant",
    denies: "Leer credenciales. Leer usuarios de otro tenant",
    scope: "Tenant",
    default: false,
  },
  {
    id: "tenant.users.write",
    allows: "Invitar, modificar roles, desactivar usuarios",
    denies: "Modificar admins sin ser admin",
    scope: "Tenant",
    default: false,
  },

  // ── Analytics ─────────────────────────────────────────────
  {
    id: "analytics.read",
    allows: "Leer métricas agregadas del site",
    denies: "Leer datos individuales. Leer analytics de otro tenant",
    scope: "Tenant",
    default: false,
  },

  // ── SEO ───────────────────────────────────────────────────
  {
    id: "seo.read",
    allows: "Leer configuración SEO del site",
    denies: "Modificar SEO",
    scope: "Tenant",
    default: true,
  },
  {
    id: "seo.write",
    allows: "Modificar metadata SEO, sitemap, robots",
    denies: "Modificar SEO de otro tenant",
    scope: "Tenant",
    default: false,
  },

  // ── Payments ──────────────────────────────────────────────
  {
    id: "payment.initiate",
    allows: "Iniciar un pago",
    denies: "Acceder a datos de tarjeta completos. Modificar importe",
    scope: "Usuario",
    default: true,
  },
  {
    id: "payment.read",
    allows: "Leer estado de pagos propios",
    denies: "Leer pagos de otros usuarios. Leer datos de tarjeta",
    scope: "Usuario",
    default: true,
  },
  {
    id: "checkout.process",
    allows: "Ejecutar el flujo de checkout completo",
    denies: "Modificar precios. Saltar validación de stock",
    scope: "Usuario",
    default: true,
  },

  // ── Customers ──────────────────────────────────────────────
  {
    id: "customers.read",
    allows: "Leer perfil del cliente actual",
    denies: "Leer clientes de otro tenant",
    scope: "Usuario",
    default: true,
  },
  {
    id: "customers.write",
    allows: "Modificar datos del perfil propio",
    denies: "Modificar otros clientes o pedidos",
    scope: "Usuario",
    default: true,
  },
] as const;

// Helpers
export function getCapability(id: string): CapabilityDefinition | undefined {
  return CATALOG.find((c) => c.id === id);
}

export function isCapabilityAuthorized(
  capability: string,
  componentPermissions: string[],
): boolean {
  if (!componentPermissions.includes(capability)) return false;
  return getCapability(capability) !== undefined;
}

export function getDefaultCapabilities(): string[] {
  return CATALOG.filter((c) => c.default).map((c) => c.id);
}

export function getCapabilitiesByScope(scope: "Tenant" | "Usuario"): CapabilityDefinition[] {
  return CATALOG.filter((c) => c.scope === scope);
}
