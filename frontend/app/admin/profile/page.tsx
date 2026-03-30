"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import CrownIcon from "@/components/icons/profile/CrownIcon";

// ── Mock data — înlocuiește cu fetch-uri din API ──
const mockAdminStats = {
  tasksDone: 79,
  flaggedUsers: 12,
  flaggedContent: 54,
  duplicates: 13,
};
// ──────────────────────────────────────────────────────────

export default function AdminProfilePage() {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5248/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setDisplayName(data.fullName ?? data.email?.split("@")[0] ?? "User");
      });
  }, []);

  const nameParts = displayName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-up">
      {/* User info section — reuses layout pattern from /profile */}
      <section className="w-full flex justify-around items-center mt-4">
        {/* Avatar */}
        <div className="flex flex-col gap-4">
          <div className="size-35 rounded-full overflow-hidden">
            <Image
              src="/profile.png"
              alt={displayName}
              width={140}
              height={140}
              className="object-cover w-full h-full"
            />
          </div>
          {/* User mode toggle */}
          <div className="flex">
            <Link href="/profile">
              <button className="flex items-center gap-2 bg-secondary rounded-full px-5 py-2.5 transition-transform active:scale-95 cursor-pointer">
                <ArrowLeftRight size={20} className="text-white" />
                <span className="text-white text-sm font-medium">
                  User mode
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Name + Admin badge */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold font-montagu text-center leading-tight">
            {lastName ? (
              <>
                {firstName}
                <br />
                {lastName}
              </>
            ) : (
              firstName
            )}
          </h1>

          {/* Admin badge */}
          <div className="flex justify-center items-center gap-1">
            <CrownIcon />
            <span className="text-green-light font-montagu text-lg tracking-wider">
              Admin
            </span>
          </div>
        </div>
      </section>

      {/* Tasks done card */}
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <section className="w-full h-25 border-2 border-green-light rounded-2xl flex items-center py-2 shadow-sm bg-[#1C1C1C]">
          <div className="flex-1 flex flex-col items-center justify-center gap-1">
            <h3 className="text-lg font-bold text-center">
              Tasks <br /> done
            </h3>
          </div>
          <div className="w-0.5 self-stretch my-3 bg-white"></div>
          <div className="flex-1 flex flex-col items-center justify-center gap-1">
            <p className="text-green-light text-3xl font-bold">79</p>
          </div>
        </section>
        <section className="w-full border-2 border-green-light rounded-2xl flex flex-col justify-center gap-3 p-6 shadow-sm bg-[#1C1C1C]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-emergency" />
            <span className="text-white text-base font-bold">
              Flagged users:{" "}
              <span className="text-red-emergency font-bold">
                {mockAdminStats.flaggedUsers}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue" />
            <span className="text-white text-base font-bold">
              Flagged content:{" "}
              <span className="text-blue font-bold">
                {mockAdminStats.flaggedContent}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-yellow-primary" />
            <span className="text-white text-base font-bold">
              Duplicates:{" "}
              <span className="text-yellow-primary font-bold">
                {mockAdminStats.duplicates}
              </span>
            </span>
          </div>
        </section>
      </div>

      {/* Bottom illustration */}
      <div className="flex justify-center mt-4 mb-8">
        <Image
          src="/admin-profile.svg"
          alt="Admin illustration"
          width={243}
          height={208}
        />
      </div>
    </div>
  );
}
