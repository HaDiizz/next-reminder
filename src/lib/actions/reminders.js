"use server";

import { revalidatePath } from "next/cache";
import { axios } from "@/lib/axios";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createReminder(data) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      throw new Error("Unauthorized.");
    }
    const { title, description, remindAt } = data;
    if (!title || !description || !remindAt) {
      throw new Error("Fields are required.");
    }
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token");
    if (!tokenCookie.value) {
      throw new Error("Invalid token.");
    }
    await axios.post("/reminders/create", data, {
      headers: { Authorization: `Bearer ${tokenCookie.value}` },
    });
    revalidatePath("/");
    return { success: true, message: "Created reminder successful 👏" };
  } catch (err) {
    console.log("Failed to create reminder. " + err);
    return { error: true, message: "Failed to create reminder 🥺" };
  }
}

export async function getReminders(tab) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      throw new Error("Unauthorized.");
    }

    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token");
    if (!tokenCookie.value) {
      throw new Error("Invalid token.");
    }
    const response = await axios.get(`/reminders?tab=${tab}`, {
      headers: { Authorization: `Bearer ${tokenCookie.value}` },
    });
    revalidatePath("/");
    return { success: true, response: response.data };
  } catch (err) {
    console.log("Failed to get reminders. " + err);
    return { error: true, message: "Failed to get reminders 🥺" };
  }
}

export async function deleteReminder(id) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      throw new Error("Unauthorized.");
    }

    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token");
    if (!tokenCookie.value) {
      throw new Error("Invalid token.");
    }
    if (!id) {
      throw new Error("Invalid reminder id.");
    }
    await axios.delete(`/reminders/delete/${id}`, {
      headers: { Authorization: `Bearer ${tokenCookie.value}` },
    });
    revalidatePath("/");
    return { success: true, message: "Deleted successful. 👍" };
  } catch (err) {
    console.log("Failed to delete reminders. " + err);
    return { error: true, message: "Failed to delete reminder 🥺" };
  }
}
