import { Hono } from 'hono';
import prisma from '../lib/prisma';
import { UserRole } from '../auth/middleware';

const router = new Hono();

/**
 * GET /api/lessons/:id
 * Get a lesson with all its phases (Story, Logic, Build, Improve, Present)
 */
router.get('/:id', async (c) => {
  const id = c.req.param('id');
  
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      phases: {
        orderBy: { order: 'asc' },
        include: {
          submissions: {
            where: {
              userId: ((c as any).get('user') as any)?.id // Only return user's own submissions
            }
          }
        }
      }
    }
  });

  if (!lesson) return c.json({ error: 'Lesson not found' }, 404);
  
  return c.json(lesson);
});

export { router as lessonsRouter };
