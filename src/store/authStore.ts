import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  token: string | null;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

/**
 * Zustand Auth Store with Persist Middleware
 * Uses partialize to save ONLY data fields (token, userName) to localStorage,
 * excluding action functions (login, logout) to keep localStorage clean.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,

      login: (name: string) =>
        set(() => ({
          token: `token-${Date.now()}`,
          userName: name,
        })),

      logout: () =>
        set(() => ({
          token: null,
          userName: null,
        })),
    }),
    {
      name: 'auth-storage', // localStorage key
      // Partialize: only persist state data fields, omit actions
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
      }),
    }
  )
);

export default useAuthStore;
