import { useEffect } from 'react';
import { useSession, signOut as authSignOut } from '@/lib/authClient';
import { useAuthStore } from '@/stores/authStore';
import type { UserRole } from '@/types/roles';

/**
 * Syncs the better-auth session with the Zustand auth store.
 *
 * Mount this once near the top of the component tree (e.g. in App.tsx).
 * It keeps `useAuthStore` in sync with the real session so that all existing
 * code that reads from the store continues to work without changes.
 */
export function useAuthSync() {
  const { data: session, isPending } = useSession();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (isPending) return;

    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name ?? null,
        email: session.user.email,
        role: ((session.user as any).role as UserRole) ?? 'EXPLORER',
        avatarUrl: session.user.image ?? undefined,
      });
    } else {
      clearUser();
    }
  }, [session, isPending, setUser, clearUser]);

  return { isPending };
}

/**
 * Signs the user out via better-auth and clears the local store.
 */
export async function signOut() {
  await authSignOut();
  useAuthStore.getState().clearUser();
}
