// TypeScript types for Fabrika DSL v1
// Keep in sync with component-v1.schema.json

export interface ComponentDSL {
  type: string;
  version: string;
  schema: "https://fabrika.dev/schemas/component-v1";
  label?: string;
  description?: string;
  category?: ComponentCategory;
  props?: Record<string, unknown>;
  styles?: ResponsiveStyles;
  bindings?: Record<string, string>;
  actions?: Record<string, ComponentAction>;
  permissions: string[];
  children?: ComponentDSL[];
  slots?: Record<string, ComponentDSL[]>;
  meta?: ComponentMeta;
}

export type ComponentCategory =
  "layout" | "content" | "ecommerce" | "media" | "form" | "navigation" | "custom";

export interface ResponsiveStyles {
  desktop?: Record<string, string | number>;
  tablet?: Record<string, string | number>;
  mobile?: Record<string, string | number>;
}

export interface ComponentAction {
  capability: string;
  params?: Record<string, string | number | boolean>;
  confirm?: string;
  onSuccess?: string;
  onError?: string;
}

export interface ComponentMeta {
  author?: string;
  source?: "ai" | "human" | "import" | "template";
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
}

export type PublicationState = "draft" | "preview" | "published";
