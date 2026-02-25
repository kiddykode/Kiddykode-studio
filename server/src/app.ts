import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { coursesRouter } from './routes/courses';
import { submissionsRouter } from './routes/submissions';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: (origin) => origin, // Allow all origins for the API to avoid CORS issues during debug
  credentials: true,
}));

// Health Check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root path for the API base
app.get('/api', (c) => {
  return c.text('KiddyKode Studio API - Online');
});

// Route Modules
app.route('/api/courses', coursesRouter);
app.route('/api/submissions', submissionsRouter);

export default app;
