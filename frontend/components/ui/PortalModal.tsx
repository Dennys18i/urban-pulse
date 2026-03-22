"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function PortalModal({
  isOpen,
  onClose,
  children,
}: PortalModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center px-6 z-50"
      onClick={onClose}
    >
      <div
        className="bg-secondary w-full rounded-2xl overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}