import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Topic {
  id: string;
  name: string;
  emoji: string;
  color: string;
  isActive: boolean;
  articleCount: number;
  isLive: boolean;
  trending: boolean;
  lastUpdated: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    topics: string[];
    notifications: boolean;
    darkMode: boolean;
    language: 'es' | 'en';
  };
  isAuthenticated: boolean;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}

interface LiveStats {
  onlineUsers: number;
  activePolls: number;
  newsUpdates: number;
  discussions: number;
  lastUpdated: Date;
}

interface AppState {
  // UI State
  currentView: string;
  currentTopic: string;
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;
  sidebarOpen: boolean;
  
  // User State
  user: User | null;
  
  // Data State
  topics: Topic[];
  selectedTopics: string[];
  notifications: Notification[];
  liveStats: LiveStats;
  
  // Real-time State
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  
  // Actions
  setCurrentView: (view: string) => void;
  setCurrentTopic: (topic: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  
  // User Actions
  setUser: (user: User | null) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  
  // Topic Actions
  setTopics: (topics: Topic[]) => void;
  updateTopic: (topicId: string, updates: Partial<Topic>) => void;
  toggleTopicSelection: (topicId: string) => void;
  clearSelectedTopics: () => void;
  
  // Notification Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Live Stats Actions
  updateLiveStats: (stats: Partial<LiveStats>) => void;
  
  // Connection Actions
  setConnectionStatus: (status: AppState['connectionStatus']) => void;
  setConnected: (connected: boolean) => void;
}

const initialLiveStats: LiveStats = {
  onlineUsers: 2847,
  activePolls: 12,
  newsUpdates: 47,
  discussions: 156,
  lastUpdated: new Date()
};

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        currentView: 'home',
        currentTopic: 'colombia-news',
        isLoading: false,
        error: null,
        darkMode: false,
        sidebarOpen: false,
        
        user: null,
        topics: [],
        selectedTopics: [],
        notifications: [],
        liveStats: initialLiveStats,
        
        isConnected: false,
        connectionStatus: 'disconnected',
        
        // UI Actions
        setCurrentView: (view) => set({ currentView: view, error: null }),
        setCurrentTopic: (topic) => set({ currentTopic: topic }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        toggleDarkMode: () => set((state) => ({ 
          darkMode: !state.darkMode,
          user: state.user ? {
            ...state.user,
            preferences: {
              ...state.user.preferences,
              darkMode: !state.darkMode
            }
          } : null
        })),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
        // User Actions
        setUser: (user) => set({ user }),
        updateUserPreferences: (preferences) => set((state) => ({
          user: state.user ? {
            ...state.user,
            preferences: { ...state.user.preferences, ...preferences }
          } : null
        })),
        
        // Topic Actions
        setTopics: (topics) => set({ topics }),
        updateTopic: (topicId, updates) => set((state) => ({
          topics: state.topics.map(topic =>
            topic.id === topicId
              ? { ...topic, ...updates, lastUpdated: new Date() }
              : topic
          )
        })),
        toggleTopicSelection: (topicId) => set((state) => ({
          selectedTopics: state.selectedTopics.includes(topicId)
            ? state.selectedTopics.filter(id => id !== topicId)
            : [...state.selectedTopics, topicId]
        })),
        clearSelectedTopics: () => set({ selectedTopics: [] }),
        
        // Notification Actions
        addNotification: (notification) => set((state) => ({
          notifications: [
            {
              ...notification,
              id: `notification-${Date.now()}-${Math.random()}`,
              timestamp: new Date(),
              read: false
            },
            ...state.notifications
          ].slice(0, 50) // Keep only last 50 notifications
        })),
        markNotificationRead: (id) => set((state) => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          )
        })),
        clearNotifications: () => set({ notifications: [] }),
        
        // Live Stats Actions
        updateLiveStats: (stats) => set((state) => ({
          liveStats: {
            ...state.liveStats,
            ...stats,
            lastUpdated: new Date()
          }
        })),
        
        // Connection Actions
        setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
        setConnected: (connected) => set({ 
          isConnected: connected,
          connectionStatus: connected ? 'connected' : 'disconnected'
        })
      }),
      {
        name: 'nuestro-pulso-storage',
        partialize: (state) => ({
          darkMode: state.darkMode,
          user: state.user,
          selectedTopics: state.selectedTopics,
          currentTopic: state.currentTopic
        })
      }
    ),
    { name: 'AppStore' }
  )
);

export default useAppStore;
export type { AppState, Topic, User, Notification, LiveStats };