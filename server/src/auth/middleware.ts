import { Context, Next } from 'hono';

export type UserRole =
  | 'GUEST'
  | 'EXPLORER'
  | 'BUILDER'
  | 'CREATOR_ELITE'
  | 'FACILITATOR'
  | 'ADMIN';

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  GUEST: 0,
  EXPLORER: 1,
  BUILDER: 2,
  CREATOR_ELITE: 3,
  FACILITATOR: 4,
  ADMIN: 5,
};

/**
 * Middleware to require a minimum role for a route.
 * Assumes the user is already authenticated and available in c.get('user').
 */
export function requireRole(minRole: UserRole) {
  return async (c: Context, next: Next) => {
    // In a real app, 'user' would be set by the auth middleware (e.g. Better Auth)
    const user = c.get('user') as { role: UserRole } | undefined;

    if (!user) {
      return c.json({ error: 'Unauthorized', message: 'Authentication required' }, 401);
    }

    const userRoleValue = ROLE_HIERARCHY[user.role] ?? 0;
    const requiredRoleValue = ROLE_HIERARCHY[minRole] ?? 0;

    if (userRoleValue < requiredRoleValue) {
      return c.json({ 
        error: 'Forbidden', 
        message: `Insufficient permissions. Required: ${minRole}, Got: ${user.role}` 
      }, 403);
    }

    await next();
  };
}
