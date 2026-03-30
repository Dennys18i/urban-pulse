"use client";

import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";

export default function AdminProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar back={true} notifications={false} settings={false} />
      {children}
    </>
  );
}
