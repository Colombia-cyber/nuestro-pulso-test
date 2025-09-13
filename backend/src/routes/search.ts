import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/search - Universal search endpoint
router.get('/', async (req, res) => {
  try {
    const { 
      q: query,
      type = 'all',
      page = 1,
      limit = 10
    } = req.query;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Query parameter is required and must be a non-empty string' 
      });
    }

    const searchQuery = query.trim();
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const results: any = {
      query: searchQuery,
      type,
      total: 0,
      data: [],
    };

    // Search in posts
    if (type === 'all' || type === 'posts') {
      const posts = await prisma.post.findMany({
        where: {
          isPublic: true,
          OR: [
            { content: { contains: searchQuery, mode: 'insensitive' } },
          ],
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
            select: { comments: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: type === 'posts' ? skip : 0,
        take: type === 'posts' ? take : Math.floor(take / 4),
      });

      results.data.push(...posts.map(post => ({
        id: post.id,
        type: 'post',
        title: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''),
        content: post.content,
        imageUrl: post.imageUrl,
        author: post.author,
        category: post.category,
        likesCount: post.likesCount,
        commentsCount: post._count.comments,
        createdAt: post.createdAt,
        url: `/posts/${post.id}`,
      })));
    }

    // Search in news topics
    if (type === 'all' || type === 'news') {
      const newsTopics = await prisma.newsTopic.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
            { content: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
        include: {
          tags: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: type === 'news' ? skip : 0,
        take: type === 'news' ? take : Math.floor(take / 4),
      });

      results.data.push(...newsTopics.map(news => ({
        id: news.id,
        type: 'news',
        title: news.title,
        description: news.description,
        content: news.content,
        imageUrl: news.imageUrl,
        category: news.category,
        author: news.author,
        viewsCount: news.viewsCount,
        isFeatured: news.isFeatured,
        tags: news.tags.map(t => t.tag),
        createdAt: news.createdAt,
        url: `/news/${news.id}`,
      })));
    }

    // Search in reels
    if (type === 'all' || type === 'reels') {
      const reels = await prisma.reel.findMany({
        where: {
          isPublic: true,
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
          ],
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
        },
        orderBy: { createdAt: 'desc' },
        skip: type === 'reels' ? skip : 0,
        take: type === 'reels' ? take : Math.floor(take / 4),
      });

      results.data.push(...reels.map(reel => ({
        id: reel.id,
        type: 'reel',
        title: reel.title,
        description: reel.description,
        videoUrl: reel.videoUrl,
        thumbnailUrl: reel.thumbnailUrl,
        duration: reel.duration,
        author: reel.author,
        category: reel.category,
        viewsCount: reel.viewsCount,
        likesCount: reel.likesCount,
        createdAt: reel.createdAt,
        url: `/reels/${reel.id}`,
      })));
    }

    // Search in users
    if (type === 'all' || type === 'users') {
      const users = await prisma.user.findMany({
        where: {
          isActive: true,
          OR: [
            { username: { contains: searchQuery, mode: 'insensitive' } },
            { displayName: { contains: searchQuery, mode: 'insensitive' } },
            { bio: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
          bio: true,
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
        skip: type === 'users' ? skip : 0,
        take: type === 'users' ? take : Math.floor(take / 4),
      });

      results.data.push(...users.map(user => ({
        id: user.id,
        type: 'user',
        title: user.displayName || user.username,
        description: user.bio,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        verified: user.verified,
        role: user.role,
        postsCount: user._count.posts,
        reelsCount: user._count.reels,
        createdAt: user.createdAt,
        url: `/users/${user.username}`,
      })));
    }

    // Sort results by relevance (simple scoring based on exact matches and recency)
    results.data.sort((a: any, b: any) => {
      const aScore = calculateRelevanceScore(a, searchQuery);
      const bScore = calculateRelevanceScore(b, searchQuery);
      
      if (aScore === bScore) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      return bScore - aScore;
    });

    results.total = results.data.length;

    // Apply pagination for 'all' type
    if (type === 'all') {
      results.data = results.data.slice(skip, skip + take);
    }

    res.json({
      ...results,
      pagination: {
        page: Number(page),
        limit: take,
        total: results.total,
        hasNextPage: results.data.length === take,
        hasPrevPage: Number(page) > 1,
      },
    });
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ 
      error: 'Failed to perform search',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Simple relevance scoring function
function calculateRelevanceScore(item: any, query: string): number {
  let score = 0;
  const lowerQuery = query.toLowerCase();
  
  // Exact title match gets highest score
  if (item.title && item.title.toLowerCase().includes(lowerQuery)) {
    score += 10;
  }
  
  // Description match
  if (item.description && item.description.toLowerCase().includes(lowerQuery)) {
    score += 5;
  }
  
  // Content match
  if (item.content && item.content.toLowerCase().includes(lowerQuery)) {
    score += 3;
  }
  
  // Username match for users
  if (item.username && item.username.toLowerCase().includes(lowerQuery)) {
    score += 8;
  }
  
  // Boost for verified users/featured content
  if (item.verified || item.isFeatured) {
    score += 2;
  }
  
  // Boost based on engagement
  if (item.likesCount) score += Math.min(item.likesCount / 10, 5);
  if (item.viewsCount) score += Math.min(item.viewsCount / 100, 3);
  if (item.commentsCount) score += Math.min(item.commentsCount / 5, 3);
  
  return score;
}

// GET /api/search/suggestions - Get search suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const { q: query } = req.query;

    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return res.json({ suggestions: [] });
    }

    const searchQuery = query.trim();

    const [userSuggestions, tagSuggestions, categorySuggestions] = await Promise.all([
      // User suggestions
      prisma.user.findMany({
        where: {
          isActive: true,
          OR: [
            { username: { contains: searchQuery, mode: 'insensitive' } },
            { displayName: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
        select: {
          username: true,
          displayName: true,
          avatar: true,
          verified: true,
        },
        take: 5,
      }),
      
      // Tag suggestions (from posts and news)
      prisma.postTag.findMany({
        where: {
          tag: { contains: searchQuery, mode: 'insensitive' },
        },
        select: { tag: true },
        distinct: ['tag'],
        take: 5,
      }),
      
      // Category suggestions
      prisma.postCategory.findMany({
        where: {
          name: { contains: searchQuery, mode: 'insensitive' },
        },
        select: {
          name: true,
          icon: true,
        },
        take: 5,
      }),
    ]);

    const suggestions = [
      ...userSuggestions.map(user => ({
        type: 'user',
        value: user.displayName || user.username,
        username: user.username,
        avatar: user.avatar,
        verified: user.verified,
      })),
      ...tagSuggestions.map(tag => ({
        type: 'tag',
        value: tag.tag,
      })),
      ...categorySuggestions.map(cat => ({
        type: 'category',
        value: cat.name,
        icon: cat.icon,
      })),
    ];

    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch search suggestions',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;