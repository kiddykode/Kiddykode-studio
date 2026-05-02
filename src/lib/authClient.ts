import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import type { UserRole } from '@/types/roles';

/**
 * The better-auth client.
 *
 * `baseURL` points to the API server.  In development this is the Hono server
 * running on port 3001.  In production on Vercel, leave VITE_API_URL unset so
 * requests go to the same origin via the /api/* rewrite rule.
 */
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  plugins: [
    // Extend the inferred session user type with our custom `role` field
    inferAdditionalFields({
      user: {
        role: {
          type: 'string' as const,
          required: false,
        },
      },
    }),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

// Inferred types
export type Session = typeof authClient.$Infer.Session;
export type SessionUser = typeof authClient.$Infer.Session.user & {
  role?: UserRole;
};
