import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import * as dotenv from 'dotenv';

import { coursesRouter } from './routes/courses';
import { submissionsRouter } from './routes/submissions';

dotenv.config();

export const app = new Hono();

// Middleware
app.use('*', logger());
app.use('/api/*', cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.get('/', (c) => {
  return c.text('KiddyKode Studio API - Online');
});

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.route('/api/courses', coursesRouter);
app.route('/api/submissions', submissionsRouter);

// Port
const port = Number(process.env.PORT) || 3001;
console.log(`Server is running on port ${port}`);

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  serve({
    fetch: app.fetch,
    port,
  });
}
