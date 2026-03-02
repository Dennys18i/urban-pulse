"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending data to ASP.NET...");

    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-100 max-w-[80%] h-full flex flex-col justify-center items-center gap-5"
    >
      <Input type="email" placeholder="Email" required />
      <Input type="password" placeholder="Password" required />

      <Button text="Log In" type="submit" />

      <p className="text-white text-center text-sm mb-8">
        You don't have an account yet?{" "}
        <Link
          href="/signup"
          className="underline decoration-white/50 underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
