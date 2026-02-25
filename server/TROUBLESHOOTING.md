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

1.  **Refactor for Deployment Isolation**: Split the app definition from the server entry point.
2.  **Create `server/src/app.ts`**:
    ```typescript
    const app = new Hono().basePath('/api');
    app.route('/courses', coursesRouter);
    export default app;
    ```
3.  **Modify `api/index.ts`** to use the isolated app:
    ```typescript
    import { handle } from 'hono/vercel';
    import app from '../server/src/app';
    export default handle(app);
    ```
4.  **Create `vercel.json`** to rewrite all requests:
    ```json
    { "rewrites": [{ "source": "/api/(.*)", "destination": "/api/index.ts" }] }
    ```

---

## 6. Vercel: Edge Function referencing unsupported modules (`dotenv`, `fs`, etc.)

**Issue**: Deployment fails with an error stating the Edge Function references unsupported modules like `dotenv` or `fs`.

**Cause**: The API bridge in `api/index.ts` was configured to use the `edge` runtime, which does not support Node.js built-ins or certain third-party modules that rely on them.

**Solution**: Switch the Vercel Function to the standard Node.js runtime.

1.  **Modify `api/index.ts`** to remove the Edge runtime configuration:
    ```typescript
    // REMOVE THIS:
    // export const config = { runtime: 'edge' };
    ```
2.  **Ensure the Hono app is exported** and handled correctly for Node.js (this is the default behavior if the edge config is removed).

---

## 7. Frontend: API Requests return 404 despite correct backend routing

**Issue**: Frontend fetch calls to `/api/...` fail with 404 in production, even though the same routes work locally and the backend is correctly configured on Vercel.

**Cause**: Inconsistent or incorrect API URL construction in the frontend. Using `window.location.origin` with a manually concatenated path or missing environment variables can lead to routing mismatches or hardcoded local URLs being called in production.

**Solution**: Centralize API URL construction using a robust utility that handles environment variables and trailing slashes.

1.  **Create a utility** (e.g., `src/lib/api.ts`):
    ```typescript
    export const getApiUrl = (path: string): string => {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      if (!baseUrl) return `/${cleanPath}`;
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      return `${cleanBaseUrl}/${cleanPath}`;
    };
    ```
2.  **Refactor all fetch calls** to use this utility, ensuring consistency across all pages.
