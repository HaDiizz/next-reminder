"use client";
import { BellIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-5 shadow-md static">
      <Link href="/" className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">RemindMe </h1>

        <BellIcon className="w-5 h-5 animate-shake transition-all transform text-primary" />
      </Link>
      <LoginButton />
    </nav>
  );
}
