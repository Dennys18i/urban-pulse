"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const tasks = [
  {
    id: "flagged-users",
    title: "Flagged users",
    subtitle: "10 users",
    href: "/admin/tasks/flagged-users",
    bgColor: "bg-[#A53A3A]",
    textColor: "text-white",
    subtitleColor: "text-white/70",
    chevronColor: "text-white/50",
  },
  {
    id: "flagged-content",
    title: "Flagged content",
    subtitle: "3 posts",
    href: "/admin/tasks/flagged-content",
    bgColor: "bg-[#C8D8E8]",
    textColor: "text-[#1a1a1a]",
    subtitleColor: "text-[#1a1a1a]/60",
    chevronColor: "text-[#1a1a1a]/40",
  },
  {
    id: "merge-duplicates",
    title: "Merge duplicates",
    subtitle: "4 tasks",
    href: "/admin/tasks/merge-duplicates",
    bgColor: "bg-yellow-primary",
    textColor: "text-[#1a1a1a]",
    subtitleColor: "text-[#1a1a1a]/60",
    chevronColor: "text-[#1a1a1a]/40",
  },
];

export default function AdminTasksPage() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center relative">
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

        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <h1 className="text-white font-bold text-xl">Tasks</h1>
          <span className="w-2.5 h-2.5 rounded-full bg-[#C0392B]" />
        </div>
      </div>

      {/* Task cards */}
      <div className="flex flex-col gap-6 mt-2">
        {tasks.map((task) => (
          <Link key={task.id} href={task.href}>
            <div
              className={`${task.bgColor} w-full rounded-2xl p-6 flex items-center justify-between transition-transform active:scale-[0.98] cursor-pointer min-h-32.5`}
            >
              <div className="flex flex-col gap-1.5">
                <h2 className={`${task.textColor} font-bold text-2xl`}>
                  {task.title}
                </h2>
                <p className={`${task.subtitleColor} text-base`}>
                  {task.subtitle}
                </p>
              </div>

              <ChevronRight
                size={36}
                className={task.chevronColor}
                strokeWidth={2.5}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}