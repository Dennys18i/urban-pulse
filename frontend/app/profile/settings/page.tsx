"use client";

import { useEffect, useState } from "react";
import ProfileSettingsLink from "@/components/profile/ProfileSettingsLink";
import { ChevronRight, LogOut, Trash2, Satellite } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function Settings() {
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5248/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setDisplayName(data.fullName ?? data.email?.split("@")[0] ?? "User");
        setRole(data.role ?? "User");
      });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5248/api/user", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      router.push("/");
    } catch {
      setDeleting(false);
    }
  };

  const nameParts = displayName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");
  const isAdmin = role === "Admin";

  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-6 animate-fade-up">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/profile.png"
              width={186}
              height={175}
              alt="profile_picture"
            />
          </div>
          <h1 className="text-2xl font-montagu font-bold text-center leading-[1.15]">
            {lastName ? (
              <>
                {firstName}
                <br />
                {lastName}
              </>
            ) : (
              firstName
            )}
          </h1>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 mb-10">
          <ProfileSettingsLink text="edit" />
          <ProfileSettingsLink text="myposts" />
          <ProfileSettingsLink text="personal" />
          <ProfileSettingsLink text="security" />
          <ProfileSettingsLink text="saved" />
          <ProfileSettingsLink text="preferences" />
        </div>

        <div className="w-full h-px bg-[#383838] my-2 -mb-1"></div>

        <div className="w-full flex flex-col justify-center items-center gap-3 mb-10">
          {isAdmin && (
            <Link href="/admin" className="w-full">
              <button className="w-full h-14 bg-secondary rounded-full px-5 flex justify-between items-center cursor-pointer">
                <div className="flex justify-center items-center gap-4">
                  <Satellite className="size-7 text-green-light" strokeWidth={2} />
                  <span className="text-xl font-bold text-green-light">
                    Admin Panel
                  </span>
                </div>
                <ChevronRight className="size-7 text-green-light font-bold" />
              </button>
            </Link>
          )}

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full h-14 bg-secondary rounded-full px-5 flex justify-between items-center cursor-pointer"
          >
            <div className="flex justify-center items-center gap-4">
              <LogOut className="size-7 text-red-emergency" strokeWidth={2} />
              <span className="text-xl font-bold text-red-emergency">
                Log Out
              </span>
            </div>
            <ChevronRight className="size-7 text-red-emergency font-bold" />
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full h-14 bg-secondary rounded-full px-5 flex justify-between items-center cursor-pointer"
          >
            <div className="flex justify-center items-center gap-4">
              <Trash2 className="size-7 text-red-emergency" strokeWidth={2} />
              <span className="text-xl font-bold text-red-emergency">
                Delete Account
              </span>
            </div>
            <ChevronRight className="size-7 text-red-emergency font-bold" />
          </button>
        </div>
      </div>

      {/* Logout */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogOut}
        icon={<LogOut />}
        title="Log out"
        boldText="log out?"
      />

      {/* Delete Account */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
        icon={<Trash2 />}
        title="Delete account"
        boldText="delete your account?"
        loading={deleting}
      />
    </>
  );
}