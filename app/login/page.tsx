import LoginForm from "@/components/LoginForm";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-green-dark flex justify-center items-center font-montaga relative">
      <div className="container h-full flex flex-col justify-center items-center z-20">
        <h1 className="font-slab text-5xl text-center text-white mb-10 text-shadow-sm text-shadow-white/10">
          Urban Pulse
        </h1>

        <LoginForm />
      </div>
      <Image
        src="/login_design.png"
        alt="design"
        width={500}
        height={10}
        className="absolute w-[200vw] h-[40vh] bottom-0 z-10 pointer-events-none"
      />
    </div>
  );
}
