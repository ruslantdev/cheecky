import {create} from 'zustand';

interface TLayoutDefaultStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

const useStoreLayoutDefault = create<TLayoutDefaultStore>()((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => set({isOpen}),
  toggle: () => set((state) => ({isOpen: !state.isOpen})),
}));

export default useStoreLayoutDefault;
