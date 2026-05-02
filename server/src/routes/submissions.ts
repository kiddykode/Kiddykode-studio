import { Hono } from 'hono';
import prisma from '../lib/prisma';
import { type AppVariables, requireAuth } from '../auth/middleware';

const router = new Hono<{ Variables: AppVariables }>();

/**
 * POST /api/submissions
 * Create a new submission for a specific phase.
 * Requires authentication.
 */
router.post('/', requireAuth, async (c) => {
  const user = c.get('user')!; // guaranteed by requireAuth

  const body = await c.req.json();
  const { phaseId, content, fileUrl, videoUrl } = body;

  if (!phaseId) {
    return c.json({ error: 'phaseId is required' }, 400);
  }

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
 * Get details of a specific submission.
 * Only the owner, a Facilitator, or an Admin can view.
 */
router.get('/:id', requireAuth, async (c) => {
  const id = c.req.param('id');
  const user = c.get('user')!;

  const submission = await prisma.submission.findUnique({
    where: { id },
    include: {
      phase: {
        include: { lesson: true },
      },
    },
  });

  if (!submission) return c.json({ error: 'Submission not found' }, 404);

  const canView =
    submission.userId === user.id ||
    user.role === 'FACILITATOR' ||
    user.role === 'ADMIN';

  if (!canView) {
    return c.json({ error: 'Forbidden' }, 403);
  }

  return c.json(submission);
});

export { router as submissionsRouter };
