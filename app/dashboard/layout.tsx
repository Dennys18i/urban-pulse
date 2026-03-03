import NavBar from "@/components/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white w-screen h-screen">
      <div className="container h-full relative">
        {children}
        <NavBar />
      </div>
    </div>
  );
}
