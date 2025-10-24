import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAnonymous: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseAvailable, setFirebaseAvailable] = useState(true);

  useEffect(() => {
    // Check if Firebase auth is available
    if (!auth) {
      console.warn('Firebase auth not initialized. Using local anonymous user.');
      setFirebaseAvailable(false);
      setUser({
        uid: 'local-anonymous-user',
        isAnonymous: true,
        email: null,
        displayName: 'Visitante',
      } as User);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Auto-login as anonymous/guest for seamless experience
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.warn('Auto guest login failed, using local fallback:', error);
          // Fallback to local anonymous user if Firebase fails
          setUser({
            uid: 'local-anonymous-user',
            isAnonymous: true,
            email: null,
            displayName: 'Visitante',
          } as User);
          setLoading(false);
        }
      } else {
        setUser(user);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    if (!firebaseAvailable) {
      throw new Error('Firebase authentication is not available');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    if (!firebaseAvailable) {
      throw new Error('Firebase authentication is not available');
    }
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!firebaseAvailable) {
      throw new Error('Firebase authentication is not available');
    }
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginAsGuest = async () => {
    if (!firebaseAvailable) {
      // Already using local anonymous user
      return;
    }
    await signInAnonymously(auth);
  };

  const logout = async () => {
    if (!firebaseAvailable) {
      // Can't logout from local anonymous user
      return;
    }
    await signOut(auth);
  };

  const value: AuthContextType = {
    user,
    loading,
    isAnonymous: user?.isAnonymous || false,
    login,
    register,
    loginWithGoogle,
    loginAsGuest,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};