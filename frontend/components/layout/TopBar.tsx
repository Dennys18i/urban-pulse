"use client";

import Image from "next/image";
import GoBackButton from "../ui/GoBackButton";
import ProfileRoundButton from "../ui/ProfileRoundButton";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSignalR } from "@/context/SignalRContext";

interface TopBarProps {
  back: boolean;
  notifications: boolean;
  settings: boolean;
  addPost?: boolean;
}

export default function TopBar({ back, notifications, settings, addPost }: TopBarProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { notificationConnection } = useSignalR();

  useEffect(() => {
    if (!notifications) return;
    const fetchCount = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5248/api/notification/unread-count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.count);
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, [notifications]);

  useEffect(() => {
    if (!notificationConnection) return;
    const handler = () => setUnreadCount((prev) => prev + 1);
    notificationConnection.on("NewNotification", handler);
    return () => notificationConnection.off("NewNotification", handler);
  }, [notificationConnection]);

  return (
    <div className={`flex ${back || addPost ? "justify-between" : "justify-end"} ${addPost ? "mb-[calc(15vh-78px)]" : ""} items-center`}>
      {back && <GoBackButton />}
      {addPost && (
        <ProfileRoundButton route="/addPost">
          <Plus width={47} height={30} strokeWidth={3} />
        </ProfileRoundButton>
      )}

      <div className="flex justify-center items-center gap-3">
        {notifications && (
          <ProfileRoundButton route="/notifications">
            <div className="relative">
              <Image src="/notifications.svg" alt="notifications" width={40} height={25} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
          </ProfileRoundButton>
        )}
        {settings && (
          <ProfileRoundButton route="./profile/settings">
            <Image src="/settings.svg" alt="settings" width={47} height={30} />
          </ProfileRoundButton>
        )}
      </div>
    </div>
  );
}