"use client";
import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  uid: string;
  email: string | null;
  username: string;
  description?: string;
}

interface AuthContextType {
  user: User | null;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Hämta användarnamnet från Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: userData?.username || "Okänd användare",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      setUser({ uid: user.uid, email: user.email, username });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
