"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { BannedUser } from "@/types/BannedUser";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface BannedUserCardProps {
  user: BannedUser;
  onUnban: (id: string) => void;
}

export default function BannedUserCard({ user, onUnban }: BannedUserCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmUnban = () => {
    onUnban(user.id);
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full bg-secondary rounded-[20] p-5 flex flex-col gap-3">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar}
            alt={user.name}
            width={52}
            height={52}
            className="rounded-full object-cover"
          />
          <span className="text-xl">{user.name}</span>
        </div>

        {/* Banned on */}
        <p className="font-bold">
          Banned on:{" "}
          <span className="text-red-emergency font-normal">{user.bannedOn}</span>
        </p>

        {/* Reason */}
        <p className="font-bold">
          Reason:{" "}
          <span className="text-red-emergency font-bold">{user.reason}</span>
        </p>

        {/* Unban button */}
        <div className="flex justify-center mt-1">
          <button
            onClick={() => setShowModal(true)}
            className="w-40 bg-red-emergency hover:bg-red-emergency/80 text-white font-bold px-12 py-2.5 rounded-full transition-all active:scale-95 cursor-pointer"
          >
            Unban
          </button>
        </div>
      </div>

      {/* Unban Confirmation Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmUnban}
        icon={<Trash2 />}
        title="Unban user"
        boldText={`unban ${user.name}`}
      />
    </>
  );
}