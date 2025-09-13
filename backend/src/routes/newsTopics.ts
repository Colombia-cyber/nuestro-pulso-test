import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/news-topics - Get all news topics with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      featured, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {
      isPublished: true,
    };

    if (category) {
      where.category = category;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [newsTopics, total] = await Promise.all([
      prisma.newsTopic.findMany({
        where,
        include: {
          tags: true,
        },
        orderBy: {
          [sortBy as string]: sortOrder,
        },
        skip,
        take,
      }),
      prisma.newsTopic.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);

    res.json({
      data: newsTopics,
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
    console.error('Error fetching news topics:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news topics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/news-topics/:id - Get single news topic
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const newsTopic = await prisma.newsTopic.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });

    if (!newsTopic) {
      return res.status(404).json({ error: 'News topic not found' });
    }

    // Increment view count
    await prisma.newsTopic.update({
      where: { id },
      data: { viewsCount: { increment: 1 } },
    });

    res.json(newsTopic);
  } catch (error) {
    console.error('Error fetching news topic:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news topic',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/news-topics/featured/latest - Get featured news topics
router.get('/featured/latest', async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const featuredNews = await prisma.newsTopic.findMany({
      where: {
        isPublished: true,
        isFeatured: true,
      },
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: Number(limit),
    });

    res.json(featuredNews);
  } catch (error) {
    console.error('Error fetching featured news:', error);
    res.status(500).json({ 
      error: 'Failed to fetch featured news',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/news-topics/categories - Get all categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await prisma.newsTopic.findMany({
      where: {
        isPublished: true,
        category: { not: null },
      },
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    const categoryList = categories
      .map(item => item.category)
      .filter(Boolean)
      .sort();

    res.json(categoryList);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      error: 'Failed to fetch categories',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/news-topics - Create new news topic (admin only)
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      imageUrl,
      sourceUrl,
      category,
      author,
      publishedAt,
      isFeatured = false,
      tags = [],
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'content']
      });
    }

    const newsTopic = await prisma.newsTopic.create({
      data: {
        title,
        description,
        content,
        imageUrl,
        sourceUrl,
        category,
        author,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        isFeatured,
        tags: {
          create: tags.map((tag: string) => ({ tag })),
        },
      },
      include: {
        tags: true,
      },
    });

    res.status(201).json(newsTopic);
  } catch (error) {
    console.error('Error creating news topic:', error);
    res.status(500).json({ 
      error: 'Failed to create news topic',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT /api/news-topics/:id - Update news topic (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      content,
      imageUrl,
      sourceUrl,
      category,
      author,
      publishedAt,
      isPublished,
      isFeatured,
      tags,
    } = req.body;

    // Check if news topic exists
    const existingTopic = await prisma.newsTopic.findUnique({
      where: { id },
    });

    if (!existingTopic) {
      return res.status(404).json({ error: 'News topic not found' });
    }

    // Update the news topic
    const updatedTopic = await prisma.newsTopic.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(content && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(sourceUrl !== undefined && { sourceUrl }),
        ...(category !== undefined && { category }),
        ...(author !== undefined && { author }),
        ...(publishedAt !== undefined && { publishedAt: publishedAt ? new Date(publishedAt) : null }),
        ...(isPublished !== undefined && { isPublished }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(tags && {
          tags: {
            deleteMany: {},
            create: tags.map((tag: string) => ({ tag })),
          },
        }),
      },
      include: {
        tags: true,
      },
    });

    res.json(updatedTopic);
  } catch (error) {
    console.error('Error updating news topic:', error);
    res.status(500).json({ 
      error: 'Failed to update news topic',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE /api/news-topics/:id - Delete news topic (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingTopic = await prisma.newsTopic.findUnique({
      where: { id },
    });

    if (!existingTopic) {
      return res.status(404).json({ error: 'News topic not found' });
    }

    await prisma.newsTopic.delete({
      where: { id },
    });

    res.json({ message: 'News topic deleted successfully' });
  } catch (error) {
    console.error('Error deleting news topic:', error);
    res.status(500).json({ 
      error: 'Failed to delete news topic',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;