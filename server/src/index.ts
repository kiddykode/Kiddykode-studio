import { serve } from '@hono/node-server';
import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT) || 3001;

console.log(`Server is running on port ${port}`);

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  serve({
    fetch: app.fetch,
    port,
  });
}
