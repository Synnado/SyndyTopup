"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthUser {
  username: string;
  email: string;
  joinedAt: string; // วันที่สมัคร เก็บเป็น ISO string
  avatarUrl?: string; // รูปโปรไฟล์ เก็บเป็น data URL (base64)
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "syndytopup_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ตอนเปิดเว็บครั้งแรก เช็คว่าเคยล็อกอินค้างไว้ไหม
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  function persist(newUser: AuthUser | null) {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // TODO: ตอนนี้เป็นระบบจำลอง (mock) เก็บใน localStorage เท่านั้น
  // ไม่ได้เช็ครหัสผ่านจริงจาก backend — แค่จำลองว่า "สำเร็จ" ไว้ก่อน เพื่อทดสอบหน้าตา UI
  // พอมี backend จริงจากเพื่อนแล้ว ค่อยเปลี่ยนส่วนนี้ให้ไปเรียก API แทน
  function login(email: string, _password: string) {
    // ถ้าเคยมีข้อมูลผู้ใช้อีเมลเดียวกันอยู่แล้ว ให้คงวันที่สมัครเดิมไว้ ไม่รีเซ็ตใหม่
    let joinedAt = new Date().toISOString();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.email === email && parsed.joinedAt) {
          joinedAt = parsed.joinedAt;
        }
      } catch {
        // ไม่ต้องทำอะไร ใช้ joinedAt ใหม่ไปเลย
      }
    }
    const username = email.split("@")[0] || "ผู้ใช้";
    persist({ username, email, joinedAt });
  }

  function register(username: string, email: string, _password: string) {
    persist({ username, email, joinedAt: new Date().toISOString() });
  }

  function logout() {
    persist(null);
  }

  // ใช้แก้ไขข้อมูลโปรไฟล์บางส่วน เช่น ชื่อผู้ใช้ (ยังเก็บแค่ใน localStorage ไปก่อน)
  function updateProfile(updates: Partial<AuthUser>) {
    if (!user) return;
    persist({ ...user, ...updates });
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// hook เอาไว้เรียกใช้สถานะล็อกอินจากที่อื่นๆ เช่น const { user, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth ต้องถูกเรียกใช้ภายใน <AuthProvider> เท่านั้น");
  }
  return context;
}