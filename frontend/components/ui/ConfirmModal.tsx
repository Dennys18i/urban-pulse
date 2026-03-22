"use client";

import { ReactNode } from "react";
import PortalModal from "@/components/ui/PortalModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** Iconița din header (ex: <LogOut />, <Trash2 />) */
  icon: ReactNode;
  /** Titlul afișat lângă icon (ex: "Log out", "Delete account") */
  title: string;
  /** Textul bold+underline din întrebare (ex: "log out?", "delete your account?") */
  boldText: string;
  /** Label buton confirmare */
  confirmLabel?: string;
  /** Label buton anulare */
  cancelLabel?: string;
  /** Arată loading pe butonul de confirm */
  loading?: boolean;
  /** Conținut suplimentar între header și întrebare (ex: input Reason) */
  children?: ReactNode;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  icon,
  title,
  boldText,
  confirmLabel = "YES",
  cancelLabel = "NO",
  loading = false,
  children,
}: ConfirmModalProps) {
  return (
    <PortalModal isOpen={isOpen} onClose={onClose}>
      {/* Header — icon + titlu red-emergency */}
      <div className="flex items-center justify-center gap-2 py-4">
        <span className="text-red-emergency [&>svg]:size-5 [&>svg]:stroke-[2]">
          {icon}
        </span>
        <h2 className="text-base font-bold text-red-emergency">{title}</h2>
      </div>

      {/* Separator */}
      <div className="h-px bg-white/10 mx-5" />

      {/* Body */}
      <div className="px-5 py-5 flex flex-col gap-4">
        {/* Conținut suplimentar (ex: Reason input la BanUser) */}
        {children}

        {/* Întrebarea de confirmare */}
        <p className="text-white text-sm leading-relaxed text-center">
          Are you sure you want to{" "}
          <span className="font-bold underline">{boldText}</span>
        </p>

        {/* Butoane YES / NO */}
        <div className="flex items-center justify-center mb-8 w-[80%] rounded-xl overflow-hidden h-10 mx-auto">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 h-full font-bold text-white bg-[#383838] cursor-pointer hover:bg-[#383838]/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : confirmLabel}
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-full font-bold text-white bg-red-emergency cursor-pointer hover:bg-red-emergency/80 transition-colors duration-200"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </PortalModal>
  );
}