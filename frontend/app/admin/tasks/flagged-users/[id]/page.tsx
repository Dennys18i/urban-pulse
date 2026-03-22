"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import UserReportCard from "@/components/admin/UserReportCard";
import PortalModal from "@/components/ui/PortalModal";
import BanUserModal from "@/components/admin/BanUserModal";

// ── Mock data — înlocuiește cu fetch-uri din API ──
interface Report {
  id: string;
  reporterName: string;
  reporterAvatar: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

const mockUserData = {
  name: "Johann Strauss",
  avatar: "/profile.png",
  trustScore: 57,
  starRating: 3,
  reports: [
    {
      id: "1",
      reporterName: "Tyler Lockwood",
      reporterAvatar: "/profile.png",
      date: "15.02.2026",
      time: "7:20",
      category: "Harassment and abuse",
      description:
        "This user has been repeatedly sending me offensive messages and using abusive language towards me.",
    },
    {
      id: "2",
      reporterName: "Anabelle Bonk",
      reporterAvatar: "/profile.png",
      date: "15.02.2026",
      time: "7:20",
      category: "Spamming",
      description: "He continues to send messages out of nowhere. Every day!",
    },
    {
      id: "3",
      reporterName: "Anabelle Bonk",
      reporterAvatar: "/profile.png",
      date: "15.02.2026",
      time: "7:20",
      category: "Abuse",
      description:
        "I received messages from this user constantly and it really bothered me. I also blocked him, but please do something.",
    },
  ] as Report[],
};
// ──────────────────────────────────────────────────────────

export default function FlaggedUserDetailPage() {
  const router = useRouter();
  const [resolved, setResolved] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);

  const handleDismiss = () => {
    setShowResolveModal(false);
    setResolved(true);
    setTimeout(() => router.back(), 800);
  };

  const handleOpenBanModal = () => {
    setShowResolveModal(false);
    setShowBanModal(true);
  };

  const handleBanUser = (reason: string) => {
    setShowBanModal(false);
    setResolved(true);
    console.log("User banned. Reason:", reason);
    setTimeout(() => router.back(), 800);
  };

  const fullStars = mockUserData.starRating;
  const emptyStars = 5 - fullStars;

  return (
    <>
      <div className="w-full flex flex-col gap-6 animate-fade-up pb-20">
        {/* Header */}
        <div className="flex items-center justify-between relative">
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

          <button
            onClick={() => setShowResolveModal(true)}
            disabled={resolved}
            className={`p-3 rounded-full transition-all ${
              resolved
                ? "bg-green-500"
                : "bg-green-light hover:bg-green-600 active:scale-95"
            }`}
          >
            <Check size={24} className="text-white" strokeWidth={3} />
          </button>
        </div>

        {/* User info */}
        <section className="w-full flex justify-around items-center px-2">
          <div className="w-36 h-36 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={mockUserData.avatar}
              alt={mockUserData.name}
              width={144}
              height={144}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold font-montagu text-center leading-tight">
              {mockUserData.name.includes(" ") ? (
                <>
                  {mockUserData.name.split(" ")[0]}
                  <br />
                  {mockUserData.name.split(" ").slice(1).join(" ")}
                </>
              ) : (
                mockUserData.name
              )}
            </h1>

            <div className="flex justify-center items-center rounded-full px-3 py-1.5 h-8 bg-linear-to-b from-[#FFFADC]/50 to-[#FFF197]/50 shadow-[0px_11.3915px_22.3363px_rgba(255,227,42,0.19),inset_0px_-2px_1px_rgba(255,241,151,0.4)] backdrop-blur-[2px]">
              {Array.from({ length: fullStars }).map((_, i) => (
                <svg
                  key={`full-${i}`}
                  className="w-5 h-5 text-yellow-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L4.053 9.384c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.951-.69l1.286-3.957z" />
                </svg>
              ))}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <svg
                  key={`empty-${i}`}
                  className="w-5 h-5 text-yellow-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L4.053 9.384c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.951-.69l1.286-3.957z" />
                </svg>
              ))}
            </div>
          </div>
        </section>

        {/* Reports count */}
        <div className="flex items-center gap-2 justify-center">
          <div className="flex items-center justify-center w-7 h-7">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-emergency" />
              <path d="M2 17L12 22L22 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-emergency" />
              <path d="M2 12L12 17L22 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-emergency" />
            </svg>
          </div>
          <span className="text-red-emergency font-semibold text-base">
            Number of reports: {mockUserData.reports.length}
          </span>
        </div>

        {/* Reports list */}
        <div className="flex flex-col gap-4 mt-2">
          {mockUserData.reports.map((report) => (
            <UserReportCard
              key={report.id}
              reporterName={report.reporterName}
              reporterAvatar={report.reporterAvatar}
              date={report.date}
              time={report.time}
              category={report.category}
              description={report.description}
            />
          ))}
        </div>
      </div>

      {/* Resolve Task Modal */}
      <PortalModal
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
      >
        <div className="flex items-center justify-center py-4 border-b border-white/10">
          <h2 className="text-base font-bold text-white">Resolve task</h2>
        </div>
        <div className="flex flex-col p-5 gap-3">
          <button
            onClick={handleDismiss}
            className="w-full py-4 rounded-xl bg-green-light hover:bg-green-light/80 active:scale-95 transition-all font-bold text-white text-base cursor-pointer"
          >
            Dismiss
          </button>
          <button
            onClick={handleOpenBanModal}
            className="w-full py-4 rounded-xl bg-red-emergency hover:bg-red-emergency/80 active:scale-95 transition-all font-bold text-white text-base cursor-pointer"
          >
            Ban user
          </button>
        </div>
      </PortalModal>

      {/* Ban User Modal */}
      <BanUserModal
        isOpen={showBanModal}
        onClose={() => setShowBanModal(false)}
        onConfirm={handleBanUser}
        defaultReason="Harassment and abuse"
      />
    </>
  );
}