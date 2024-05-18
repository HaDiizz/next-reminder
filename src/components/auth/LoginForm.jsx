"use client";
import { loginFormSchema } from "@/lib/zodSchema";
import { Button, TextInput, PasswordInput } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    const response = await signIn("credentials", {
      callbackUrl: "/",
      redirect: false,
      username: data.username,
      password: data.password,
    });
    if (response?.error) {
      notifications.show({
        title: "Oops! Something went wrong! 👻",
        message: "Failed to sign in.",
        color: "red",
      });
      return;
    }
    if (response?.ok) {
      notifications.show({
        title: "Welcome to incredible platform! 👋",
        message: "Signed in successful",
        color: "green",
      });
      return router.refresh();
    }
  };

  return (
    <div className="shadow-md border-2 border-opacity-70 border-secondary rounded-lg w-full md:w-8/12 lg:w-5/12 xl:w-5/12 p-8">
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        <div className="flex gap-x-1 text-xl">
          <span>Sign in to our</span>
          <span className="text-primary font-bold">RemindMe</span>
        </div>
        <TextInput
          {...register("username")}
          variant="filled"
          size="md"
          radius="md"
          placeholder="Username"
          error={errors?.username?.message}
        />
        <PasswordInput
          {...register("password")}
          variant="filled"
          size="md"
          radius="md"
          placeholder="Password"
          error={errors?.password?.message}
        />
        <Button
          loading={isSubmitting}
          type="submit"
          className="bg-primary"
          variant="filled"
          color="orange"
          size="md"
          radius="md"
        >
          Sign in
        </Button>
        <span className="block">
          Don't have an account?{" "}
          <Link className="text-primary underline" href={"/register"}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
