import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

const Page = () => {
  return (
    <div className="h-full flex flex-col md:flex-row justify-center md:justify-between gap-x-5 p-5 items-center">
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
