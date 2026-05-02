import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '../lib/prisma';

/**
 * The single better-auth instance for the server.
 *
 * Environment variables required:
 *   BETTER_AUTH_SECRET  – random secret (min 32 chars)
 *   BETTER_AUTH_URL     – full URL of this API server (e.g. http://localhost:3001)
 *   CLIENT_URL          – full URL of the frontend (e.g. http://localhost:5173)
 */
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3001',

  // Allow the frontend dev server (and production domain) to make auth requests
  trustedOrigins: [
    process.env.CLIENT_URL ?? 'http://localhost:5173',
  ],

  emailAndPassword: {
    enabled: true,
    // Require email verification before login (set to true in production)
    requireEmailVerification: false,
  },

  // Extend the user object with our custom `role` field.
  // better-auth stores this in the `users` table alongside its own fields.
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'EXPLORER',
        required: false,
      },
    },
  },

  session: {
    // Sessions expire after 30 days; sliding window keeps active users logged in
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24, // refresh the session cookie every 24 h of activity
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache session in cookie for 5 min to reduce DB reads
    },
  },
});

export type Auth = typeof auth;
