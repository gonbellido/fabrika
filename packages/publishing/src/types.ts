import type { ComponentDSL } from "@fabrika/dsl";

export type Breakpoint = "desktop" | "tablet" | "mobile";

export interface PageToPublish {
  id: string;
  siteId: string;
  tenantId: string;
  title: string;
  slug: string;
  dsl: ComponentDSL;
  state: "draft" | "preview" | "published";
  version: number;
}

export interface PublishedPage {
  pageId: string;
  version: number;
  html: Record<Breakpoint, string>;
  assets: string[];
  meta: PageMeta;
  flags: FeatureFlag[];
}

export interface PageMeta {
  title: string;
  description?: string;
  slug: string;
  publishedAt: string;
}

export interface FeatureFlag {
  key: string;
  description: string;
  /** Component labels this flag controls */
  targets: string[];
  /** Percentage rollout (0-100) */
  rollout: number;
  enabled: boolean;
}

export interface PublishResult {
  pageId: string;
  version: number;
  url: string;
  html: Record<Breakpoint, string>;
  flags: FeatureFlag[];
}

export interface RollbackTarget {
  pageId: string;
  toVersion: number;
  reason: string;
}
