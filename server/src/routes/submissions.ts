import { Hono } from 'hono';
import prisma from '../lib/prisma';
import { UserRole } from '../auth/middleware';

const router = new Hono();

/**
 * POST /api/submissions
 * Create a new submission for a specific phase
 */
router.post('/', async (c) => {
  const user = (c as any).get('user') as { id: string } | undefined;
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const { phaseId, content, fileUrl, videoUrl } = await c.req.json();

  if (!phaseId) return c.json({ error: 'phaseId is required' }, 400);

  const submission = await prisma.submission.create({
    data: {
      userId: user.id,
      phaseId,
      content,
      fileUrl,
      videoUrl,
    },
  });

  return c.json(submission, 201);
});

/**
 * GET /api/submissions/:id
 * Get details of a specific submission
 */
router.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = (c as any).get('user') as { id: string, role: string } | undefined;

  const submission = await prisma.submission.findUnique({
    where: { id },
    include: {
      phase: {
        include: {
          lesson: true
        }
      }
    }
  });

  if (!submission) return c.json({ error: 'Submission not found' }, 404);

  // Authorization: Only owner or Facilitator/Admin can view
  if (submission.userId !== user?.id && user?.role !== 'FACILITATOR' && user?.role !== 'ADMIN') {
    return c.json({ error: 'Forbidden' }, 403);
  }

  return c.json(submission);
});

export { router as submissionsRouter };
