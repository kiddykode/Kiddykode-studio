// This is a placeholder for Better Auth configuration
// In a full implementation, you would initialize Better Auth here with the Prisma adapter.

/*
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../lib/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    // Adding role to the session
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "EXPLORER",
            }
        }
    }
});
*/

// For the demo/scaffold, we'll export a mock auth check
export const mockAuthMiddleware = async (c: any, next: any) => {
  // Simulating an authenticated user for development
  // In production, this would be replaced by actual session validation
  c.set('user', {
    id: 'user_1',
    email: 'dev@kiddykode.com',
    role: 'ADMIN', // Switch this to test different roles
  });
  await next();
};
