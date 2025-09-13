import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/users - Get users with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, role, verified } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = { isActive: true };
    if (role) where.role = role;
    if (verified !== undefined) where.verified = verified === 'true';

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
          bio: true,
          location: true,
          verified: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              posts: { where: { isPublic: true } },
              reels: { where: { isPublic: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      data: users,
      pagination: {
        page: Number(page),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;