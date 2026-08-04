import type { ComponentDSL } from "../dsl/types";
import type { FC } from "react";

export interface ComponentRenderer {
  type: string;
  component: FC<{ dsl: ComponentDSL }>;
}

const registry = new Map<string, FC<{ dsl: ComponentDSL }>>();

export function registerComponent(type: string, component: FC<{ dsl: ComponentDSL }>) {
  registry.set(type, component);
}

export function getRenderer(type: string): FC<{ dsl: ComponentDSL }> | undefined {
  return registry.get(type);
}

export function getRegisteredTypes(): string[] {
  return Array.from(registry.keys());
}
