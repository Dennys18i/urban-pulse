"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/dashboard/EventFilters";
import { Event, EventType } from "@/types/Event";
import { EVENT_TAG_STYLES } from "@/lib/constants";
import SearchBar from "@/components/search/SearchBar";
import ThreeColumnLayout from "@/components/layout/ThreeColumnLayout";

// ── Types ──
type TabType = "Posts" | "People";

interface UserResult {
  id: number;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

// ── Helpers ──
function getInitials(name: string) {
  return (
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "UP"
  );
}

function emailToName(email: string) {
  const local = email.split("@")[0] ?? "";
  return local
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const typeMap: Record<number, EventType> = {
  0: "General",
  1: "Emergency",
  2: "Skill",
  3: "Lend",
};

// ── Custom hook: debounce ──
function useDebounce(value: string, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchPage() {
  const router = useRouter();

  // ── State ──
  const [activeTab, setActiveTab] = useState<TabType>("Posts");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Posts (all events — used for both tabs)
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Admin
  const [isAdmin, setIsAdmin] = useState(false);

  // ── Fetch user role ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5248/api/User/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.role === "Admin" || data.isAdmin === true);
      })
      .catch(() => {});
  }, []);

  // ── Fetch posts ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingPosts(true);

    // Folosim /api/event/search daca exista, altfel /api/event
    const url = debouncedQuery.trim()
      ? `http://localhost:5248/api/event/search?query=${encodeURIComponent(debouncedQuery.trim())}`
      : "http://localhost:5248/api/event";

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: Event[]) => setAllEvents(data))
      .catch(() => setAllEvents([]))
      .finally(() => setLoadingPosts(false));
  }, [debouncedQuery]);

  // ── Posts: filtrare pe tag + limita 10 ──
  const filteredEvents = useMemo(() => {
    const byTag =
      activeFilter === "ALL"
        ? allEvents
        : allEvents.filter((e) => {
            const mappedType =
              typeof e.type === "number"
                ? typeMap[e.type]
                : (e.type as EventType);
            return EVENT_TAG_STYLES[mappedType]?.title === activeFilter;
          });
    return byTag.slice(0, 10);
  }, [allEvents, activeFilter]);

  // ── People: extrage useri unici din events ──
  const users: UserResult[] = useMemo(() => {
    const map = new Map<number, UserResult>();

    for (const event of allEvents) {
      if (!map.has(event.createdByUserId)) {
        map.set(event.createdByUserId, {
          id: event.createdByUserId,
          email: event.createdByEmail,
          fullName: emailToName(event.createdByEmail),
        });
      }
    }

    let list = Array.from(map.values());

    // Filtrare locala pe query
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (u) =>
          u.email.toLowerCase().includes(q) ||
          (u.fullName?.toLowerCase().includes(q) ?? false),
      );
    }

    return list.slice(0, 10);
  }, [allEvents, debouncedQuery]);

  // ── Admin: view insights ──
  const handleViewInsights = useCallback(
    (eventId: number) => {
      router.push(`/admin/tasks/flagged-content/${eventId}`);
    },
    [router],
  );

  return (
    <ThreeColumnLayout>
      <div className="w-full flex flex-col gap-4 animate-fade-up pb-32 lg:pb-0">
        {/* ── Search bar ── */}
        <SearchBar value={query} onChange={setQuery} placeholder="Search..." />

        {/* ── Tabs ── */}
        <div className="flex w-full border-b border-white/10">
          {(["Posts", "People"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-2 text-center transition-all cursor-pointer ${
                activeTab === tab
                  ? "text-white border-b-2 border-white font-bold"
                  : "text-white/40 border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── POSTS TAB ── */}
        {activeTab === "Posts" && (
          <>
            <EventFilters
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            <div className="flex flex-col gap-2">
              {loadingPosts && (
                <p className="text-white/40 text-sm text-center mt-10">
                  Searching posts...
                </p>
              )}

              {!loadingPosts && filteredEvents.length === 0 && (
                <p className="text-white/40 text-sm text-center mt-10">
                  {query.trim()
                    ? "No posts found for this search."
                    : "No posts available."}
                </p>
              )}

              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  {...(isAdmin && {
                    onViewInsights: handleViewInsights,
                    flagCount: 0,
                  })}
                />
              ))}
            </div>
          </>
        )}

        {/* ── PEOPLE TAB ── */}
        {activeTab === "People" && (
          <div className="flex flex-col gap-1">
            {loadingPosts && (
              <p className="text-white/40 text-sm text-center mt-10">
                Searching people...
              </p>
            )}

            {!loadingPosts && users.length === 0 && (
              <p className="text-white/40 text-sm text-center mt-10">
                {query.trim()
                  ? "No people found for this search."
                  : "No users available."}
              </p>
            )}

            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => router.push(`/profile/${user.id}`)}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                {/* Avatar */}
                <div className="relative w-14 h-14 shrink-0">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.fullName ?? user.email}
                      width={56}
                      height={56}
                      className="rounded-full object-cover w-14 h-14"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-white/60 text-sm font-bold">
                        {getInitials(user.fullName ?? user.email)}
                      </span>
                    </div>
                  )}
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-background" />
                  )}
                </div>

                <span className="text-white font-semibold text-base truncate">
                  {user.fullName ?? user.email.split("@")[0]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </ThreeColumnLayout>
  );
}