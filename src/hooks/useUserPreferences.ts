import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface UserTopicPreferences {
  favoriteTopics: string[];
  recentlyViewedTopics: string[];
  hiddenTopics: string[];
  topicOrder: string[];
  lastVisit: Date;
}

export interface UserEngagementStats {
  [topicId: string]: {
    viewCount: number;
    lastViewed: Date;
    readingTime: number;
    shareCount: number;
  };
}

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserTopicPreferences>({
    favoriteTopics: [],
    recentlyViewedTopics: [],
    hiddenTopics: [],
    topicOrder: [],
    lastVisit: new Date()
  });
  const [engagementStats, setEngagementStats] = useState<UserEngagementStats>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load preferences from localStorage or Firebase
  useEffect(() => {
    loadUserPreferences();
  }, [user]);

  const loadUserPreferences = async () => {
    setIsLoading(true);
    try {
      if (user) {
        // In a real app, this would load from Firestore
        const savedPrefs = localStorage.getItem(`preferences_${user.uid}`);
        const savedStats = localStorage.getItem(`engagement_${user.uid}`);
        
        if (savedPrefs) {
          const parsed = JSON.parse(savedPrefs);
          parsed.lastVisit = new Date(parsed.lastVisit);
          setPreferences(parsed);
        }
        
        if (savedStats) {
          const parsedStats = JSON.parse(savedStats);
          // Convert date strings back to Date objects
          Object.keys(parsedStats).forEach(topicId => {
            parsedStats[topicId].lastViewed = new Date(parsedStats[topicId].lastViewed);
          });
          setEngagementStats(parsedStats);
        }
      } else {
        // Anonymous user - use localStorage only
        const savedPrefs = localStorage.getItem('anonymous_preferences');
        const savedStats = localStorage.getItem('anonymous_engagement');
        
        if (savedPrefs) {
          const parsed = JSON.parse(savedPrefs);
          parsed.lastVisit = new Date(parsed.lastVisit);
          setPreferences(parsed);
        }
        
        if (savedStats) {
          const parsedStats = JSON.parse(savedStats);
          Object.keys(parsedStats).forEach(topicId => {
            parsedStats[topicId].lastViewed = new Date(parsedStats[topicId].lastViewed);
          });
          setEngagementStats(parsedStats);
        }
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserPreferences = async (newPreferences: UserTopicPreferences) => {
    try {
      const key = user ? `preferences_${user.uid}` : 'anonymous_preferences';
      localStorage.setItem(key, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      
      // In a real app, this would also save to Firestore for authenticated users
      if (user) {
        // await firestore.collection('userPreferences').doc(user.uid).set(newPreferences);
      }
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  };

  const saveEngagementStats = async (newStats: UserEngagementStats) => {
    try {
      const key = user ? `engagement_${user.uid}` : 'anonymous_engagement';
      localStorage.setItem(key, JSON.stringify(newStats));
      setEngagementStats(newStats);
      
      // In a real app, this would also save to Firestore for authenticated users
      if (user) {
        // await firestore.collection('userEngagement').doc(user.uid).set(newStats);
      }
    } catch (error) {
      console.error('Error saving engagement stats:', error);
    }
  };

  const toggleFavoriteTopic = async (topicId: string) => {
    const newFavorites = preferences.favoriteTopics.includes(topicId)
      ? preferences.favoriteTopics.filter(id => id !== topicId)
      : [...preferences.favoriteTopics, topicId];
    
    await saveUserPreferences({
      ...preferences,
      favoriteTopics: newFavorites
    });
  };

  const addRecentlyViewed = async (topicId: string) => {
    const filtered = preferences.recentlyViewedTopics.filter(id => id !== topicId);
    const newRecent = [topicId, ...filtered].slice(0, 10); // Keep last 10
    
    await saveUserPreferences({
      ...preferences,
      recentlyViewedTopics: newRecent
    });
  };

  const recordTopicEngagement = async (topicId: string, action: 'view' | 'share', readingTime: number = 0) => {
    const currentStats = engagementStats[topicId] || {
      viewCount: 0,
      lastViewed: new Date(),
      readingTime: 0,
      shareCount: 0
    };

    const newStats = {
      ...engagementStats,
      [topicId]: {
        ...currentStats,
        viewCount: action === 'view' ? currentStats.viewCount + 1 : currentStats.viewCount,
        shareCount: action === 'share' ? currentStats.shareCount + 1 : currentStats.shareCount,
        lastViewed: new Date(),
        readingTime: currentStats.readingTime + readingTime
      }
    };

    await saveEngagementStats(newStats);
    
    if (action === 'view') {
      await addRecentlyViewed(topicId);
    }
  };

  const getTopicEngagement = (topicId: string) => {
    return engagementStats[topicId] || {
      viewCount: 0,
      lastViewed: new Date(),
      readingTime: 0,
      shareCount: 0
    };
  };

  const isFavorite = (topicId: string) => {
    return preferences.favoriteTopics.includes(topicId);
  };

  const isRecentlyViewed = (topicId: string) => {
    return preferences.recentlyViewedTopics.includes(topicId);
  };

  const getMostEngagedTopics = (limit: number = 5) => {
    return Object.entries(engagementStats)
      .sort(([, a], [, b]) => b.viewCount - a.viewCount)
      .slice(0, limit)
      .map(([topicId]) => topicId);
  };

  return {
    preferences,
    engagementStats,
    isLoading,
    toggleFavoriteTopic,
    addRecentlyViewed,
    recordTopicEngagement,
    getTopicEngagement,
    isFavorite,
    isRecentlyViewed,
    getMostEngagedTopics,
    saveUserPreferences
  };
};