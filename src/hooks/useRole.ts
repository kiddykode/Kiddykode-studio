import { useAuthStore } from '@/stores/authStore';
import { hasAccess, type UserRole } from '@/types/roles';

export function useRole() {
  const user = useAuthStore((s) => s.user);
  const role: UserRole = user?.role ?? 'GUEST';

  return {
    role,
    user,
    isAuthenticated: useAuthStore((s) => s.isAuthenticated),
    isGuest: role === 'GUEST',
    isExplorer: role === 'EXPLORER',
    isBuilder: role === 'BUILDER',
    isCreatorElite: role === 'CREATOR_ELITE',
    isFacilitator: role === 'FACILITATOR',
    isAdmin: role === 'ADMIN',
    /**
     * Helper to check if the current user has at least the required role.
     */
    can: (required: UserRole) => hasAccess(role, required),
    /**
     * Helper to check if the user has exactly the required role.
     */
    is: (required: UserRole) => role === required,
  };
}
