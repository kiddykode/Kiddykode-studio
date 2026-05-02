import { Context, Next } from 'hono';
import { auth } from './session';

// ─────────────────────────────────────────────────────────────────────────────
// Role types — single source of truth for the server
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Typed Hono context variables
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

export type AppVariables = {
  user: AuthUser | null;
};

// ─────────────────────────────────────────────────────────────────────────────
// Session middleware — validates the better-auth session on every request
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Reads the better-auth session from the incoming request and stores the
 * authenticated user in `c.var.user`.  Unauthenticated requests set
 * `c.var.user` to `null` — individual routes decide whether to reject them.
 */
export async function sessionMiddleware(c: Context<{ Variables: AppVariables }>, next: Next) {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (session?.user) {
      c.set('user', {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name ?? null,
        // better-auth stores additionalFields on the user object
        role: ((session.user as any).role as UserRole) ?? 'EXPLORER',
      });
    } else {
      c.set('user', null);
    }
  } catch {
    // If session lookup fails for any reason, treat as unauthenticated
    c.set('user', null);
  }

  await next();
}

// ─────────────────────────────────────────────────────────────────────────────
// Role-based access control middleware
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Middleware factory that rejects requests whose user role is below `minRole`.
 * Must be used after `sessionMiddleware`.
 */
export function requireRole(minRole: UserRole) {
  return async (c: Context<{ Variables: AppVariables }>, next: Next) => {
    const user = c.get('user');

    if (!user) {
      return c.json({ error: 'Unauthorized', message: 'Authentication required' }, 401);
    }

    const userRoleValue = ROLE_HIERARCHY[user.role] ?? 0;
    const requiredRoleValue = ROLE_HIERARCHY[minRole] ?? 0;

    if (userRoleValue < requiredRoleValue) {
      return c.json(
        {
          error: 'Forbidden',
          message: `Insufficient permissions. Required: ${minRole}, Got: ${user.role}`,
        },
        403,
      );
    }

    await next();
  };
}

/**
 * Convenience middleware — rejects unauthenticated requests (any logged-in
 * user with at least EXPLORER role is allowed through).
 */
export const requireAuth = requireRole('EXPLORER');
