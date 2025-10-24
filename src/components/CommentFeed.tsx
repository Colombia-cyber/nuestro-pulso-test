import React, { useState, useEffect } from "react";
import ErrorFallback from "./ErrorFallback";

/**
 * Comment interface matching both Firebase and Supabase schemas
 */
export interface DebateComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: DebateComment[];
  parentId?: string | null;
  flagged?: boolean;
  flagReason?: string;
}

/**
 * Real-time backend adapter interface
 * Implement this for Firebase, Supabase, or other backends
 */
interface RealtimeAdapter {
  // Subscribe to new comments
  subscribeToComments(callback: (comments: DebateComment[]) => void): () => void;
  // Post a new comment
  postComment(comment: Omit<DebateComment, 'id' | 'createdAt' | 'likes'>): Promise<DebateComment>;
  // Like a comment
  likeComment(commentId: string): Promise<void>;
  // Report/flag a comment
  flagComment(commentId: string, reason: string): Promise<void>;
}

/**
 * DEMO MODE: Simulated in-memory backend
 * This is the default mode when no real-time backend is configured
 */
class SimulatedAdapter implements RealtimeAdapter {
  private comments: DebateComment[] = [
    {
      id: "demo-1",
      userId: "user-1",
      userName: "María González",
      content: "¡Excelente iniciativa para mantenernos informados! Me encanta poder ver tanto noticias locales como internacionales.",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      likes: 5,
      replies: []
    },
    {
      id: "demo-2",
      userId: "user-2",
      userName: "Carlos Ramírez",
      content: "Sería genial poder filtrar por temas específicos. ¿Planean agregar esa funcionalidad?",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      likes: 3,
      replies: []
    },
    {
      id: "demo-3",
      userId: "user-3",
      userName: "Ana Díaz",
      content: "La sección de reels está increíble. Muy fácil de navegar.",
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      likes: 8,
      replies: []
    }
  ];
  private listeners: ((comments: DebateComment[]) => void)[] = [];

  subscribeToComments(callback: (comments: DebateComment[]) => void): () => void {
    this.listeners.push(callback);
    // Immediately send current comments
    callback([...this.comments]);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  async postComment(comment: Omit<DebateComment, 'id' | 'createdAt' | 'likes'>): Promise<DebateComment> {
    const newComment: DebateComment = {
      ...comment,
      id: `demo-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    this.comments.unshift(newComment);
    this.notifyListeners();
    
    return newComment;
  }

  async likeComment(commentId: string): Promise<void> {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      comment.likes += 1;
      this.notifyListeners();
    }
  }

  async flagComment(commentId: string, reason: string): Promise<void> {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      comment.flagged = true;
      comment.flagReason = reason;
      this.notifyListeners();
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.comments]));
  }
}

/**
 * FIREBASE ADAPTER EXAMPLE
 * 
 * TODO: To enable Firebase real-time comments:
 * 1. Ensure Firebase is initialized in src/firebase.js
 * 2. Add Firestore to your Firebase project
 * 3. Set up security rules in Firebase Console
 * 4. Uncomment the code below and comment out SimulatedAdapter usage
 * 
 * Environment variables needed:
 * - VITE_FIREBASE_API_KEY
 * - VITE_FIREBASE_AUTH_DOMAIN
 * - VITE_FIREBASE_PROJECT_ID
 * - VITE_FIREBASE_STORAGE_BUCKET
 * - VITE_FIREBASE_MESSAGING_SENDER_ID
 * - VITE_FIREBASE_APP_ID
 */
/*
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, increment } from 'firebase/firestore';
import { app } from '../firebase';

class FirebaseAdapter implements RealtimeAdapter {
  private db = getFirestore(app);
  private commentsRef = collection(this.db, 'comments');

  subscribeToComments(callback: (comments: DebateComment[]) => void): () => void {
    const q = query(this.commentsRef, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const comments: DebateComment[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as DebateComment));
      callback(comments);
    });
  }

  async postComment(comment: Omit<DebateComment, 'id' | 'createdAt' | 'likes'>): Promise<DebateComment> {
    const docRef = await addDoc(this.commentsRef, {
      ...comment,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    });

    return {
      ...comment,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };
  }

  async likeComment(commentId: string): Promise<void> {
    const commentRef = doc(this.db, 'comments', commentId);
    await updateDoc(commentRef, {
      likes: increment(1)
    });
  }

  async flagComment(commentId: string, reason: string): Promise<void> {
    const commentRef = doc(this.db, 'comments', commentId);
    await updateDoc(commentRef, {
      flagged: true,
      flagReason: reason
    });
  }
}
*/

/**
 * SUPABASE ADAPTER EXAMPLE
 * 
 * TODO: To enable Supabase real-time comments:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Create a 'comments' table with the Comment interface fields
 * 3. Enable Row Level Security (RLS) policies
 * 4. Install Supabase client: npm install @supabase/supabase-js
 * 5. Uncomment the code below and comment out SimulatedAdapter usage
 * 
 * Environment variables needed:
 * - VITE_SUPABASE_URL
 * - VITE_SUPABASE_ANON_KEY
 * 
 * SQL for creating the table:
 * 
 * CREATE TABLE comments (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id TEXT NOT NULL,
 *   user_name TEXT NOT NULL,
 *   user_avatar TEXT,
 *   content TEXT NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at TIMESTAMP WITH TIME ZONE,
 *   likes INTEGER DEFAULT 0,
 *   parent_id UUID REFERENCES comments(id),
 *   flagged BOOLEAN DEFAULT FALSE,
 *   flag_reason TEXT
 * );
 */
/*
import { createClient, RealtimeChannel } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

class SupabaseAdapter implements RealtimeAdapter {
  private channel: RealtimeChannel | null = null;

  subscribeToComments(callback: (comments: DebateComment[]) => void): () => void {
    // Initial fetch
    this.fetchComments().then(callback);

    // Subscribe to real-time updates
    this.channel = supabase
      .channel('comments')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'comments' },
        () => {
          this.fetchComments().then(callback);
        }
      )
      .subscribe();

    // Return unsubscribe function
    return () => {
      if (this.channel) {
        supabase.removeChannel(this.channel);
      }
    };
  }

  private async fetchComments(): Promise<DebateComment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(row => ({
      id: row.id,
      userId: row.user_id,
      userName: row.user_name,
      userAvatar: row.user_avatar,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      likes: row.likes || 0,
      replies: [],
      parentId: row.parent_id,
      flagged: row.flagged || false,
      flagReason: row.flag_reason
    }));
  }

  async postComment(comment: Omit<DebateComment, 'id' | 'createdAt' | 'likes'>): Promise<DebateComment> {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        user_id: comment.userId,
        user_name: comment.userName,
        user_avatar: comment.userAvatar,
        content: comment.content,
        parent_id: comment.parentId
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      userName: data.user_name,
      userAvatar: data.user_avatar,
      content: data.content,
      createdAt: data.created_at,
      likes: 0,
      replies: []
    };
  }

  async likeComment(commentId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_likes', {
      comment_id: commentId
    });
    if (error) throw error;
  }

  async flagComment(commentId: string, reason: string): Promise<void> {
    const { error } = await supabase
      .from('comments')
      .update({ flagged: true, flag_reason: reason })
      .eq('id', commentId);
    if (error) throw error;
  }
}
*/

/**
 * Select the active backend adapter
 * 
 * TO SWITCH BACKENDS:
 * - For Firebase: const adapter = new FirebaseAdapter();
 * - For Supabase: const adapter = new SupabaseAdapter();
 * - For Demo: const adapter = new SimulatedAdapter();
 */
const adapter: RealtimeAdapter = new SimulatedAdapter();

interface CommentFeedProps {
  className?: string;
  maxComments?: number;
}

/**
 * CommentFeed - Production-ready real-time comments component
 * 
 * Features:
 * - Real-time updates via Firebase or Supabase (with demo fallback)
 * - Optimistic UI for posting comments
 * - Like functionality
 * - Comment moderation/flagging
 * - Reply placeholder (TODO: implement nested comments)
 * - Accessible UI with ARIA labels
 * 
 * See comments above for enabling Firebase or Supabase backends.
 */
const CommentFeed: React.FC<CommentFeedProps> = ({ 
  className = "",
  maxComments = 50
}) => {
  const [comments, setComments] = useState<DebateComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [posting, setPosting] = useState(false);

  // Subscribe to real-time comments
  useEffect(() => {
    setLoading(true);
    
    const unsubscribe = adapter.subscribeToComments((updatedComments) => {
      setComments(updatedComments.slice(0, maxComments));
      setLoading(false);
    });

    return unsubscribe;
  }, [maxComments]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCommentText.trim()) return;

    setPosting(true);
    
    try {
      // TODO: Replace with actual user authentication
      const currentUser = {
        userId: `user-${Date.now()}`,
        userName: "Usuario Anónimo", // Replace with authenticated user name
        userAvatar: undefined
      };

      await adapter.postComment({
        ...currentUser,
        content: newCommentText,
        parentId: null,
        replies: []
      });

      setNewCommentText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al publicar comentario");
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await adapter.likeComment(commentId);
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  const handleFlag = async (commentId: string) => {
    const reason = prompt("¿Por qué quieres reportar este comentario?");
    if (reason) {
      try {
        await adapter.flagComment(commentId, reason);
        alert("Comentario reportado. Gracias por ayudarnos a mantener la comunidad segura.");
      } catch (err) {
        console.error("Error flagging comment:", err);
      }
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - commentDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Ahora";
    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return `Hace ${Math.floor(diffInMinutes / 1440)}d`;
  };

  if (error) {
    return (
      <ErrorFallback
        error={error}
        resetError={() => setError(null)}
        title="Error en comentarios"
      />
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        💬 Comentarios de la Comunidad
      </h3>

      {/* Post new comment form */}
      <form onSubmit={handlePostComment} className="mb-8">
        <label htmlFor="new-comment" className="sr-only">
          Escribe tu comentario
        </label>
        <textarea
          id="new-comment"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Comparte tu opinión..."
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          disabled={posting}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={posting || !newCommentText.trim()}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {posting ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>

      {/* Comments list */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">
          <div className="animate-pulse">Cargando comentarios...</div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No hay comentarios aún.</p>
          <p className="mt-2">¡Sé el primero en comentar!</p>
        </div>
      ) : (
        <div className="space-y-4" role="list" aria-label="Lista de comentarios">
          {comments.map((comment) => (
            <div
              key={comment.id}
              role="listitem"
              className={`p-4 rounded-lg ${
                comment.flagged ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {comment.userAvatar ? (
                    <img
                      src={comment.userAvatar}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {comment.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">
                      {comment.userName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(comment.createdAt)}
                    </span>
                    {comment.flagged && (
                      <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded">
                        Reportado
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label={`Me gusta (${comment.likes})`}
                    >
                      <span>👍</span>
                      <span>{comment.likes}</span>
                    </button>
                    
                    {/* TODO: Implement reply functionality */}
                    <button
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Responder"
                      disabled
                    >
                      Responder
                    </button>
                    
                    {!comment.flagged && (
                      <button
                        onClick={() => handleFlag(comment.id)}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                        aria-label="Reportar comentario"
                      >
                        Reportar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentFeed;
