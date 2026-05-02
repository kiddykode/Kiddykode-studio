import { Hono } from 'hono';
import prisma from '../lib/prisma';
import { type AppVariables, type UserRole } from '../auth/middleware';

const router = new Hono<{ Variables: AppVariables }>();

/**
 * GET /api/courses
 * List all courses, optionally filtered by type (STORY, LEARN, CHALLENGE, CREATE).
 */
router.get('/', async (c) => {
  const type = c.req.query('type');

  const courses = await prisma.course.findMany({
    where: type ? { type } : undefined,
    include: {
      _count: {
        select: { modules: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return c.json(courses);
});

/**
 * GET /api/courses/:id
 * Get a full course with modules and lessons.
 * Applies content gating for EXPLORER-tier users on LEARN courses.
 */
router.get('/:id', async (c) => {
  const id = c.req.param('id');

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  });

  if (!course) return c.json({ error: 'Course not found' }, 404);

  const user = c.get('user');
  const isExplorer = !user || user.role === 'EXPLORER';

  // Explorers only get the first 2 modules of LEARN courses
  if (course.type === 'LEARN' && isExplorer) {
    const gated = {
      ...course,
      modules: course.modules.map((mod, index) => ({
        ...mod,
        isLocked: index >= 2,
        lessons: mod.lessons.map((lesson) => ({
          ...lesson,
          isLocked: index >= 2,
        })),
      })),
    };
    return c.json(gated);
  }

  return c.json(course);
});

export { router as coursesRouter };
