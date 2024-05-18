"use server";

import { axios } from "@/lib/axios";
import { validateEmail } from "@/utils/validateEmail";
import { cookies } from "next/headers";

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
    await axios.post("/register", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Registered successful" };
  } catch (err) {
    console.log("Failed to register. " + err);
    return { error: true, message: "Failed to register" };
  }
}

export async function logOutAction() {
  try {
    await axios.post("/logout");
    await cookies().delete("token");
    return { success: true, message: "Signed out successful" };
  } catch (err) {
    console.log("Failed to sign in. " + err);
    return { error: true, message: "Failed to sign out" };
  }
}
