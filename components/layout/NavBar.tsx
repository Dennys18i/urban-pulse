"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, MessageCircle, User } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/profile")) {
    return null;
  }

  return (
    <div className="h-[8vh] w-full bg-black fixed bottom-0 flex justify-center items-center">
      <nav className="container h-full flex justify-between items-center px-5">
        <Link href="/dashboard">
          <Home
            size={28}
            className="text-white cursor-pointer hover:scale-105 hover:text-green-light focus:text-green-light transition-all duration-200"
          />
        </Link>
        <Link href="/map">
          <Map
            size={28}
            className="text-white cursor-pointer hover:scale-105 hover:text-green-light focus:text-green-light transition-all duration-200"
          />
        </Link>
        <Link href="/chat">
          <MessageCircle
            size={28}
            className="text-white cursor-pointer hover:scale-105 hover:text-green-light focus:text-green-light transition-all duration-200"
          />
        </Link>
        <Link href="/profile">
          <User
            size={28}
            className="text-white cursor-pointer hover:scale-105 hover:text-green-light focus:text-green-light transition-all duration-200"
          />
        </Link>
      </nav>
    </div>
  );
}