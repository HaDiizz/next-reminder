"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { axios } from "@/lib/axios";
import { validateEmail } from "@/utils/validateEmail";

export async function registerAction(data) {
  const { email, username, password, confirmPassword } = data;

  try {
    if (!email || !username || !password || !confirmPassword) {
      throw new Error("Fields are required.");
    }
    if (password !== confirmPassword) {
      throw new Error("Password does not match.");
    }
    if (!validateEmail(email)) {
      throw new Error("Email invalid.");
    }
    const response = await axios.post("/register", data);
    console.log(response.data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Registered successful" };
  } catch (err) {
    console.log("Failed to register. " + err);
    return { error: true, message: "Failed to register" };
  }
}

export async function loginAction(data) {
  const { username, password } = data;

  try {
    if (!username || !password) {
      throw new Error("Fields are required.");
    }

    const response = await axios.post("/login", data);
    console.log(response.data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Signed in successful" };
  } catch (err) {
    console.log("Failed to sign up. " + err);
    return { error: true, message: "Failed to sign up" };
  }
}
