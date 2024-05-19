import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/components/auth/RegisterForm";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="h-screen pt-[7rem] md:pt-[3rem] max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between gap-x-5 p-5 items-center pb-5">
      <Image
        className="hidden md:block"
        src="/signUp.svg"
        alt="sign in picture"
        width={300}
        height={300}
        priority
      />
      <RegisterForm />
    </div>
  );
};

export default Page;
