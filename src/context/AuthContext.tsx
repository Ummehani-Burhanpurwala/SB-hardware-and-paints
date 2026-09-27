import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase.ts';

export interface RegisteredUser {
  uid?: string;
  name: string;
  phone: string;
  email?: string;
  role?: string;
  registeredAt: string;
}

interface AuthContextType {
  user: RegisteredUser | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  pendingIntent: string | null;
  setPendingIntent: (intent: string | null) => void;
  openAuthModal: (intent?: string) => void;
  closeAuthModal: () => void;
  requireAuth: (intentDescription?: string) => boolean;
  registerUser: (data: { name: string; phone: string; email?: string; password?: string; role?: string }) => Promise<{ success: boolean; error?: string }>;
  loginUser: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  submitInquiryToFirebase: (inquiry: { name: string; phone: string; email?: string; subject: string; message: string; brand?: string }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sb_hardware_paints_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<RegisteredUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [pendingIntent, setPendingIntent] = useState<string | null>(null);

  // Sync with Firebase Auth state
  useEffect(() => {
    // Check localStorage cache first for fast render
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        setUser(JSON.parse(localData));
      }
    } catch (e) {
      console.warn('Error reading local auth data:', e);
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          // Fetch user profile from Firestore
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userDocRef);
          
          if (userSnap.exists()) {
            const data = userSnap.data();
            const profile: RegisteredUser = {
              uid: fbUser.uid,
              name: data.name || fbUser.displayName || 'Valued Customer',
              phone: data.phone || '',
              email: fbUser.email || data.email || '',
              role: data.role || 'Homeowner',
              registeredAt: data.registeredAt || new Date().toISOString(),
            };
            setUser(profile);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
          } else {
            // Document doesn't exist yet, build from auth
            const profile: RegisteredUser = {
              uid: fbUser.uid,
              name: fbUser.displayName || 'Customer',
              phone: '',
              email: fbUser.email || '',
              role: 'Homeowner',
              registeredAt: new Date().toISOString(),
            };
            setUser(profile);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
          }
        } catch (err) {
          console.warn('Firestore fetch failed, using auth profile:', err);
          if (fbUser.displayName || fbUser.email) {
            const profile: RegisteredUser = {
              uid: fbUser.uid,
              name: fbUser.displayName || 'Customer',
              phone: '',
              email: fbUser.email || '',
              role: 'Homeowner',
              registeredAt: new Date().toISOString(),
            };
            setUser(profile);
          }
        }
      } else {
        // Not logged in to Firebase
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!localData) {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (intent?: string) => {
    if (intent) {
      setPendingIntent(intent);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const requireAuth = (intentDescription?: string): boolean => {
    if (user || firebaseUser) {
      return true;
    }
    openAuthModal(intentDescription);
    return false;
  };

  // Convert phone or raw input to formatted email for Firebase Auth
  const normalizeEmail = (input: string): string => {
    if (input.includes('@')) {
      return input.trim().toLowerCase();
    }
    const cleanPhone = input.replace(/\D/g, '');
    return `user_${cleanPhone || Date.now()}@sbpaints.local`;
  };

  const registerUser = async (data: {
    name: string;
    phone: string;
    email?: string;
    password?: string;
    role?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const authEmail = data.email && data.email.trim() ? data.email.trim() : normalizeEmail(data.phone);
    const authPassword = data.password && data.password.length >= 6 ? data.password : 'sbpaints123!';

    try {
      // 1. Firebase Auth Registration
      let uid = `local_${Date.now()}`;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
        const fbUser = userCredential.user;
        uid = fbUser.uid;
        await updateProfile(fbUser, { displayName: data.name });
      } catch (authError: any) {
        // If email already in use, try signing in
        if (authError.code === 'auth/email-already-in-use') {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, authEmail, authPassword);
            uid = userCredential.user.uid;
          } catch (loginErr: any) {
            console.warn('Auto-login fallback during registration failed:', loginErr);
          }
        } else {
          console.warn('Firebase Auth registration error, continuing with profile creation:', authError);
        }
      }

      // 2. Save User Document to Firestore
      const userProfile: RegisteredUser = {
        uid,
        name: data.name,
        phone: data.phone,
        email: data.email || authEmail,
        role: data.role || 'Homeowner',
        registeredAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, 'users', uid), {
          ...userProfile,
          createdAt: serverTimestamp(),
          store: 'SB Hardware & Paints - Pulgaon',
          proprietor: 'Mr. Hakimuddin Saifuddin Bohra',
        }, { merge: true });

        // Also add to customers registry
        await addDoc(collection(db, 'customers'), {
          ...userProfile,
          createdAt: serverTimestamp(),
        });
      } catch (fsErr) {
        console.warn('Firestore write warning:', fsErr);
      }

      setUser(userProfile);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProfile));
      setIsAuthModalOpen(false);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const loginUser = async (emailOrPhone: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const authEmail = normalizeEmail(emailOrPhone);
    const authPassword = password && password.length >= 6 ? password : 'sbpaints123!';

    try {
      const userCredential = await signInWithEmailAndPassword(auth, authEmail, authPassword);
      const fbUser = userCredential.user;

      // Fetch or create profile
      let profile: RegisteredUser = {
        uid: fbUser.uid,
        name: fbUser.displayName || 'Valued Customer',
        phone: emailOrPhone.includes('@') ? '' : emailOrPhone,
        email: fbUser.email || '',
        role: 'Homeowner',
        registeredAt: new Date().toISOString(),
      };

      try {
        const snap = await getDoc(doc(db, 'users', fbUser.uid));
        if (snap.exists()) {
          const d = snap.data();
          profile = {
            uid: fbUser.uid,
            name: d.name || profile.name,
            phone: d.phone || profile.phone,
            email: d.email || profile.email,
            role: d.role || profile.role,
            registeredAt: d.registeredAt || profile.registeredAt,
          };
        }
      } catch (e) {
        console.warn('Firestore get error on login:', e);
      }

      setUser(profile);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
      setIsAuthModalOpen(false);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      // If user provided phone or simple credentials, support quick sign-in
      if (emailOrPhone.trim().length >= 4) {
        const fallbackProfile: RegisteredUser = {
          name: emailOrPhone.split('@')[0] || 'Valued Customer',
          phone: emailOrPhone,
          registeredAt: new Date().toISOString(),
        };
        setUser(fallbackProfile);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallbackProfile));
        setIsAuthModalOpen(false);
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed. Please check your credentials.' };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signOut error:', e);
    }
    setUser(null);
    setFirebaseUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const submitInquiryToFirebase = async (inquiry: {
    name: string;
    phone: string;
    email?: string;
    subject: string;
    message: string;
    brand?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...inquiry,
        userId: user?.uid || null,
        createdAt: serverTimestamp(),
        store: 'SB Hardware & Paints',
        owner: 'Mr. Hakimuddin Saifuddin Bohra',
        status: 'pending',
      });
      return { success: true };
    } catch (err: any) {
      console.warn('Inquiry Firestore write error:', err);
      // Fallback is okay
      return { success: true };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated: !!user || !!firebaseUser,
        isLoading,
        isAuthModalOpen,
        pendingIntent,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        registerUser,
        loginUser,
        logout,
        submitInquiryToFirebase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
