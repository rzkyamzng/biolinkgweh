"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BiolinkData, SocialLink } from "@/types/biolink";

interface BiolinkContextType {
  data: BiolinkData;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateData: (newData: Partial<BiolinkData>) => void;
  updateLinks: (newLinks: SocialLink[]) => void;
}

const defaultData: BiolinkData = {
  bannerUrl:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  name: "Alex Joshua",
  bio: "Full-Stack Developer & Creative Designer. Building digital products that elevate human experience.",
  whatsappNumber: "628123456789",
  whatsappMessage: "Halo Alex, saya tertarik untuk bekerja sama!",
  links: [
    { id: "1", title: "Visit My Portfolio", url: "https://example.com" },
    { id: "2", title: "Read My Articles on Medium", url: "https://medium.com" },
    { id: "3", title: "Follow Me on GitHub", url: "https://github.com" },
    { id: "4", title: "Connect on LinkedIn", url: "https://linkedin.com" },
  ],
};

const BiolinkContext = createContext<BiolinkContextType | undefined>(undefined);

export const BiolinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<BiolinkData>(defaultData);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Sinkronisasi data profil
    const savedData = localStorage.getItem("biolink_data");
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error(e);
      }
    }

    // Sinkronisasi status login session sederhana
    const authStatus = localStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Password mock untuk login: "admin123"
  const login = (password: string): boolean => {
    if (password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  const updateData = (newData: Partial<BiolinkData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("biolink_data", JSON.stringify(updated));
      return updated;
    });
  };

  const updateLinks = (newLinks: SocialLink[]) => {
    setData((prev) => {
      const updated = { ...prev, links: newLinks };
      localStorage.setItem("biolink_data", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BiolinkContext.Provider
      value={{ data, isAuthenticated, login, logout, updateData, updateLinks }}
    >
      {children}
    </BiolinkContext.Provider>
  );
};

export const useBiolink = () => {
  const context = useContext(BiolinkContext);
  if (!context)
    throw new Error("useBiolink must be used within a BiolinkProvider");
  return context;
};
