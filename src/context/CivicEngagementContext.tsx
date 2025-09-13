import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for the civic engagement context
export interface Poll {
  id: number;
  title: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  timeLeft: string;
  category: string;
  hasVoted: boolean;
}

export interface PollOption {
  id: number;
  text: string;
  votes: number;
  percentage: number;
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content?: string;
  category: string;
  time: string;
  views: string;
  author?: string;
  image?: string;
}

export interface CongressMember {
  id: number;
  name: string;
  party: string;
  region: string;
  activity: number;
  bills: number;
  attendance: number;
  image: string;
}

export interface CivicEngagementState {
  activePolls: Poll[];
  newsArticles: NewsArticle[];
  congressMembers: CongressMember[];
  userParticipation: {
    pollsAnswered: number;
    totalPolls: number;
    participationLevel: number;
  };
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
  }>;
}

interface CivicEngagementContextType {
  state: CivicEngagementState;
  voteInPoll: (pollId: number, optionId: number) => void;
  markNewsAsRead: (articleId: number) => void;
  addNotification: (notification: Omit<CivicEngagementState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  updateUserParticipation: () => void;
}

const CivicEngagementContext = createContext<CivicEngagementContextType | undefined>(undefined);

const initialState: CivicEngagementState = {
  activePolls: [],
  newsArticles: [],
  congressMembers: [],
  userParticipation: {
    pollsAnswered: 0,
    totalPolls: 0,
    participationLevel: 0
  },
  notifications: []
};

export const CivicEngagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CivicEngagementState>(initialState);

  // Load initial data
  useEffect(() => {
    // In a real app, this would come from an API
    const mockData: CivicEngagementState = {
      activePolls: [
        {
          id: 1,
          title: "Reforma al Sistema de Salud",
          description: "¿Estás de acuerdo con las propuestas de reforma al sistema de salud colombiano?",
          totalVotes: 2847,
          timeLeft: "2 días",
          options: [
            { id: 1, text: "Totalmente de acuerdo", votes: 1139, percentage: 40 },
            { id: 2, text: "Parcialmente de acuerdo", votes: 854, percentage: 30 },
            { id: 3, text: "En desacuerdo", votes: 569, percentage: 20 },
            { id: 4, text: "Sin opinión", votes: 285, percentage: 10 }
          ],
          category: "Salud",
          hasVoted: false
        }
      ],
      newsArticles: [
        {
          id: 1,
          title: "Congreso aprueba nueva ley de participación ciudadana digital",
          summary: "La iniciativa busca fortalecer los mecanismos de democracia digital en Colombia",
          category: "Política",
          time: "Hace 2 horas",
          views: "2.4K",
          author: "Redacción Nuestro Pulso"
        }
      ],
      congressMembers: [
        {
          id: 1,
          name: "Senador Carlos López",
          party: "Partido Liberal",
          region: "Bogotá D.C.",
          activity: 95,
          bills: 12,
          attendance: 98,
          image: "https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=CL"
        }
      ],
      userParticipation: {
        pollsAnswered: 12,
        totalPolls: 23,
        participationLevel: 52
      },
      notifications: [
        {
          id: '1',
          title: 'Nueva encuesta disponible',
          message: 'Una nueva encuesta sobre educación está disponible para tu participación',
          type: 'info',
          timestamp: new Date(),
          read: false
        }
      ]
    };

    setState(mockData);
  }, []);

  const voteInPoll = (pollId: number, optionId: number) => {
    setState(prevState => ({
      ...prevState,
      activePolls: prevState.activePolls.map(poll =>
        poll.id === pollId ? { ...poll, hasVoted: true } : poll
      ),
      userParticipation: {
        ...prevState.userParticipation,
        pollsAnswered: prevState.userParticipation.pollsAnswered + 1
      }
    }));
  };

  const markNewsAsRead = (articleId: number) => {
    // In a real app, this would make an API call
    console.log(`Marking article ${articleId} as read`);
  };

  const addNotification = (notification: Omit<CivicEngagementState['notifications'][0], 'id' | 'timestamp' | 'read'>) => {
    const newNotification = {
      ...notification,
      id: Math.random().toString(36).substring(2),
      timestamp: new Date(),
      read: false
    };

    setState(prevState => ({
      ...prevState,
      notifications: [newNotification, ...prevState.notifications]
    }));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setState(prevState => ({
      ...prevState,
      notifications: prevState.notifications.map(notification =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    }));
  };

  const updateUserParticipation = () => {
    setState(prevState => {
      const participationLevel = Math.round(
        (prevState.userParticipation.pollsAnswered / prevState.userParticipation.totalPolls) * 100
      );

      return {
        ...prevState,
        userParticipation: {
          ...prevState.userParticipation,
          participationLevel
        }
      };
    });
  };

  const contextValue: CivicEngagementContextType = {
    state,
    voteInPoll,
    markNewsAsRead,
    addNotification,
    markNotificationAsRead,
    updateUserParticipation
  };

  return (
    <CivicEngagementContext.Provider value={contextValue}>
      {children}
    </CivicEngagementContext.Provider>
  );
};

export const useCivicEngagement = (): CivicEngagementContextType => {
  const context = useContext(CivicEngagementContext);
  if (context === undefined) {
    throw new Error('useCivicEngagement must be used within a CivicEngagementProvider');
  }
  return context;
};