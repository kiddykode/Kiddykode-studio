import { Hono } from 'hono';
import prisma from '../lib/prisma';
import { type AppVariables } from '../auth/middleware';

const router = new Hono<{ Variables: AppVariables }>();

/**
 * GET /api/lessons/:id
 * Get a lesson with all its phases.
 * Only returns the authenticated user's own submissions for each phase.
 */
router.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = c.get('user');

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      phases: {
        orderBy: { order: 'asc' },
        include: {
          submissions: user
            ? { where: { userId: user.id } }
            : false,
        },
      },
    },
  });

  if (!lesson) return c.json({ error: 'Lesson not found' }, 404);

  return c.json(lesson);
});

export { router as lessonsRouter };
