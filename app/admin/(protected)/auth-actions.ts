"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";

export async function loginAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const email = (formData.get("email") as string ?? "").trim().toLowerCase();
  const password = (formData.get("password") as string ?? "").trim();

  if (!email || !password) {
    return { error: "E-posta ve şifre zorunludur." };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user || !user.active) {
    return { error: "E-posta veya şifre hatalı." };
  }

  const valid = await compare(password, user.passwordHash);
  if (!valid) {
    return { error: "E-posta veya şifre hatalı." };
  }

  await createSession({ userId: user.id, email: user.email, name: user.name });
  redirect("/admin");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/giris");
}
