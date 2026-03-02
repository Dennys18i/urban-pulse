"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending data to ASP.NET...");

    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-100 max-w-[80%] h-full flex flex-col justify-center items-center gap-5 z-10"
    >
      <Input type="text" placeholder="Full Name" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />

      <div className="flex flex-col w-full justify-center items-baseline gap-2 mt-5">
        <label htmlFor="resident-code" className="text-white text-center pl-5">
          Please enter your resident code:
        </label>
        <Input type="text" placeholder="XX-XXX-X" className="tracking-wide" />
      </div>

      <Button text="Sign Up" type="submit" />

      <p className="text-white text-center text-sm mb-8">
        You don't have an account yet?{" "}
        <Link
          href="/login"
          className="underline decoration-white/50 underline-offset-4"
        >
          Log In
        </Link>
      </p>
    </form>
  );
}
