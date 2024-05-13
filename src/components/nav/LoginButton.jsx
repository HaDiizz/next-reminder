"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/login")}
      className="bg-primary"
      variant="filled"
      color="orange"
      size="md"
      radius="md"
    >
      Login
    </Button>
  );
};

export default LoginButton;
