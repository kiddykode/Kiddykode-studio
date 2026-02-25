import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { coursesRouter } from './routes/courses';
import { submissionsRouter } from './routes/submissions';

const app = new Hono().basePath('/api');

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Health Check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root path for the API base
app.get('/', (c) => {
  return c.text('KiddyKode Studio API - Online');
});

// Route Modules
app.route('/courses', coursesRouter);
app.route('/submissions', submissionsRouter);

export default app;
