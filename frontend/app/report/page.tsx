"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GoBackButton from "@/components/ui/GoBackButton";

const API = "http://localhost:5248";

export default function ReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleReport = async () => {
    if (!details.trim() || !eventId) return;
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId: parseInt(eventId), details }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
    setTimeout(() => router.back(), 1500);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-background px-6 pt-6 pb-10">
      <div className="flex items-center justify-between mb-10">
        <GoBackButton />
        <h1 className="text-lg font-bold font-montagu text-white">Report</h1>
        <div className="w-10" />
      </div>

      {submitted ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center">
          <span className="text-4xl"></span>
          <p className="text-white font-semibold">Report submitted!</p>
          <p className="text-white/40 text-sm">Thank you for keeping the community safe.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex flex-col gap-2">
            <p className="text-white/60 text-sm">
              Please describe why you're reporting this post. Your report will be reviewed by our team
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Add details about the issue..."
              rows={6}
              className="w-full bg-[#1C1C1C] border border-white/10 rounded-2xl p-4 text-white text-sm placeholder:text-white/30 outline-none resize-none focus:border-red-500/50 transition-colors"
            />
            <span className="text-white/20 text-xs text-right">{details.length}/500</span>
          </div>

          {error && (
            <div className="py-3 px-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            onClick={handleReport}
            disabled={!details.trim() || loading}
            className="w-full py-4 rounded-2xl bg-red-500/90 text-white font-bold text-sm hover:bg-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-auto"
          >
            {loading ? "Submitting..." : "Report Post"}
          </button>
        </div>
      )}
    </div>
  );
}