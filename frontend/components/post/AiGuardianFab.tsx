"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function AiGuardianFab() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <Link
      href="/pets/ai-guardian"
      className="hidden lg:flex fixed bottom-8 right-8 z-50 items-center gap-3 px-5 py-3 rounded-full bg-[#2D2A4A] border border-white/10 text-white font-bold shadow-lg hover:bg-[#3A3660] transition-colors cursor-pointer"
    >
      <div className="w-8 h-8 rounded-full bg-[#4B4580] flex items-center justify-center shrink-0">
        <Sparkles size={16} className="text-white" />
      </div>
      <span className="text-base">AI Guardian</span>
    </Link>,
    document.body
  );
}
