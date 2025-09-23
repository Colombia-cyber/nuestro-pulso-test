// AI Personalization Engine for Adaptive Feeds
export interface UserPreference {
  topicId: string;
  weight: number;
  lastInteraction: Date;
  interactionType: 'view' | 'like' | 'share' | 'comment' | 'debate';
}

export interface AIRecommendation {
  contentId: string;
  topicId: string;
  relevanceScore: number;
  reasoning: string;
  confidence: number;
}

export interface ContentMetrics {
  id: string;
  views: number;
  engagement: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  viralityScore: number;
  readingTime: number;
}

class AIPersonalizationEngine {
  private preferences: Map<string, UserPreference[]> = new Map();
  private contentMetrics: Map<string, ContentMetrics> = new Map();
  private learningRate = 0.1;

  // Track user interaction for machine learning
  trackInteraction(userId: string, topicId: string, interactionType: UserPreference['interactionType']) {
    const userPrefs = this.preferences.get(userId) || [];
    const existingPref = userPrefs.find(p => p.topicId === topicId);

    if (existingPref) {
      // Update existing preference with decay and boost
      existingPref.weight = Math.min(1.0, existingPref.weight + this.learningRate);
      existingPref.lastInteraction = new Date();
      existingPref.interactionType = interactionType;
    } else {
      // Add new preference
      userPrefs.push({
        topicId,
        weight: this.learningRate,
        lastInteraction: new Date(),
        interactionType
      });
    }

    this.preferences.set(userId, userPrefs);
    this.applyDecay(userId);
  }

  // Apply time-based decay to preferences
  private applyDecay(userId: string) {
    const userPrefs = this.preferences.get(userId) || [];
    const now = new Date().getTime();
    const decayFactor = 0.95;
    const dayMs = 24 * 60 * 60 * 1000;

    userPrefs.forEach(pref => {
      const daysSinceInteraction = (now - pref.lastInteraction.getTime()) / dayMs;
      pref.weight *= Math.pow(decayFactor, daysSinceInteraction);
    });

    // Remove very low weight preferences
    const filteredPrefs = userPrefs.filter(p => p.weight > 0.01);
    this.preferences.set(userId, filteredPrefs);
  }

  // Generate personalized content recommendations
  generateRecommendations(userId: string, availableContent: string[]): AIRecommendation[] {
    const userPrefs = this.preferences.get(userId) || [];
    
    return availableContent.map(contentId => {
      const metrics = this.contentMetrics.get(contentId);
      const topicId = this.extractTopicFromContent(contentId);
      const userPref = userPrefs.find(p => p.topicId === topicId);

      // Calculate relevance score using multiple factors
      let relevanceScore = 0.3; // Base score
      
      // User preference factor
      if (userPref) {
        relevanceScore += userPref.weight * 0.4;
      }

      // Content quality factor
      if (metrics) {
        relevanceScore += (metrics.engagement / 1000) * 0.2;
        relevanceScore += (metrics.viralityScore / 100) * 0.1;
      }

      // Randomization factor for discovery
      relevanceScore += Math.random() * 0.1;

      return {
        contentId,
        topicId,
        relevanceScore: Math.min(1.0, relevanceScore),
        reasoning: this.generateReasoning(userPref, metrics),
        confidence: userPref ? userPref.weight : 0.3
      };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private extractTopicFromContent(contentId: string): string {
    // Extract topic from content ID or metadata
    // This is a simplified version - in real implementation would use ML
    if (contentId.includes('petro')) return 'gustavo-petro';
    if (contentId.includes('congress')) return 'congress';
    if (contentId.includes('crime')) return 'drugs-crime';
    if (contentId.includes('left')) return 'political-left';
    if (contentId.includes('right')) return 'political-right';
    if (contentId.includes('trump')) return 'trump-local';
    return 'colombia-news';
  }

  private generateReasoning(userPref?: UserPreference, metrics?: ContentMetrics): string {
    const reasons = [];
    
    if (userPref) {
      reasons.push(`Basado en tu interés en ${userPref.topicId} (${Math.round(userPref.weight * 100)}%)`);
    }
    
    if (metrics) {
      if (metrics.viralityScore > 80) {
        reasons.push('Contenido trending');
      }
      if (metrics.engagement > 500) {
        reasons.push('Alta participación ciudadana');
      }
    }

    return reasons.length > 0 ? reasons.join(', ') : 'Descubrimiento de nuevo contenido';
  }

  // Update content metrics for recommendation algorithm
  updateContentMetrics(contentId: string, metrics: Partial<ContentMetrics>) {
    const existing = this.contentMetrics.get(contentId) || {
      id: contentId,
      views: 0,
      engagement: 0,
      sentiment: 'neutral' as const,
      viralityScore: 0,
      readingTime: 0
    };

    this.contentMetrics.set(contentId, { ...existing, ...metrics });
  }

  // Get user preference insights for dashboard
  getUserInsights(userId: string) {
    const userPrefs = this.preferences.get(userId) || [];
    
    return {
      topInterests: userPrefs
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 5)
        .map(p => ({ topic: p.topicId, strength: p.weight })),
      totalInteractions: userPrefs.length,
      lastActivity: userPrefs.reduce((latest, pref) => 
        pref.lastInteraction > latest ? pref.lastInteraction : latest, 
        new Date(0)
      )
    };
  }

  // Simulate AI learning from global patterns
  simulateGlobalLearning() {
    // Simulate trending topics based on current time
    const hour = new Date().getHours();
    const trendingTopics = [
      'colombia-news',
      'gustavo-petro',
      'congress',
      hour > 18 ? 'political-left' : 'political-right',
      'drugs-crime'
    ];

    // Boost trending content metrics
    trendingTopics.forEach((topic, index) => {
      const boost = (5 - index) * 20;
      this.contentMetrics.forEach((metrics, contentId) => {
        if (this.extractTopicFromContent(contentId) === topic) {
          metrics.viralityScore = Math.min(100, metrics.viralityScore + boost);
          metrics.engagement += boost * 5;
        }
      });
    });
  }
}

// Singleton instance
export const aiPersonalization = new AIPersonalizationEngine();

// React hook for using AI personalization
export const useAIPersonalization = (userId: string) => {
  const trackInteraction = (topicId: string, interactionType: UserPreference['interactionType']) => {
    aiPersonalization.trackInteraction(userId, topicId, interactionType);
  };

  const getRecommendations = (availableContent: string[]) => {
    return aiPersonalization.generateRecommendations(userId, availableContent);
  };

  const getUserInsights = () => {
    return aiPersonalization.getUserInsights(userId);
  };

  return {
    trackInteraction,
    getRecommendations,
    getUserInsights
  };
};