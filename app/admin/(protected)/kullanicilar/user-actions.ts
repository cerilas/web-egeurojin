"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hashSync } from "bcryptjs";
import { prisma } from "@/lib/db";

export async function createUserAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string } | never> {
  const email = (formData.get("email") as string ?? "").trim().toLowerCase();
  const name = (formData.get("name") as string ?? "").trim();
  const password = (formData.get("password") as string ?? "").trim();

  if (!email || !name || !password) {
    return { error: "Tüm alanlar zorunludur." };
  }
  if (password.length < 8) {
    return { error: "Şifre en az 8 karakter olmalıdır." };
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return { error: "Bu e-posta adresiyle zaten bir kullanıcı var." };
  }

  await prisma.adminUser.create({
    data: { email, name, passwordHash: hashSync(password, 12) },
  });

  revalidatePath("/admin/kullanicilar");
  redirect("/admin/kullanicilar");
}

export async function toggleUserActiveAction(id: string, active: boolean) {
  await prisma.adminUser.update({ where: { id }, data: { active } });
  revalidatePath("/admin/kullanicilar");
}

export async function deleteUserAction(id: string) {
  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/kullanicilar");
}
