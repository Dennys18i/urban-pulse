"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import GoBackButton from "@/components/ui/GoBackButton";
import BannedUserCard from "@/components/admin/banned/BannedUserCard";
import { BannedUser } from "@/types/BannedUser";

const mockBannedUsers: BannedUser[] = [
  {
    id: "1",
    name: "Anna Wintour",
    avatar: "/profile.png",
    bannedOn: "02/03/2026",
    reason: "Spamming",
  },
  {
    id: "2",
    name: "Elena Gilbert",
    avatar: "/profile.png",
    bannedOn: "01/12/2025",
    reason: "Harassment",
  },
  {
    id: "3",
    name: "Damon Salvatore",
    avatar: "/profile.png",
    bannedOn: "02/12/2025",
    reason: "Broken the rules",
  },
  {
    id: "4",
    name: "Liz Forbes",
    avatar: "/profile.png",
    bannedOn: "12/03/2026",
    reason: "Broken the rules",
  },
];

// ── Main Page ──
export default function BannedUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>(mockBannedUsers);

  const filteredUsers = bannedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUnban = (id: string) => {
    console.log("Unban user:", id);
    setBannedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-center relative">
        <GoBackButton />
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <h1 className="text-white font-bold text-xl">Banned users</h1>
          <span className="w-2.5 h-2.5 rounded-full bg-red-emergency" />
        </div>
      </div>
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-secondary rounded-[30] pl-12 pr-4 py-3 text-white outline-none placeholder:text-white/40  transition-colors"
        />
      </div>

      {/* User list */}
      <div className="flex flex-col gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <BannedUserCard key={user.id} user={user} onUnban={handleUnban} />
          ))
        ) : (
          <p className="text-white/40 text-center py-10">
            No banned users found.
          </p>
        )}
      </div>
    </div>
  );
}
