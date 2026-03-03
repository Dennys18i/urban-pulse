import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="h-[8vh] w-full bg-black absolute bottom-0">
      <nav className="w-full h-full flex justify-around items-center p-4">
        <Link href="/dashboard">
          <Image
            src="/icons/home_icon.png"
            width={42}
            height={37}
            alt="home_icon"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          ></Image>
        </Link>
        <Link href="/dashboard/map">
          <Image
            src="/icons/map_icon.png"
            width={51}
            height={37}
            alt="map_icon"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          ></Image>
        </Link>
        <Link href="/dashboard/chat">
          <Image
            src="/icons/message_icon.png"
            width={51}
            height={37}
            alt="message_icon"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          ></Image>
        </Link>
        <Link href="/dashboard/profile">
          <Image
            src="/icons/profile_icon.png"
            width={59}
            height={43}
            alt="profile_icon"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          ></Image>
        </Link>
      </nav>
    </div>
  );
}
