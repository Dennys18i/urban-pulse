"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import DonutChart from "@/components/admin/DonutChart";
import StatBar from "@/components/admin/StatBar";
import OverviewCard from "@/components/admin/OverviewCard";

// ── Mock data — înlocuiește cu fetch-uri reale din API ──
const mockStats = {
  flaggedUsers: 10,
  flaggedContent: 3,
  mergeDuplicates: 4,
  totalTasks: 26,
  flaggedUsersPercent: 35,
  flaggedContentPercent: 45,
  resolvedPercent: 20,
};

const dailyOverview = {
  newUsers: 32,
  posts: 100,
  flaggedPosts: 3,
  flaggedUsers: 1,
};

const generalActivities = {
  posts: 1009,
  users: 78,
  unverifiedUsers: 34,
  verifiedUsers: 44,
};
// ──────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const donutSegments = [
    { value: mockStats.flaggedUsersPercent, color: "#C0392B" },
    { value: mockStats.flaggedContentPercent, color: "#F5D63D" },
    { value: mockStats.resolvedPercent, color: "#4ade80" },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-up">
      <div className="h-[calc(15vh-24px)]" />

      {/* Title */}
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-white font-montagu font-bold text-2xl">
          UrbanPulse
        </h1>
        <span className="w-2.5 h-2.5 rounded-full bg-green-light" />
      </div>

      {/* Event button — wide, bluish */}
      <div className="flex justify-center">
        <button className="w-full bg-weather-nice rounded-2xl px-6 py-3.5 flex items-center justify-between transition-transform active:scale-[0.97] cursor-pointer">
          <span className="text-white font-semibold text-base">Event</span>
          <Plus size={22} className="text-white" />
        </button>
      </div>

      {/* Donut chart */}
      <div className="flex justify-center py-2">
        <DonutChart
          segments={donutSegments}
          centerText={`${mockStats.totalTasks} Tasks`}
          size={220}
          strokeWidth={32}
        />
      </div>

      {/* Percentage stats row */}
      <div className="flex justify-between px-4">
        <StatBar
          label={"Flagged\nusers"}
          value={`${mockStats.flaggedUsersPercent}%`}
          color="#C0392B"
          progress={mockStats.flaggedUsersPercent}
        />
        <StatBar
          label={"Flagged\ncontent"}
          value={`${mockStats.flaggedContentPercent}%`}
          color="#F5D63D"
          progress={mockStats.flaggedContentPercent}
        />
        <StatBar
          label={"Resolved\ntasks"}
          value={`${mockStats.resolvedPercent}%`}
          color="#4ade80"
          progress={mockStats.resolvedPercent}
        />
      </div>

      {/* Resolve button */}
      <div className="flex justify-center py-2">
        <Link href="/admin/tasks">
          <button className="bg-red-emergency hover:bg-red-emergency/90 text-white font-bold text-base px-12 py-3.5 rounded-2xl transition-all active:scale-95 cursor-pointer shadow-lg shadow-red-emergency/20">
            Resolve
          </button>
        </Link>
      </div>

      {/* Daily App Overview */}
      <OverviewCard
        title="Daily App Overview"
        stats={[
          { bold: String(dailyOverview.newUsers), text: "new users" },
          { bold: String(dailyOverview.posts), text: "posts" },
          { bold: String(dailyOverview.flaggedPosts), text: "flagged posts" },
          { bold: String(dailyOverview.flaggedUsers), text: "flagged user" },
        ]}
      />

      {/* General Activities */}
      <OverviewCard
        title="General Activities"
        stats={[
          { bold: String(generalActivities.posts), text: "posts" },
          { bold: String(generalActivities.users), text: "users" },
          { bold: String(generalActivities.unverifiedUsers), text: "unverified users" },
          { bold: String(generalActivities.verifiedUsers), text: "verified users" },
        ]}
      />

      {/* Bottom spacing */}
      <div className="h-4" />
    </div>
  );
}