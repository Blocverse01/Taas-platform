import { create } from "zustand";

interface ModalState {
  parent: HTMLDivElement | null;
  actions: {
    setParent: (parent: HTMLDivElement | null) => void;
  };
}

export const useModalStore = create<ModalState>()((set) => ({
  parent: null,
  actions: {
    setParent(parent) {
      set((state) => ({ ...state, parent }));
    },
  },
}));

export const useModalParent = () => useModalStore((state) => state.parent);
export const useSetModalParent  = () => useModalStore((state) => state.actions.setParent);
