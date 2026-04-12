import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";
import GoBackButton from "@/components/ui/GoBackButton";
import ProfileRoundButton from "@/components/ui/ProfileRoundButton";
import AiGuardianFab from "@/components/post/AiGuardianFab";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function PetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      {/* Mobile header */}
      <div className="flex lg:hidden items-center justify-between mb-6">
        <GoBackButton />
        <div className="flex items-center gap-3">
          <ProfileRoundButton route="/pets/ai-guardian">
            <Sparkles size={22} className="text-white" />
          </ProfileRoundButton>
          <ProfileRoundButton route="/notifications">
            <Image src="/notifications.svg" alt="notifications" width={40} height={25} />
          </ProfileRoundButton>
        </div>
      </div>

      {/* Desktop TopBar */}
      <div className="hidden lg:block">
        <TopBar back={false} notifications={true} settings={false} />
      </div>

      <AiGuardianFab />

      {children}
    </Container>
  );
}
