import MainPageImage from "../dashboard/MainPageImage";
import NavBar from "./NavBar";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background w-screen flex justify-center pb-[8vh] lg:pb-0 overflow-x-hidden relative lg:h-screen lg:overflow-hidden">
      <MainPageImage />
      <div className="container bg-background text-foreground font-inter flex justify-center lg:flex-col px-6 py-6 lg:pt-0 lg:h-full lg:overflow-hidden">
        <div className="w-full animate-fade-up lg:flex-1 lg:flex lg:flex-col lg:overflow-hidden lg:min-h-0">
          {children}
        </div>
      </div>
      <NavBar />
    </div>
  );
}