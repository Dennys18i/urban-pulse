"use client";

import { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/Event";
import Image from "next/image";

const FILTERS = ["GENERAL", "EMERGENCY", "SKILL", "LEND"];

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [scrolledRight, setScrolledRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5248/api/event", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5248/hubs/events")
      .withAutomaticReconnect()
      .build();

    connection.on("NewEvent", (newEvent: Event) => {
      setEvents((prev) => [newEvent, ...prev]);
    });

    connection.start().catch(console.error);

    return () => { connection.stop(); };
  }, []);

  const filteredEvents = activeFilter === "ALL"
    ? events
    : events.filter((e) => {
        const typeMap: Record<number, string> = { 0: "GENERAL", 1: "EMERGENCY", 2: "SKILL", 3: "LEND" };
        const typeName = typeof e.type === "number" ? typeMap[e.type] : e.type.toUpperCase();
        return typeName === activeFilter;
      });

  return (
    <div className="w-full pb-[8vh]">
      {/* Widget */}
      <div className="px-4 pt-4 pb-2 flex flex-col items-center gap-4">

        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="font-serif text-white text-2xl font-medium">UrbanPulse</span>
          <span className="w-2 h-2 rounded-full bg-green-400 mb-1" />
        </div>

        {/* Cards row */}
        <div className="flex gap-3 w-full">
          <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-4">
            <p className="text-white/50 text-xs font-medium mb-1">Event</p>
            <p className="text-white text-sm font-semibold">Game Night</p>
          </div>
          <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-4 flex items-center justify-between">
            <div>
              <p className="text-white text-lg font-bold">21° C</p>
              <p className="text-white/50 text-xs">Sunny</p>
            </div>
            <span className="text-3xl">🌤️</span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory"
            onScroll={(e) => {
              const el = e.currentTarget;
              setScrolledRight(el.scrollLeft > 50);
            }}
            style={{ scrollbarWidth: "none" }}
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter === activeFilter ? "ALL" : filter)}
                className="shrink-0 py-3 rounded-2xl text-xs font-bold bg-[#facc15] text-black snap-start"
                style={{ width: "calc(33.333% - 6px)" }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Fade dreapta */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 -mt-2">
          <div className={`h-1.5 rounded-full transition-all ${!scrolledRight ? "w-4 bg-white/60" : "w-1.5 bg-white/20"}`} />
          <div className={`h-1.5 rounded-full transition-all ${scrolledRight ? "w-4 bg-white/60" : "w-1.5 bg-white/20"}`} />
        </div>

      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4 mt-2">
        {loading && (
          <p className="text-white/40 text-sm text-center mt-10">Loading...</p>
        )}

        {!loading && filteredEvents.length === 0 && (
          <p className="text-white/40 text-sm text-center mt-10">
            No events yet.
          </p>
        )}

        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}