import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center h-full">
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
  );
}
