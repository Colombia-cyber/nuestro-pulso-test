import { activityTracker } from './ActivityTracker';

export interface ArticleComment {
  id: string;
  articleId?: string;
  articleTitle: string;
  articleUrl?: string;
  content: string;
  author: string;
  timestamp: string;
  category: string;
  source: 'internal' | 'google_search' | 'manual';
  metadata?: {
    searchQuery?: string;
    originalSource?: string;
    topic?: string;
  };
}

class CommentService {
  private comments: ArticleComment[] = [];
  private listeners: ((comments: ArticleComment[]) => void)[] = [];

  constructor() {
    this.loadComments();
  }

  private loadComments() {
    try {
      const stored = localStorage.getItem('article_comments');
      if (stored) {
        this.comments = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      this.comments = [];
    }
  }

  private saveComments() {
    try {
      localStorage.setItem('article_comments', JSON.stringify(this.comments));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  }

  // Add a comment and automatically post to Community Hub
  addComment(comment: Omit<ArticleComment, 'id' | 'timestamp'>): ArticleComment {
    const newComment: ArticleComment = {
      ...comment,
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    this.comments.unshift(newComment);
    
    // Keep only last 500 comments to prevent storage overflow
    if (this.comments.length > 500) {
      this.comments = this.comments.slice(0, 500);
    }

    this.saveComments();
    this.notifyListeners();

    // Automatically post to Community Hub with categorization
    this.postToCommunityHub(newComment);

    return newComment;
  }

  // Post comment to Community Hub with proper categorization
  private postToCommunityHub(comment: ArticleComment) {
    try {
      // Determine category based on article content and comment
      const hubCategory = this.categorizeComment(comment);
      
      // Track the comment activity in Community Hub
      activityTracker.trackComment(
        comment.articleTitle,
        comment.content,
        comment.articleId ? parseInt(comment.articleId) : undefined
      );

      // Also create a specific activity for community interaction
      activityTracker.trackActivity({
        type: 'comment',
        username: comment.author,
        content: `Comentó en "${comment.articleTitle}": "${comment.content.length > 80 ? comment.content.substring(0, 80) + '...' : comment.content}"`,
        metadata: {
          articleTitle: comment.articleTitle,
          articleId: comment.articleId ? parseInt(comment.articleId) : undefined,
          category: hubCategory,
          source: comment.source,
          searchQuery: comment.metadata?.searchQuery
        },
        category: 'Comentarios de Artículos'
      });

      console.log(`Comment posted to Community Hub in category: ${hubCategory}`);
    } catch (error) {
      console.error('Error posting comment to Community Hub:', error);
    }
  }

  // Categorize comment based on content and article
  private categorizeComment(comment: ArticleComment): string {
    const content = (comment.articleTitle + ' ' + comment.content).toLowerCase();
    
    // Political keywords
    if (content.includes('petro') || content.includes('presidente') || content.includes('gobierno') || 
        content.includes('política') || content.includes('congreso') || content.includes('senado') ||
        content.includes('elecciones') || content.includes('votación')) {
      return 'Política';
    }
    
    // International keywords
    if (content.includes('trump') || content.includes('internacional') || content.includes('eeuu') ||
        content.includes('exterior') || content.includes('embajada') || content.includes('tratado')) {
      return 'Internacional';
    }
    
    // Social keywords
    if (content.includes('social') || content.includes('comunidad') || content.includes('ciudadano') ||
        content.includes('participación') || content.includes('derechos')) {
      return 'Social';
    }
    
    // Security keywords
    if (content.includes('seguridad') || content.includes('terrorismo') || content.includes('amenaza') ||
        content.includes('militar') || content.includes('policía') || content.includes('frontera')) {
      return 'Seguridad';
    }
    
    // Environment keywords
    if (content.includes('ambiente') || content.includes('clima') || content.includes('sostenible') ||
        content.includes('ecología') || content.includes('contaminación')) {
      return 'Ambiente';
    }
    
    // Technology keywords
    if (content.includes('tecnología') || content.includes('digital') || content.includes('internet') ||
        content.includes('innovación') || content.includes('5g')) {
      return 'Tecnología';
    }
    
    // Default category based on comment source
    if (comment.source === 'google_search') {
      return 'Búsquedas Comentadas';
    }
    
    return comment.category || 'General';
  }

  // Get comments for a specific article
  getCommentsForArticle(articleId?: string, articleTitle?: string): ArticleComment[] {
    return this.comments.filter(comment => {
      if (articleId && comment.articleId) {
        return comment.articleId === articleId;
      }
      if (articleTitle) {
        return comment.articleTitle === articleTitle;
      }
      return false;
    });
  }

  // Get all comments
  getAllComments(): ArticleComment[] {
    return this.comments;
  }

  // Get comments by category
  getCommentsByCategory(category: string): ArticleComment[] {
    return this.comments.filter(comment => comment.category === category);
  }

  // Subscribe to comment updates
  subscribe(listener: (comments: ArticleComment[]) => void) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.comments));
  }

  // Helper method to add comment from search results
  addCommentFromSearchResult(
    articleTitle: string,
    articleUrl: string,
    commentContent: string,
    author: string = 'Usuario Actual',
    searchQuery?: string,
    category: string = 'General'
  ): ArticleComment {
    return this.addComment({
      articleTitle,
      articleUrl,
      content: commentContent,
      author,
      category,
      source: 'google_search',
      metadata: {
        searchQuery,
        originalSource: 'Google Search',
        topic: category
      }
    });
  }

  // Clear comments (admin function)
  clearComments(): void {
    this.comments = [];
    this.saveComments();
    this.notifyListeners();
  }
}

// Singleton instance
export const commentService = new CommentService();

// Hook for React components
export const useCommentService = () => {
  return commentService;
};