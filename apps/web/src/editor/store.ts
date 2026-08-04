import { create } from "zustand";
import type { ComponentDSL } from "@fabrika/dsl";
import { validateComponent } from "@fabrika/dsl";

export type Viewport = "desktop" | "tablet" | "mobile";
export type PubState = "draft" | "preview" | "published";

function makeComponent(type: string, label: string): ComponentDSL {
  return {
    type,
    version: "1.0.0",
    schema: "https://fabrika.dev/schemas/component-v1",
    label,
    category: "custom",
    permissions: ["content.read"],
    children: [],
    meta: { source: "human", author: "editor", createdAt: new Date().toISOString() },
  };
}

interface EditorStore {
  tree: ComponentDSL | null;
  selectedId: string | null;
  viewport: Viewport;
  pubState: PubState;
  errors: string[];

  loadTree: (tree: ComponentDSL) => void;
  selectComponent: (id: string | null) => void;
  addComponent: (parentId: string | null, type: string, label: string, slotName?: string) => void;
  removeComponent: (id: string) => void;
  moveComponent: (fromId: string, toIndex: number, parentId?: string) => void;
  setViewport: (v: Viewport) => void;
  setPubState: (s: PubState) => void;
}

function findAndUpdate(
  node: ComponentDSL,
  targetLabel: string,
  fn: (n: ComponentDSL) => ComponentDSL,
): ComponentDSL | null {
  if (node.label === targetLabel) return fn(node);
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const result = findAndUpdate(node.children[i]!, targetLabel, fn);
      if (result) {
        const newChildren = [...node.children];
        newChildren[i] = result;
        return { ...node, children: newChildren };
      }
    }
  }
  if (node.slots) {
    for (const [slotName, children] of Object.entries(node.slots)) {
      for (let i = 0; i < children.length; i++) {
        const result = findAndUpdate(children[i]!, targetLabel, fn);
        if (result) {
          const newSlotChildren = [...children];
          newSlotChildren[i] = result;
          return { ...node, slots: { ...node.slots, [slotName]: newSlotChildren } };
        }
      }
    }
  }
  return null;
}

function findAndRemove(node: ComponentDSL, targetLabel: string): ComponentDSL | null {
  if (node.children) {
    const idx = node.children.findIndex((c) => c.label === targetLabel);
    if (idx >= 0) {
      const newChildren = [...node.children];
      newChildren.splice(idx, 1);
      return { ...node, children: newChildren };
    }
    for (let i = 0; i < node.children.length; i++) {
      const result = findAndRemove(node.children[i]!, targetLabel);
      if (result) {
        const newChildren = [...node.children];
        newChildren[i] = result;
        return { ...node, children: newChildren };
      }
    }
  }
  if (node.slots) {
    for (const [slotName, children] of Object.entries(node.slots)) {
      const idx = children.findIndex((c) => c.label === targetLabel);
      if (idx >= 0) {
        const newSlotChildren = [...children];
        newSlotChildren.splice(idx, 1);
        return { ...node, slots: { ...node.slots, [slotName]: newSlotChildren } };
      }
      for (let i = 0; i < children.length; i++) {
        const result = findAndRemove(children[i]!, targetLabel);
        if (result) {
          const newSlotChildren = [...children];
          newSlotChildren[i] = result;
          return { ...node, slots: { ...node.slots, [slotName]: newSlotChildren } };
        }
      }
    }
  }
  return null;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  tree: null,
  selectedId: null,
  viewport: "desktop",
  pubState: "draft",
  errors: [],

  loadTree: (tree) => {
    const result = validateComponent(tree);
    set({ tree, errors: result.errors, selectedId: null });
  },

  selectComponent: (id) => set({ selectedId: id }),

  addComponent: (parentId, type, label, slotName) => {
    const { tree } = get();
    if (!tree) {
      const newTree = makeComponent("Page", "Page-1");
      newTree.children = [makeComponent(type, label)];
      const r = validateComponent(newTree);
      set({ tree: newTree, errors: r.errors });
      return;
    }

    const newChild = makeComponent(type, label);
    const key = parentId ? parentId : tree.label!;

    const updated = findAndUpdate(tree, key, (node) => {
      if (slotName && node.slots?.[slotName]) {
        return { ...node, slots: { ...node.slots, [slotName]: [...node.slots[slotName]!, newChild] } };
      }
      return { ...node, children: [...(node.children ?? []), newChild] };
    });

    if (updated) {
      const r = validateComponent(updated);
      set({ tree: updated, errors: r.errors, selectedId: label });
    }
  },

  removeComponent: (id) => {
    const { tree } = get();
    if (!tree) return;
    const updated = findAndRemove(tree, id);
    if (updated) {
      const r = validateComponent(updated);
      set({ tree: updated, errors: r.errors, selectedId: null });
    }
  },

  moveComponent: (_fromId, _toIndex, _parentId) => {
    // TODO: implement reorder with @dnd-kit
  },

  setViewport: (viewport) => set({ viewport }),
  setPubState: (pubState) => set({ pubState }),
}));
