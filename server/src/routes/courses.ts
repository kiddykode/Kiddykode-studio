import { Hono } from 'hono';
import prisma from '../lib/prisma';
import { requireRole } from '../auth/middleware';
import { UserRole } from '../auth/middleware';

const router = new Hono();

/**
 * GET /api/courses
 * List all courses, filtered by type (STORY, LEARN, etc.)
 */
router.get('/', async (c) => {
  const type = c.req.query('type');
  const user = (c as any).get('user') as { role: UserRole } | undefined;
  
  const courses = await prisma.course.findMany({
    where: {
      type: type as any,
    },
    include: {
      _count: {
        select: { modules: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Filter based on user role (logic for "Explorer: Access to 2 stories only" can be added here)
  return c.json(courses);
});

/**
 * GET /api/courses/:id
 * Get a full course with modules and lessons
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
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!course) return c.json({ error: 'Course not found' }, 404);

  const user = (c as any).get('user') as { role: UserRole } | undefined;
  const isExplorer = user?.role === 'EXPLORER';

  // Apply gating for LEARN courses
  if (course.type === 'LEARN' && isExplorer) {
    course.modules = course.modules.map((mod, index) => ({
      ...mod,
      // Explorer gets only the first 2 modules
      isLocked: index >= 2,
      lessons: mod.lessons.map(lesson => ({
        ...lesson,
        isLocked: index >= 2
      }))
    }));
  }
  
  return c.json(course);
});


export { router as coursesRouter };


