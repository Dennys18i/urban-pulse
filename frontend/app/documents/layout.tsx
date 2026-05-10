import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      {/* Desktop TopBar */}
      <div className="hidden lg:block">
        <TopBar back={true} notifications={true} settings={false} />
      </div>

      {children}
    </Container>
  );
}
