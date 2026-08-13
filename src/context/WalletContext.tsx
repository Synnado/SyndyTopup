"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface WalletContextType {
  balance: number;
  isLoading: boolean;
  addFunds: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);
const STORAGE_KEY = "syndytopup_wallet_balance";

export function WalletProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed)) setBalance(parsed);
    }
    setIsLoading(false);
  }, []);

  // TODO: ตอนนี้เป็นระบบจำลอง (mock) เก็บยอดเงินไว้ใน localStorage เท่านั้น
  // ไม่ได้เชื่อมกับระบบชำระเงินจริงหรือ backend ใดๆ พอมี backend จริงจากเพื่อน
  // ค่อยเปลี่ยนฟังก์ชันนี้ให้ไปเรียก API เติมเงินจริงแทน
  function addFunds(amount: number) {
    setBalance((prev) => {
      const next = prev + amount;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <WalletContext.Provider value={{ balance, isLoading, addFunds }}>
      {children}
    </WalletContext.Provider>
  );
}

// hook เอาไว้เรียกใช้ยอดเงินจากที่อื่นๆ เช่น const { balance } = useWallet();
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet ต้องถูกเรียกใช้ภายใน <WalletProvider> เท่านั้น");
  }
  return context;
}