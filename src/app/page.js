"use server";
import CreateReminder from "@/components/home/CreateReminder";
import ReminderCardLoading from "@/components/home/ReminderCardLoading";
import ReminderCards from "@/components/home/ReminderCards";
import { getReminders } from "@/lib/actions/reminders";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session ? (
        <div className="max-w-7xl mx-auto p-5">
          <div className="flex justify-end pb-5 md:pb-0 pt-8">
            <CreateReminder />
          </div>
          <h1 className="text-2xl font-bold text-green-500 pb-5">
            Active Reminders 🚀
          </h1>
          <Suspense fallback={<ReminderCardLoading />}>
            <ActiveReminders />
          </Suspense>
          <h1 className="text-2xl font-bold text-red-400 pb-5">
            Past Reminders ⌛
          </h1>
          <Suspense fallback={<ReminderCardLoading />}>
            <InactiveReminders />
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 justify-center items-center h-full md:h-[calc(100%-82px)]">
          <Image
            src="/login.svg"
            alt="login picture"
            width={300}
            height={300}
            priority
          />
          <span>
            Please{" "}
            <Link href={"/login"} className="text-primary underline">
              login
            </Link>{" "}
            to continue the features.
          </span>
        </div>
      )}
    </>
  );
}

const ActiveReminders = async () => {
  const result = await getReminders("active");
  return <ReminderCards data={result?.response?.result?.reminders} />;
};

const InactiveReminders = async () => {
  const result = await getReminders("inactive");
  return <ReminderCards data={result?.response?.result?.reminders} />;
};
