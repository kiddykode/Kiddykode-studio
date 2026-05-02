import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './auth/session';
import { sessionMiddleware, type AppVariables } from './auth/middleware';
import { coursesRouter } from './routes/courses';
import { submissionsRouter } from './routes/submissions';
import { lessonsRouter } from './routes/lessons';

const app = new Hono<{ Variables: AppVariables }>().basePath('/api');

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use('*', logger());

app.use('*', cors({
  origin: (origin) => {
    const allowed = [
      process.env.CLIENT_URL ?? 'http://localhost:5173',
    ];
    // Allow requests with no origin (e.g. server-to-server, curl)
    if (!origin) return origin;
    return allowed.includes(origin) ? origin : null;
  },
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// ─── Better Auth handler ──────────────────────────────────────────────────────
// Handles all /api/auth/* routes (sign-in, sign-up, sign-out, get-session, etc.)

app.on(['GET', 'POST'], '/auth/**', (c) => {
  return auth.handler(c.req.raw);
});

// ─── Session middleware (runs after auth routes) ──────────────────────────────
// Populates c.var.user for all subsequent route handlers

app.use('*', sessionMiddleware);

// ─── Health check ─────────────────────────────────────────────────────────────

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (c) => {
  return c.text('KiddyKode Studio API - Online');
});

// ─── Route modules ────────────────────────────────────────────────────────────

app.route('/courses', coursesRouter);
app.route('/lessons', lessonsRouter);
app.route('/submissions', submissionsRouter);

export default app;
