import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole } from '@/types/roles';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User | null, token?: string | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: (user, token = null) => 
        set({ 
          user, 
          isAuthenticated: !!user,
          token: token ?? (user ? null : null) // Keep token if provided, clear if no user
        }),
      clearUser: () => set({ user: null, isAuthenticated: false, token: null }),
    }),
    {
      name: 'kiddykode-auth-storage',
    }
  )
);
