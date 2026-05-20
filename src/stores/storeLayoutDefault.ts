import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {TSidebarVariant} from '@/types';

interface TLayoutDefaultStore {
  sidebar: TSidebarVariant;
  setSidebar: (variant: TSidebarVariant) => void;
}

const useStoreLayoutDefault = create<TLayoutDefaultStore>()(
  persist(
    (set) => ({
      sidebar: 'opened',
      setSidebar: (variant) => set({sidebar: variant}),
    }),
    {
      name: 'layout-default',
      partialize: (state) => ({sidebar: state.sidebar}),
    }
  )
);

export default useStoreLayoutDefault;
