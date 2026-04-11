"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSignalR } from "@/context/SignalRContext";

interface UserProfile {
  id: number;
  email: string;
  fullName?: string;
  role?: string;
  isVerified?: boolean;
  isBanned?: boolean;
  trustScore?: number;
  avatarUrl?: string | null;
  latitude?: number;
  longitude?: number;
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  viewAsUser: boolean;
  setViewAsUser: (value: boolean) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  viewAsUser: true,
  setViewAsUser: () => {},
});

function logoutAndRedirect() {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0";
  window.location.href = "/";
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewAsUser, setViewAsUserState] = useState<boolean>(true);
  const { notificationConnection } = useSignalR();

  useEffect(() => {
    const saved = localStorage.getItem("viewAsUser");
    setViewAsUserState(saved === null ? true : saved === "true");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }

    fetch("http://localhost:5248/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isBanned) {
          logoutAndRedirect();
          return;
        }
        setUser(data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!notificationConnection) return;
    notificationConnection.on("UserBanned", logoutAndRedirect);
    return () => notificationConnection.off("UserBanned", logoutAndRedirect);
  }, [notificationConnection]);

  const setViewAsUser = (value: boolean) => {
    setViewAsUserState(value);
    localStorage.setItem("viewAsUser", String(value));
  };

  const isAdmin = user?.role === "Admin" && !viewAsUser;

  return (
    <UserContext.Provider value={{ user, loading, isAdmin, viewAsUser, setViewAsUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);