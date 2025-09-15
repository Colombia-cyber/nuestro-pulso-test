export interface Activity {
  id: string;
  type: 'search' | 'comment' | 'like' | 'view' | 'share';
  userId?: string;
  username: string;
  content: string;
  metadata?: {
    searchQuery?: string;
    articleId?: number;
    articleTitle?: string;
    category?: string;
    source?: string;
  };
  timestamp: string;
  category: string;
}

class ActivityTracker {
  private activities: Activity[] = [];
  private listeners: ((activities: Activity[]) => void)[] = [];

  constructor() {
    // Load activities from localStorage
    this.loadActivities();
  }

  private loadActivities() {
    try {
      const stored = localStorage.getItem('community_activities');
      if (stored) {
        this.activities = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
      this.activities = [];
    }
  }

  private saveActivities() {
    try {
      localStorage.setItem('community_activities', JSON.stringify(this.activities));
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  }

  trackActivity(activity: Omit<Activity, 'id' | 'timestamp'>) {
    const newActivity: Activity = {
      ...activity,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    this.activities.unshift(newActivity);
    
    // Keep only last 1000 activities to prevent storage overflow
    if (this.activities.length > 1000) {
      this.activities = this.activities.slice(0, 1000);
    }

    this.saveActivities();
    this.notifyListeners();
  }

  trackSearch(query: string, resultCount: number, category?: string) {
    this.trackActivity({
      type: 'search',
      username: 'Usuario Actual',
      content: `Buscó "${query}" y encontró ${resultCount} resultados`,
      metadata: {
        searchQuery: query,
        category: category || 'Todas'
      },
      category: 'Búsqueda'
    });
  }

  trackComment(articleTitle: string, commentContent: string, articleId?: number) {
    this.trackActivity({
      type: 'comment',
      username: 'Usuario Actual',
      content: `Comentó: "${commentContent.length > 100 ? commentContent.substring(0, 100) + '...' : commentContent}"`,
      metadata: {
        articleId,
        articleTitle
      },
      category: 'Comentarios'
    });
  }

  trackLike(articleTitle: string, articleId?: number) {
    this.trackActivity({
      type: 'like',
      username: 'Usuario Actual',
      content: `Le gustó el artículo: "${articleTitle}"`,
      metadata: {
        articleId,
        articleTitle
      },
      category: 'Interacciones'
    });
  }

  trackView(articleTitle: string, category: string, articleId?: number) {
    this.trackActivity({
      type: 'view',
      username: 'Usuario Actual',
      content: `Vio el artículo: "${articleTitle}"`,
      metadata: {
        articleId,
        articleTitle,
        category
      },
      category: 'Visualizaciones'
    });
  }

  trackShare(articleTitle: string, platform: string, articleId?: number) {
    this.trackActivity({
      type: 'share',
      username: 'Usuario Actual',
      content: `Compartió "${articleTitle}" en ${platform}`,
      metadata: {
        articleId,
        articleTitle,
        source: platform
      },
      category: 'Compartidos'
    });
  }

  getActivities(filter?: string, limit?: number): Activity[] {
    let filtered = this.activities;
    
    if (filter && filter !== 'all') {
      filtered = this.activities.filter(activity => 
        activity.category.toLowerCase() === filter.toLowerCase() ||
        activity.type === filter
      );
    }

    return limit ? filtered.slice(0, limit) : filtered;
  }

  getActivitiesByTimeRange(hours: number): Activity[] {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.activities.filter(activity => 
      new Date(activity.timestamp) > cutoffTime
    );
  }

  getActivityStats() {
    const totalActivities = this.activities.length;
    const today = this.getActivitiesByTimeRange(24);
    const thisWeek = this.getActivitiesByTimeRange(24 * 7);

    const categoryStats = this.activities.reduce((acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeStats = this.activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: totalActivities,
      today: today.length,
      thisWeek: thisWeek.length,
      categories: categoryStats,
      types: typeStats,
      mostActiveCategory: Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A',
      recentActivity: this.activities.slice(0, 5)
    };
  }

  clearHistory(confirmationCallback?: () => boolean): boolean {
    if (confirmationCallback && !confirmationCallback()) {
      return false;
    }

    this.activities = [];
    this.saveActivities();
    this.notifyListeners();
    return true;
  }

  exportActivities(): string {
    return JSON.stringify({
      exportDate: new Date().toISOString(),
      totalActivities: this.activities.length,
      activities: this.activities
    }, null, 2);
  }

  subscribe(listener: (activities: Activity[]) => void) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.activities));
  }

  // Admin functions
  adminClearActivitiesByCategory(category: string): boolean {
    const initialLength = this.activities.length;
    this.activities = this.activities.filter(activity => activity.category !== category);
    
    if (this.activities.length !== initialLength) {
      this.saveActivities();
      this.notifyListeners();
      return true;
    }
    return false;
  }

  adminClearActivitiesByUser(username: string): boolean {
    const initialLength = this.activities.length;
    this.activities = this.activities.filter(activity => activity.username !== username);
    
    if (this.activities.length !== initialLength) {
      this.saveActivities();
      this.notifyListeners();
      return true;
    }
    return false;
  }
}

// Singleton instance
export const activityTracker = new ActivityTracker();

// Hook for React components
export const useActivityTracker = () => {
  return activityTracker;
};