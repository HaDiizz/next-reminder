"use client";
import { BellIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav
      className={`w-full flex items-center ${
        session ? "justify-end" : "justify-between"
      } md:justify-between px-10 py-5 shadow-md absolute`}
    >
      <Link href="/" className={`${session && "hidden md:block"}`}>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">RemindMe </h1>
          <BellIcon className="w-5 h-5 animate-shake transition-all transform text-primary" />
        </div>
      </Link>
      {session ? <ProfileMenu session={session} /> : <LoginButton />}
    </nav>
  );
}
