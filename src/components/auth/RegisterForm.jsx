"use client";
import { registerFormSchema } from "@/lib/zodSchema";
import { Button, TextInput, PasswordInput } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerAction } from "@/lib/actions/auth";
import { notifications } from "@mantine/notifications";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data) => {
    const response = await registerAction(data);
    if (response.success) {
      notifications.show({
        title: "Congratulation! 🎉",
        message: response.message,
        color: "green",
      });
      return;
    }
    if (response.error) {
      notifications.show({
        title: "Oops! Something went wrong! 👻",
        message: response.message,
        color: "red",
      });
      return;
    }
  };
  return (
    <div className="shadow-md border-2 border-opacity-70 border-secondary rounded-lg w-full md:w-8/12 lg:w-5/12 xl:w-5/12 p-8">
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
        <div className="flex gap-x-1 text-xl">
          <span>Sign up to our</span>
          <span className="text-primary font-bold">RemindMe</span>
        </div>
        <TextInput
          {...register("email")}
          variant="filled"
          size="md"
          radius="md"
          placeholder="Email"
          error={errors?.email?.message}
        />
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
        <PasswordInput
          {...register("confirmPassword")}
          variant="filled"
          size="md"
          radius="md"
          placeholder="Confirm Password"
          error={errors?.confirmPassword?.message}
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
          Sign up
        </Button>
        <span className="block">
          Have an account already?{" "}
          <Link className="text-primary underline" href={"/login"}>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterForm;
