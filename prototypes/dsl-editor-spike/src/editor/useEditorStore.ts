import { create } from "zustand";
import type { ComponentDSL, PublicationState } from "../dsl/types";
import { validateComponent } from "../dsl/validator";

export interface EditorStore {
  // State
  component: ComponentDSL | null;
  selectedId: string | null;
  history: ComponentDSL[];
  historyIndex: number;
  publicationState: PublicationState;
  validationErrors: string[];
  viewport: "desktop" | "tablet" | "mobile";

  // Actions
  loadComponent: (component: ComponentDSL) => void;
  selectComponent: (label: string | null) => void;
  undo: () => void;
  redo: () => void;
  updateComponent: (updater: (draft: ComponentDSL) => void) => void;
  setPublicationState: (state: PublicationState) => void;
  setViewport: (viewport: "desktop" | "tablet" | "mobile") => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  component: null,
  selectedId: null,
  history: [],
  historyIndex: -1,
  publicationState: "draft",
  validationErrors: [],
  viewport: "desktop",

  loadComponent: (component) => {
    const result = validateComponent(component);
    set({
      component,
      selectedId: null,
      history: [JSON.parse(JSON.stringify(component))],
      historyIndex: 0,
      validationErrors: result.errors,
    });
  },

  selectComponent: (label) => set({ selectedId: label }),

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        historyIndex: newIndex,
        component: JSON.parse(JSON.stringify(history[newIndex])),
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        historyIndex: newIndex,
        component: JSON.parse(JSON.stringify(history[newIndex])),
      });
    }
  },

  updateComponent: (updater) => {
    const { component, history, historyIndex } = get();
    if (!component) return;

    const draft = JSON.parse(JSON.stringify(component)) as ComponentDSL;
    updater(draft);

    const result = validateComponent(draft);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(draft)));

    set({
      component: draft,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      validationErrors: result.errors,
    });
  },

  setPublicationState: (state) => set({ publicationState: state }),

  setViewport: (viewport) => set({ viewport }),
}));
