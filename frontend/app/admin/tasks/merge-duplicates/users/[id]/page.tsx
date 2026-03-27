"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BadgeCheck, Check } from "lucide-react";

// ── Types ──
interface DuplicateUserAccount {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  trustScore: number;
}

const mockMatchCriteria = ["name", "photo", "phone"];

const mockDuplicateAccounts: DuplicateUserAccount[] = [
  {
    id: "1a",
    name: "Johnny Depp",
    avatar: "/profile.png",
    isVerified: true,
    trustScore: 74,
  },
  {
    id: "1b",
    name: "Johnny Depp",
    avatar: "/profile.png",
    isVerified: false,
    trustScore: 0,
  },
];

export default function ReviewDuplicateUsersPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleKeep = () => {
    if (!selectedId) return;
    console.log("Keep account:", selectedId);
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
        <h2 className="text-yellow-primary font-bold text-xl">Matches:</h2>
        <p className="text-white font-bold text-2xl">
          {mockMatchCriteria.join(", ")}
        </p>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-yellow-primary/60" />

      {/* Instruction */}
      <div className="flex flex-col gap-2">
        <p className="text-white text-base">
          Select which account is{" "}
          <span className="text-[#E8837C] font-bold">permanent</span>:
        </p>
        <p className="text-white/40 text-sm">
          *The other one/ones will be deleted
        </p>
      </div>

      {/* User account cards */}
      <div className="flex flex-col gap-5">
        {mockDuplicateAccounts.map((account) => {
          const isSelected = selectedId === account.id;

          return (
            <button
              key={account.id}
              onClick={() => setSelectedId(account.id)}
              className={`w-full bg-[#1e1e1e] border-2 rounded-2xl p-5 flex flex-col gap-4 transition-all cursor-pointer text-left ${
                isSelected
                  ? "border-yellow-primary shadow-[0_0_15px_rgba(245,214,61,0.2)]"
                  : "border-yellow-primary/60"
              }`}
            >
              {/* Top: avatar + name + verified + checkbox */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-white overflow-hidden flex-shrink-0">
                    <Image
                      src={account.avatar}
                      alt={account.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name + Verified */}
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-semibold text-lg">
                      {account.name}
                    </span>
                    {account.isVerified && (
                      <div className="flex items-center gap-1.5">
                        <BadgeCheck
                          size={20}
                          className="text-green-light fill-green-light"
                        />
                        <span className="text-green-light font-bold text-sm">
                          Verified Neighbour
                        </span>
                      </div>
                    )}
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
                    <Check size={18} className="text-[#1a1a1a]" strokeWidth={3} />
                  )}
                </div>
              </div>

              {/* Trust score */}
              <p className="text-[#E8837C] font-bold text-lg">
                Trust score: {account.trustScore}%
              </p>
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