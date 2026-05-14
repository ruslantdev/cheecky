// import {create} from 'zustand';
//
// interface LayoutDefaultStore {
//   isSidebarCollapsed: boolean;
//   toggleSidebar: () => void;
//   collapseSidebar: () => void;
//   expandSidebar: () => void;
// }
//
// const initialStore = {
//   isSidebarCollapsed: false,
// };
//
// const useStoreLayoutDefault = create<LayoutDefaultStore>((set) => ({
//   ...initialStore,
//
//   toggleSidebar: () =>
//     set((state) => ({isSidebarCollapsed: !state.isSidebarCollapsed})),
//
//   collapseSidebar: () => set({isSidebarCollapsed: true}),
//
//   expandSidebar: () => set({isSidebarCollapsed: false}),
// }));
//
// export default useStoreLayoutDefault;
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface LayoutDefaultStore {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
}

const useStoreLayoutDefault = create<LayoutDefaultStore>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,

      toggleSidebar: () =>
        set((state) => ({isSidebarCollapsed: !state.isSidebarCollapsed})),

      collapseSidebar: () => set({isSidebarCollapsed: true}),

      expandSidebar: () => set({isSidebarCollapsed: false}),
    }),
    {
      name: 'layout-default', // 🔑 ключ в localStorage
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed, // ✅ храним ТОЛЬКО нужное
      }),
    }
  )
);

export default useStoreLayoutDefault;
