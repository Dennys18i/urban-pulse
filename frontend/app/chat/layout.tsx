import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";
import GoBackButton from "@/components/ui/GoBackButton";
import { MessageCircle } from "lucide-react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      {/* Mobile header */}
      <div className="flex lg:hidden items-center justify-between mb-6">
        <GoBackButton />
        <div className="flex items-center gap-2">
          <MessageCircle size={20} fill="white" className="text-white" />
          <h1 className="text-white font-bold text-xl">Messages</h1>
        </div>
        <div className="w-12" />
      </div>

      {/* Desktop TopBar */}
      <div className="hidden lg:block">
        <TopBar back={false} notifications={true} settings={false} />
      </div>

      {children}
    </Container>
  );
}
