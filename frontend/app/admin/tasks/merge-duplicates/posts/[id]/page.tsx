"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BadgeCheck, Check, ThumbsUp, MessageCircle } from "lucide-react";
import EventTag from "@/components/ui/EventTag";
import { EventType } from "@/types/Event";

// ── Types ──
interface DuplicatePost {
  id: string;
  authorName: string;
  authorAvatar: string;
  isVerified: boolean;
  date: string;
  time: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  tag: EventType;
}

const mockMatchCriteria = ["description", "user", "date"];

const mockDuplicatePosts: DuplicatePost[] = [
  {
    id: "1a",
    authorName: "Tyler Lockwood",
    authorAvatar: "/profile.png",
    isVerified: true,
    date: "15.02.2026",
    time: "7:20",
    title: "Helloo!",
    description:
      "My TV is suddenly not working anymore and I really don\u2019t know what to do. I tried to contact those who put my TV but they are soo busy right now. Is there anyone who can help, please?",
    likes: 32,
    comments: 10,
    tag: "Skill" as EventType,
  },
  {
    id: "1b",
    authorName: "Tyler Lockwood",
    authorAvatar: "/profile.png",
    isVerified: true,
    date: "15.02.2026",
    time: "7:15",
    title: "Helloo!",
    description:
      "My TV is suddenly not working anymore and I really don\u2019t know what to do. I tried to contact those who put my TV but they are soo busy right now. Is there anyone who can help, please?",
    likes: 0,
    comments: 0,
    tag: "General" as EventType,
  },
];

export default function ReviewDuplicatePostsPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleKeep = () => {
    if (!selectedId) return;
    console.log("Keep post:", selectedId);
    router.back();
  };

  const handleIgnore = () => {
    console.log("Ignore merge suggestion");
    router.back();
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-up pb-32">
      {/* Header — back button */}
      <div className="flex items-center">
        <button
          onClick={() => router.back()}
          className="cursor-pointer hover:scale-105 active:scale-95 z-10"
        >
          <Image
            src="/undo.svg"
            alt="go_back"
            width={69}
            height={49}
            className="-ml-2"
          />
        </button>
      </div>

      {/* Matches info */}
      <div className="flex flex-col gap-1">
        <h2 className="text-yellow-primary font-bold text-xl italic">
          Matches:
        </h2>
        <p className="text-white font-bold text-2xl">
          {mockMatchCriteria.join(", ")}
        </p>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-yellow-primary/60" />

      {/* Instruction */}
      <div className="flex flex-col gap-2">
        <p className="text-white text-base">
          Select which post is{" "}
          <span className="text-[#E8837C] font-bold">permanent</span>:
        </p>
        <p className="text-white/40 text-sm">
          *The other one/ones will be deleted
        </p>
      </div>

      {/* Post cards */}
      <div className="flex flex-col gap-5">
        {mockDuplicatePosts.map((post) => {
          const isSelected = selectedId === post.id;

          return (
            <button
              key={post.id}
              onClick={() => setSelectedId(post.id)}
              className={`w-full bg-[#1e1e1e] border rounded-2xl p-5 flex flex-col gap-3 transition-all cursor-pointer text-left ${
                isSelected
                  ? "border-yellow-primary shadow-[0_0_15px_rgba(245,214,61,0.15)]"
                  : "border-white/10"
              }`}
            >
              {/* Header: avatar, name, verified, date, checkbox */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex-shrink-0">
                    <Image
                      src={post.authorAvatar}
                      alt={post.authorName}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name + date */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-bold text-sm">
                        {post.authorName}
                      </span>
                      {post.isVerified && (
                        <BadgeCheck
                          size={16}
                          className="text-green-light fill-green-light"
                        />
                      )}
                    </div>
                    <span className="text-white/40 text-xs">
                      {post.date} &nbsp; {post.time}
                    </span>
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  className={`w-7 h-7 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected
                      ? "bg-yellow-primary border-yellow-primary"
                      : "bg-transparent border-white/60"
                  }`}
                >
                  {isSelected && (
                    <Check
                      size={18}
                      className="text-[#1a1a1a]"
                      strokeWidth={3}
                    />
                  )}
                </div>
              </div>

              {/* Post title */}
              <h3 className="text-white font-bold text-base mt-1">
                {post.title}
              </h3>

              {/* Post description */}
              <p className="text-white/80 text-sm leading-relaxed">
                {post.description}
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-white/10 mt-1" />

              {/* Footer: likes, comments, tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  {/* Likes */}
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp
                      size={18}
                      className="text-green-light"
                    />
                    <span className="text-white font-bold text-sm">
                      {post.likes}
                    </span>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-1.5">
                    <MessageCircle
                      size={18}
                      className="text-green-light fill-green-light"
                    />
                    <span className="text-white font-bold text-sm">
                      {post.comments}
                    </span>
                  </div>
                </div>

                {/* Event tag */}
                <EventTag type={post.tag} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom action buttons — fixed */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 px-6 z-40">
        <button
          onClick={handleKeep}
          disabled={!selectedId}
          className={`flex-1 max-w-[200px] py-4 rounded-2xl font-bold text-base transition-all cursor-pointer ${
            selectedId
              ? "bg-green-light hover:bg-green-light/80 active:scale-95 text-white"
              : "bg-green-light/40 text-white/50 cursor-not-allowed"
          }`}
        >
          Keep
        </button>
        <button
          onClick={handleIgnore}
          className="flex-1 max-w-[200px] py-4 rounded-2xl bg-[#A53A3A] hover:bg-[#A53A3A]/80 active:scale-95 transition-all font-bold text-white text-base cursor-pointer"
        >
          Ignore
        </button>
      </div>
    </div>
  );
}