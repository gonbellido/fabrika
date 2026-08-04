export type CapabilityScope = "Tenant" | "Usuario";

export interface CapabilityDefinition {
  /** Identificador canónico: namespace.resource.action */
  id: string;
  /** Descripción de qué permite */
  allows: string;
  /** Qué explícitamente prohíbe */
  denies: string;
  /** Scope de los datos accesibles */
  scope: CapabilityScope;
  /** Si está disponible por defecto para todos los tenants */
  default: boolean;
}

export type CapabilityCatalog = readonly CapabilityDefinition[];

export interface AuthorizationRequest {
  capability: string;
  tenantId: string;
  userId?: string;
}

export type AuthorizationResult = { authorized: true } | { authorized: false; reason: string };
