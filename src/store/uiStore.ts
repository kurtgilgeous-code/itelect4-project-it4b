import { create } from 'zustand';

export interface UIState {
  selectedCategoryId: string | null;
  sidebarOpen: boolean;
  searchQuery: string;
  setSelectedCategoryId: (categoryId: string | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}

/**
 * Zustand UI Store
 * Dedicated store managing global client-side UI states
 * (e.g., active category filter, sidebar toggle, search term)
 */
export const useUIStore = create<UIState>()((set) => ({
  selectedCategoryId: null,
  sidebarOpen: true,
  searchQuery: '',

  setSelectedCategoryId: (categoryId: string | null) =>
    set({ selectedCategoryId: categoryId }),

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open: boolean) =>
    set({ sidebarOpen: open }),

  setSearchQuery: (query: string) =>
    set({ searchQuery: query }),
}));

export default useUIStore;
