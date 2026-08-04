// TypeScript types matching component-v1.schema.json
// Generated from JSON Schema — kept in sync manually for prototype

export interface ComponentDSL {
  type: string;
  version: string;
  schema: "https://fabrika.dev/schemas/component-v1";
  label?: string;
  description?: string;
  category?: "layout" | "content" | "ecommerce" | "media" | "form" | "navigation" | "custom";
  props?: Record<string, unknown>;
  styles?: {
    desktop?: Record<string, string | number>;
    tablet?: Record<string, string | number>;
    mobile?: Record<string, string | number>;
  };
  bindings?: Record<string, string>;
  actions?: Record<string, ComponentAction>;
  permissions: string[];
  children?: ComponentDSL[];
  slots?: Record<string, ComponentDSL[]>;
  meta?: {
    author?: string;
    source?: "ai" | "human" | "import" | "template";
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
  };
}

export interface ComponentAction {
  capability: string;
  params?: Record<string, string | number | boolean>;
  confirm?: string;
  onSuccess?: string;
  onError?: string;
}

export type PublicationState = "draft" | "preview" | "published";

export interface EditorState {
  component: ComponentDSL | null;
  selectedId: string | null;
  history: ComponentDSL[];
  historyIndex: number;
  publicationState: PublicationState;
}
