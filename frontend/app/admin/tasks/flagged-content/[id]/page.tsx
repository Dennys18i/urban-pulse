"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, TriangleAlert } from "lucide-react";
import EventTag from "@/components/ui/EventTag";
import UserReportCard from "@/components/admin/UserReportCard";
import PortalModal from "@/components/ui/PortalModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { EventType } from "@/types/Event";
import { Trash2 } from "lucide-react";

interface Report {
  id: string;
  reporterName: string;
  reporterAvatar: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

const mockPostData = {
  postedBy: "Carolina Gorge",
  avatar: "/profile.png",
  description:
    "A huge flood happened this morning...Let's do something now because we are blocked here",
  tag: "Emergency" as EventType,
  postedOn: "02/03/2026, 08:33",
  reports: [
    {
      id: "1",
      reporterName: "Ilia Malinin",
      reporterAvatar: "/profile.png",
      date: "05.03.2026",
      time: "7:20",
      category: "anskdfcbkvank",
      description: "Sorry, i don't know how to exit this window",
    },
  ] as Report[],
};

export default function FlaggedContentDetailPage() {
  const router = useRouter();
  const [resolved, setResolved] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDismiss = () => {
    setShowResolveModal(false);
    setResolved(true);
    setTimeout(() => router.back(), 800);
  };

  const handleOpenDeleteConfirm = () => {
    setShowResolveModal(false);
    setShowDeleteConfirm(true);
  };

  const handleDeletePost = () => {
    setShowDeleteConfirm(false);
    setResolved(true);
    // TODO: API call to delete post
    console.log("Post deleted");
    setTimeout(() => router.back(), 800);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-6 animate-fade-up pb-20">
        {/* Header — undo + Check button */}
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

        {/* ── Post detail card ── */}
        <div className="bg-secondary rounded-2xl px-6 py-5 flex flex-col gap-4">
          {/* Posted by */}
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-sm">Posted by:</span>
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={mockPostData.avatar}
                alt={mockPostData.postedBy}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-white font-semibold text-sm">
              {mockPostData.postedBy}
            </span>
          </div>

          {/* Separator */}
          <div className="h-px bg-white/20" />

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-bold text-sm">Description:</h3>
            <p className="text-white text-sm leading-relaxed">
              {mockPostData.description}
            </p>
          </div>

          {/* Separator */}
          <div className="h-px bg-white/20" />

          {/* Tag */}
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-sm">Tag:</span>
            <EventTag type={mockPostData.tag} />
          </div>

          {/* Posted on */}
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">Posted on:</span>
            <span className="text-yellow-primary font-semibold text-sm">
              {mockPostData.postedOn}
            </span>
          </div>
        </div>

        {/* ── Number of reports ── */}
        <div className="flex items-center gap-2 px-2">
          <TriangleAlert size={24} className="text-red-emergency" />
          <span className="text-red-emergency font-semibold text-base">
            Number of reports: {mockPostData.reports.length}
          </span>
        </div>

        {/* ── Reports list ── */}
        <div className="flex flex-col gap-4">
          {mockPostData.reports.map((report) => (
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

      {/* ── Resolve Task Modal ── */}
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
            onClick={handleOpenDeleteConfirm}
            className="w-full py-4 rounded-xl bg-red-emergency hover:bg-red-emergency/80 active:scale-95 transition-all font-bold text-white text-base cursor-pointer"
          >
            Delete post
          </button>
        </div>
      </PortalModal>

      {/* ── Delete Post Confirmation Modal ── */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeletePost}
        icon={<Trash2 />}
        title="Delete post"
        boldText="delete this post?"
      />
    </>
  );
}