import { create } from "zustand";
import type { ComponentDSL } from "@fabrika/dsl";
import { validateComponent } from "@fabrika/dsl";

export type Viewport = "desktop" | "tablet" | "mobile";
export type PubState = "draft" | "preview" | "published";

interface EditorStore {
  tree: ComponentDSL | null;
  selectedId: string | null;
  viewport: Viewport;
  pubState: PubState;
  errors: string[];

  loadTree: (tree: ComponentDSL) => void;
  selectComponent: (id: string | null) => void;
  setViewport: (v: Viewport) => void;
  setPubState: (s: PubState) => void;
  clearErrors: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
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
  setViewport: (viewport) => set({ viewport }),
  setPubState: (pubState) => set({ pubState }),
  clearErrors: () => set({ errors: [] }),
}));
