# Troubleshooting Guide - Prisma & Build Issues

This document records technical issues encountered during development and deployment, with their respective solutions.

## 1. Vercel Build Failure (esbuild error in `App.tsx`)

**Issue**: The Vercel build fails with a cryptic `esbuild` error pointing to specific routes in `src/App.tsx`, even if the code appears syntactically correct and builds locally.

**Cause**: This is often caused by hidden non-ASCII characters, inconsistent line endings (CRLF vs LF), or subtle formatting issues that `esbuild` encounters in the Vercel environment.

**Solution**: Normalize the file by rewriting it entirely with consistent indentation and removing any invisible characters. 
- You can use `cat -A` to inspect for hidden characters.
- Ensure all JSX tags are explicitly and correctly closed.
- Re-formatting with a consistent tool (like Prettier) or manual rewrite often resolves it.

---

## 2. Prisma: `ERR_MODULE_NOT_FOUND` or Client Discovery Issues (Seed Scripts)

**Issue**: Running a seed script with `tsx` fails with `ERR_MODULE_NOT_FOUND` or the script hangs/fails to find the Prisma Client.

**Cause**: Incorrect file path or executing from the root directory. Since the Prisma client and internal dependencies are typically managed within the `server` folder, executing from the root can lead to module resolution issues.

**Solution**: The most reliable way to run seeds is to **move into the server directory** first. This ensures the environment variables and `node_modules` are correctly resolved.

```bash
cd server
DATABASE_URL="..." npx tsx prisma/seed-learn.ts
```

---

## 3. Prisma: `P1012` Validation Error (Prisma v7 Breaking Change)

**Issue**: Running `npx prisma db push` results in error `P1012`: *The datasource property `url` is no longer supported in schema files.*

**Cause**: `npx` defaulted to the latest Prisma version (v7+), which introduced a breaking change requiring database URLs to be moved to a `prisma.config.ts` file.

**Solution**: Force the command to use **Prisma v6**, which is compatible with the current `schema.prisma` configuration:
```bash
npx prisma@6 db push --schema=server/prisma/schema.prisma
```

---

## 4. Prisma: `Environment variable not found: DIRECT_URL`

**Issue**: Prisma validation fails during `db push` because `DIRECT_URL` is missing.

**Cause**: The `schema.prisma` file defines both `url` and `directUrl`. For many cloud PostgreSQL providers (Supabase, Neon), a direct connection is required for migrations/pushes.

**Solution**: Provide both `DATABASE_URL` and `DIRECT_URL` in the command. In most cases, they can point to the same URL if connection pooling is not explicitly used for the push:
---

## 5. Vercel: 404 Not Found on `/api/*` Routes

**Issue**: API requests to `/api/...` return a 404 error on the deployed Vercel site, but work locally.

**Cause**: Vercel treats the project as a static site by default and doesn't know to route `/api` requests to the Hono backend in the `server` directory.

**Solution**: Add a `vercel.json` configuration and an `api/index.ts` bridge file to correctly route requests.

1.  **Modify `server/src/index.ts`** to export the Hono `app`:
    ```typescript
    export const app = new Hono();
    ```
2.  **Create `api/index.ts`** (root folder) to bridge Vercel and Hono:
    ```typescript
    import { handle } from 'hono/vercel';
    import { app } from '../server/src/index';
    export default handle(app);
    ```
3.  **Create `vercel.json`** (root folder) to add rewrites:
    ```json
    {
      "rewrites": [
        { "source": "/api/(.*)", "destination": "/api/index.ts" }
      ]
    }
    ```
