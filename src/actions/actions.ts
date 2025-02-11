"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

//export async function addTask(formData: FormData) {
//  console.log("adding task...");
//  await prisma.task.create({
//    data: {
//      title: formData.get("title") as string,
//    },
//  });
//  revalidatePath("/"); /* use to auto reload page when adding data */
//}

export async function addUser(formData: FormData) {
  console.log("adding user");
  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
    },
  });
  revalidatePath("/");
}
