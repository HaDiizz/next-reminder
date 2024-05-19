import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="h-screen pt-[4rem] md:pt-[7rem] max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between gap-x-5 p-5 items-center">
      <Image
        className="hidden md:block"
        src="/signIn.svg"
        alt="sign in picture"
        width={300}
        height={300}
        priority
      />
      <LoginForm />
    </div>
  );
};

export default Page;
