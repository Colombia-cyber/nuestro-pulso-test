import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/pulse-feed - Get unified pulse feed (posts, news, reels, etc.)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      userId,
      category,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Get posts
    const posts = await prisma.post.findMany({
      where: {
        isPublic: true,
        ...(category && { 
          category: { 
            name: { contains: category as string, mode: 'insensitive' } 
          } 
        }),
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
        comments: {
          take: 3,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true,
              },
            },
          },
        },
        tags: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        [sortBy as string]: sortOrder,
      },
      skip,
      take: Math.floor(take * 0.6), // 60% posts
    });

    // Get recent news topics
    const newsTopics = await prisma.newsTopic.findMany({
      where: {
        isPublished: true,
        ...(category && { 
          category: { contains: category as string, mode: 'insensitive' } 
        }),
      },
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: Math.floor(take * 0.3), // 30% news
    });

    // Get recent reels
    const reels = await prisma.reel.findMany({
      where: {
        isPublic: true,
        ...(category && { 
          category: { 
            name: { contains: category as string, mode: 'insensitive' } 
          } 
        }),
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
      orderBy: {
        createdAt: 'desc',
      },
      take: Math.floor(take * 0.1), // 10% reels
    });

    // Combine and format feed items
    const feedItems: any[] = [];

    // Add posts
    posts.forEach(post => {
      feedItems.push({
        id: post.id,
        type: 'post',
        content: post.content,
        imageUrl: post.imageUrl,
        author: post.author,
        category: post.category,
        tags: post.tags.map(t => t.tag),
        likesCount: post.likesCount,
        sharesCount: post.sharesCount,
        commentsCount: post._count.comments,
        comments: post.comments,
        isPinned: post.isPinned,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      });
    });

    // Add news topics
    newsTopics.forEach(news => {
      feedItems.push({
        id: news.id,
        type: 'news',
        title: news.title,
        description: news.description,
        content: news.content,
        imageUrl: news.imageUrl,
        sourceUrl: news.sourceUrl,
        category: news.category,
        author: news.author,
        tags: news.tags.map(t => t.tag),
        viewsCount: news.viewsCount,
        isFeatured: news.isFeatured,
        publishedAt: news.publishedAt,
        createdAt: news.createdAt,
      });
    });

    // Add reels
    reels.forEach(reel => {
      feedItems.push({
        id: reel.id,
        type: 'reel',
        title: reel.title,
        description: reel.description,
        videoUrl: reel.videoUrl,
        thumbnailUrl: reel.thumbnailUrl,
        duration: reel.duration,
        author: reel.author,
        category: reel.category,
        tags: reel.tags.map(t => t.tag),
        viewsCount: reel.viewsCount,
        likesCount: reel.likesCount,
        sharesCount: reel.sharesCount,
        createdAt: reel.createdAt,
      });
    });

    // Sort combined feed by creation date
    feedItems.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    res.json({
      data: feedItems,
      pagination: {
        page: Number(page),
        limit: take,
        total: feedItems.length,
        hasNextPage: feedItems.length === take,
        hasPrevPage: Number(page) > 1,
      },
      stats: {
        postsCount: posts.length,
        newsCount: newsTopics.length,
        reelsCount: reels.length,
      },
    });
  } catch (error) {
    console.error('Error fetching pulse feed:', error);
    res.status(500).json({ 
      error: 'Failed to fetch pulse feed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/pulse-feed/trending - Get trending content
router.get('/trending', async (req, res) => {
  try {
    const { limit = 10, timeframe = '7d' } = req.query;

    const daysBack = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : 30;
    const since = new Date();
    since.setDate(since.getDate() - daysBack);

    // Get trending posts (by engagement)
    const trendingPosts = await prisma.post.findMany({
      where: {
        isPublic: true,
        createdAt: { gte: since },
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
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: [
        { likesCount: 'desc' },
        { sharesCount: 'desc' },
        { createdAt: 'desc' },
      ],
      take: Math.floor(Number(limit) * 0.6),
    });

    // Get trending news (by views)
    const trendingNews = await prisma.newsTopic.findMany({
      where: {
        isPublished: true,
        createdAt: { gte: since },
      },
      include: {
        tags: true,
      },
      orderBy: [
        { viewsCount: 'desc' },
        { createdAt: 'desc' },
      ],
      take: Math.floor(Number(limit) * 0.4),
    });

    // Format trending items
    const trendingItems: any[] = [];

    trendingPosts.forEach(post => {
      trendingItems.push({
        id: post.id,
        type: 'post',
        content: post.content,
        imageUrl: post.imageUrl,
        author: post.author,
        category: post.category,
        likesCount: post.likesCount,
        sharesCount: post.sharesCount,
        commentsCount: post._count.comments,
        engagement: post.likesCount + post.sharesCount + post._count.comments,
        createdAt: post.createdAt,
      });
    });

    trendingNews.forEach(news => {
      trendingItems.push({
        id: news.id,
        type: 'news',
        title: news.title,
        description: news.description,
        imageUrl: news.imageUrl,
        category: news.category,
        viewsCount: news.viewsCount,
        isFeatured: news.isFeatured,
        engagement: news.viewsCount,
        createdAt: news.createdAt,
      });
    });

    // Sort by engagement
    trendingItems.sort((a, b) => b.engagement - a.engagement);

    res.json({
      data: trendingItems.slice(0, Number(limit)),
      timeframe,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching trending content:', error);
    res.status(500).json({ 
      error: 'Failed to fetch trending content',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/pulse-feed/categories - Get content categories
router.get('/categories', async (req, res) => {
  try {
    const [postCategories, newsCategories, reelCategories] = await Promise.all([
      prisma.postCategory.findMany({
        include: {
          _count: {
            select: {
              posts: {
                where: { isPublic: true },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.newsTopic.findMany({
        where: {
          isPublished: true,
          category: { not: null },
        },
        select: { category: true },
        distinct: ['category'],
      }),
      prisma.reelCategory.findMany({
        include: {
          _count: {
            select: {
              reels: {
                where: { isPublic: true },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
    ]);

    res.json({
      postCategories: postCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        color: cat.color,
        icon: cat.icon,
        postsCount: cat._count.posts,
      })),
      newsCategories: newsCategories
        .map(item => item.category)
        .filter(Boolean)
        .sort(),
      reelCategories: reelCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        color: cat.color,
        icon: cat.icon,
        reelsCount: cat._count.reels,
      })),
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      error: 'Failed to fetch categories',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;