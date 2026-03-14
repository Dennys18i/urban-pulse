"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Event } from "@/types/Event";

const typeConfig: Record<string, { label: string; color: string }> = {
  General:   { label: "GENERAL",   color: "#4ade80" },
  Emergency: { label: "EMERGENCY", color: "#f87171" },
  Skill:     { label: "SKILL",     color: "#facc15" },
  Lend:      { label: "LEND",      color: "#60a5fa" },
  0:         { label: "GENERAL",   color: "#4ade80" },
  1:         { label: "EMERGENCY", color: "#f87171" },
  2:         { label: "SKILL",     color: "#facc15" },
  3:         { label: "LEND",      color: "#60a5fa" },
};

function getInitials(email: string) {
  return email?.split("@")[0]?.slice(0, 2).toUpperCase() ?? "UP";
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) + " · " + date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventCard({ event }: { event: Event }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(0);

  const type = typeConfig[event.type] ?? typeConfig[0];

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="w-full bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden">
      
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-white/60">
              {getInitials(event.createdByEmail)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium leading-tight">
              {event.createdByEmail?.split("@")[0] ?? "Unknown"}
            </span>
            <span className="text-white/30 text-xs">
              {formatDate(event.createdAt)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setSaved(!saved)}
          className="p-1.5 rounded-full transition-colors"
        >
          <Bookmark
            size={18}
            className={saved ? "fill-green-400 text-green-400" : "text-white/30"}
          />
        </button>
      </div>

      {event.imageUrl && (
        <div className="relative w-full aspect-video">
          <Image
            src={`http://localhost:5248${event.imageUrl}`}
            alt="event"
            fill
            sizes="100vw"
            className="object-cover"
            loading="eager"
          />
        </div>
      )}

      <div className="px-4 pt-3 pb-2">
        <p className="text-white/85 text-sm leading-relaxed">
          {event.description}
        </p>
      </div>

      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 transition-colors"
          >
            <Heart
              size={18}
              className={liked ? "fill-red-400 text-red-400" : "text-white/30"}
            />
            <span className="text-white/40 text-xs">{likes}</span>
          </button>

          <button className="flex items-center gap-1.5">
            <MessageCircle size={18} className="text-white/30" />
            <span className="text-white/40 text-xs">0</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {event.tags?.slice(0, 1).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/10 text-white/40"
            >
              {tag.toUpperCase()}
            </span>
          ))}
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: type.color + "18",
              color: type.color,
              border: `1px solid ${type.color}40`,
            }}
          >
            {type.label}
          </span>
        </div>
      </div>
    </div>
  );
}