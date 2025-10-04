// Firebase Chat Service for topic-based real-time chat
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { ChatMessage } from '../types/dashboard';

class FirebaseChatService {
  private unsubscribeFunctions: Map<string, () => void> = new Map();

  /**
   * Subscribe to chat messages for a specific topic
   */
  subscribeToTopic(
    topicId: string, 
    onMessagesUpdate: (messages: ChatMessage[]) => void,
    maxMessages: number = 50
  ): () => void {
    try {
      // Create a query for the topic's messages
      const messagesRef = collection(db, 'chat-messages', topicId, 'messages');
      const q = query(
        messagesRef,
        orderBy('timestamp', 'desc'),
        limit(maxMessages)
      );

      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const messages: ChatMessage[] = [];
          
          snapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
              id: doc.id,
              userId: data.userId || 'anonymous',
              userName: data.userName || 'Usuario Anónimo',
              message: data.message || '',
              timestamp: data.timestamp?.toMillis() || Date.now(),
              avatar: data.avatar || '👤',
              topicId: topicId
            });
          });

          // Reverse to show oldest first
          messages.reverse();
          onMessagesUpdate(messages);
        },
        (error) => {
          console.error('Error subscribing to chat:', error);
          // Return demo messages on error
          onMessagesUpdate(this.getDemoMessages(topicId));
        }
      );

      // Store unsubscribe function
      this.unsubscribeFunctions.set(topicId, unsubscribe);
      
      return unsubscribe;
    } catch (error) {
      console.error('Failed to subscribe to chat:', error);
      // Return demo messages if Firebase is not configured
      onMessagesUpdate(this.getDemoMessages(topicId));
      return () => {}; // Return no-op function
    }
  }

  /**
   * Send a message to a topic chat
   */
  async sendMessage(
    topicId: string,
    userId: string,
    userName: string,
    message: string,
    avatar?: string
  ): Promise<void> {
    try {
      const messagesRef = collection(db, 'chat-messages', topicId, 'messages');
      
      await addDoc(messagesRef, {
        userId,
        userName,
        message,
        avatar: avatar || '👤',
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('No se pudo enviar el mensaje. Verifica tu configuración de Firebase.');
    }
  }

  /**
   * Unsubscribe from a topic's chat
   */
  unsubscribeFromTopic(topicId: string): void {
    const unsubscribe = this.unsubscribeFunctions.get(topicId);
    if (unsubscribe) {
      unsubscribe();
      this.unsubscribeFunctions.delete(topicId);
    }
  }

  /**
   * Unsubscribe from all topics
   */
  unsubscribeAll(): void {
    this.unsubscribeFunctions.forEach((unsubscribe) => {
      unsubscribe();
    });
    this.unsubscribeFunctions.clear();
  }

  /**
   * Get demo messages when Firebase is not available
   */
  private getDemoMessages(topicId: string): ChatMessage[] {
    const now = Date.now();
    
    return [
      {
        id: 'demo-msg-1',
        userId: 'user-1',
        userName: 'María González',
        message: '¿Qué opinan sobre este tema? Me parece muy importante para el país.',
        timestamp: now - 300000, // 5 minutes ago
        avatar: '👩‍💼',
        topicId
      },
      {
        id: 'demo-msg-2',
        userId: 'user-2',
        userName: 'Carlos Ramírez',
        message: 'Totalmente de acuerdo. Deberíamos prestar más atención a este tipo de asuntos.',
        timestamp: now - 240000, // 4 minutes ago
        avatar: '👨‍💻',
        topicId
      },
      {
        id: 'demo-msg-3',
        userId: 'user-3',
        userName: 'Ana Martínez',
        message: 'He estado siguiendo las noticias. Hay diferentes perspectivas interesantes.',
        timestamp: now - 180000, // 3 minutes ago
        avatar: '👩‍🎓',
        topicId
      },
      {
        id: 'demo-msg-4',
        userId: 'user-4',
        userName: 'Juan López',
        message: 'Sería bueno tener más información de fuentes confiables.',
        timestamp: now - 120000, // 2 minutes ago
        avatar: '👨‍🏫',
        topicId
      },
      {
        id: 'demo-msg-5',
        userId: 'system',
        userName: 'Sistema',
        message: '💡 Modo demostración: Configura Firebase para chat en tiempo real. Los mensajes no se guardarán.',
        timestamp: now - 60000, // 1 minute ago
        avatar: '🤖',
        topicId
      }
    ];
  }

  /**
   * Check if Firebase is properly configured for chat
   */
  isConfigured(): boolean {
    try {
      // Check if db is available and configured
      return db !== null && db !== undefined;
    } catch {
      return false;
    }
  }
}

export const firebaseChatService = new FirebaseChatService();
export default firebaseChatService;
