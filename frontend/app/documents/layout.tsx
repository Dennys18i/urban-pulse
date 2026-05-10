import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";
import GoBackButton from "@/components/ui/GoBackButton";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      {/* Mobile header */}
      <div className="flex lg:hidden items-center relative mb-6">
        <GoBackButton />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white font-bold text-xl font-montagu">Documents</h1>
        </div>
      </div>

      {/* Desktop TopBar */}
      <div className="hidden lg:block">
        <TopBar back={true} notifications={true} settings={false} />
      </div>

      {children}
    </Container>
  );
}
