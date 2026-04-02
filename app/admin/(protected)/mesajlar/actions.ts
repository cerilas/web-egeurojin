"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function markMessageAsRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { status: "READ" },
  });
  revalidatePath("/admin/mesajlar");
}
