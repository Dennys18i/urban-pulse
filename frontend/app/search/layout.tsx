import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <TopBar back={false} notifications={false} settings={false} addPost={false} />
      {children}
    </Container>
  );
}