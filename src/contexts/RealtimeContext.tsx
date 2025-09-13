import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase.js';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  limit,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
  getFirestore
} from 'firebase/firestore';

// Get db instance directly from getFirestore
const db = getFirestore();

interface RealtimeContextType {
  user: User | null;
  isOnline: boolean;
  chatMessages: ChatMessage[];
  onlineUsers: number;
  sendMessage: (message: string, room?: string) => Promise<void>;
  updateUserPresence: (isOnline: boolean) => Promise<void>;
  newsUpdates: NewsUpdate[];
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => Promise<void>;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: any;
  room: string;
  avatar: string;
}

interface NewsUpdate {
  id: string;
  title: string;
  description: string;
  category: string;
  timestamp: any;
  isBreaking: boolean;
}

interface AppNotification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: any;
  isRead: boolean;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};

interface RealtimeProviderProps {
  children: ReactNode;
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [newsUpdates, setNewsUpdates] = useState<NewsUpdate[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        updateUserPresence(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time chat messages listener
  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'chatMessages'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      setChatMessages(messages.reverse()); // Reverse to show oldest first
    }, (error) => {
      console.error('Error listening to chat messages:', error);
    });

    return () => unsubscribe();
  }, []);

  // Real-time online users count listener
  useEffect(() => {
    const presenceQuery = query(collection(db, 'userPresence'));

    const unsubscribe = onSnapshot(presenceQuery, (snapshot) => {
      const now = Date.now();
      const activeUsers = snapshot.docs.filter(doc => {
        const data = doc.data();
        return data.isOnline && (now - data.lastSeen?.toMillis() < 60000); // Active within last minute
      });
      setOnlineUsers(activeUsers.length);
    }, (error) => {
      console.error('Error listening to user presence:', error);
    });

    return () => unsubscribe();
  }, []);

  // Real-time news updates listener
  useEffect(() => {
    const newsQuery = query(
      collection(db, 'newsUpdates'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(newsQuery, (snapshot) => {
      const updates: NewsUpdate[] = [];
      snapshot.forEach((doc) => {
        updates.push({ id: doc.id, ...doc.data() } as NewsUpdate);
      });
      setNewsUpdates(updates);
    }, (error) => {
      console.error('Error listening to news updates:', error);
    });

    return () => unsubscribe();
  }, []);

  // Real-time notifications listener
  useEffect(() => {
    if (!user) return;

    const notificationsQuery = query(
      collection(db, 'users', user.uid, 'notifications'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notifs: AppNotification[] = [];
      snapshot.forEach((doc) => {
        notifs.push({ id: doc.id, ...doc.data() } as AppNotification);
      });
      setNotifications(notifs);
    }, (error) => {
      console.error('Error listening to notifications:', error);
    });

    return () => unsubscribe();
  }, [user]);

  const sendMessage = async (message: string, room: string = 'general') => {
    if (!user || !message.trim()) return;

    try {
      await addDoc(collection(db, 'chatMessages'), {
        user: user.displayName || user.email || 'Anonymous',
        message: message.trim(),
        timestamp: serverTimestamp(),
        room,
        avatar: user.photoURL || '👤',
        userId: user.uid
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const updateUserPresence = async (online: boolean) => {
    if (!user) return;

    try {
      const presenceRef = doc(db, 'userPresence', user.uid);
      await updateDoc(presenceRef, {
        isOnline: online,
        lastSeen: serverTimestamp(),
        displayName: user.displayName || user.email || 'Anonymous'
      });
    } catch (error) {
      // Document might not exist, create it
      try {
        await addDoc(collection(db, 'userPresence'), {
          userId: user.uid,
          isOnline: online,
          lastSeen: serverTimestamp(),
          displayName: user.displayName || user.email || 'Anonymous'
        });
      } catch (createError) {
        console.error('Error updating user presence:', createError);
      }
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    if (!user) return;

    try {
      const notificationRef = doc(db, 'users', user.uid, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isRead: true
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Cleanup user presence on unmount
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        updateUserPresence(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (user) {
        updateUserPresence(false);
      }
    };
  }, [user]);

  const value: RealtimeContextType = {
    user,
    isOnline,
    chatMessages,
    onlineUsers,
    sendMessage,
    updateUserPresence,
    newsUpdates,
    notifications,
    markNotificationAsRead
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};