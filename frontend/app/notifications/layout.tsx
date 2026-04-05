import Container from "@/components/layout/Container";

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  );
}