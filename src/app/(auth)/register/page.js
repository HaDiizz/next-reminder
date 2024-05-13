import RegisterForm from "@/components/auth/RegisterForm";
import Image from "next/image";

const Page = () => {
  return (
    <div className="h-full flex flex-col md:flex-row justify-center md:justify-between gap-x-5 p-5 items-center pb-5">
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
