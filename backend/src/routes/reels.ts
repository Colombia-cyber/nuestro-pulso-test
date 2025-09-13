import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/reels - Get all reels with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      userId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {
      isPublic: true,
    };

    if (category) {
      where.category = {
        name: { contains: category as string, mode: 'insensitive' }
      };
    }

    if (userId) {
      where.authorId = userId;
    }

    const [reels, total] = await Promise.all([
      prisma.reel.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
              verified: true,
            },
          },
          category: true,
          tags: true,
        },
        orderBy: {
          [sortBy as string]: sortOrder,
        },
        skip,
        take,
      }),
      prisma.reel.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);

    res.json({
      data: reels,
      pagination: {
        page: Number(page),
        limit: take,
        total,
        totalPages,
        hasNextPage: Number(page) < totalPages,
        hasPrevPage: Number(page) > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching reels:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reels',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/reels - Create new reel
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
      authorId,
      categoryId,
      tags = [],
      isPublic = true,
    } = req.body;

    if (!title || !videoUrl || !authorId || !duration) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'videoUrl', 'authorId', 'duration']
      });
    }

    const reel = await prisma.reel.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration: Number(duration),
        authorId,
        categoryId,
        isPublic,
        tags: {
          create: tags.map((tag: string) => ({ tag })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true,
          },
        },
        category: true,
        tags: true,
      },
    });

    res.status(201).json(reel);
  } catch (error) {
    console.error('Error creating reel:', error);
    res.status(500).json({ 
      error: 'Failed to create reel',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;