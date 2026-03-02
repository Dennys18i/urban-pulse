import SignupForm from "@/components/SignupForm";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignupPage() {
  const onSignUp = () => {
    redirect("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-green-dark flex justify-center items-center font-montaga relative">
      <div className="container h-full flex flex-col justify-center items-center">
        <h5 className="text-xl text-center text-white mb-10 font-slab tracking-wide">
          Join our community now!
        </h5>
        <SignupForm />
        <Image
          src="/login_design.png"
          alt="design"
          width={500}
          height={0}
          className="absolute w-[200vw] h-[40vh] bottom-0 -z-10"
        />
      </div>
    </div>
  );
}
