"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

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
