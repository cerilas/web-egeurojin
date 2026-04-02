"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function saveInstructorAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string } | never> {
  const id = formData.get("id") as string | null;

  const data = {
    slug: (formData.get("slug") as string).trim(),
    name: (formData.get("name") as string).trim(),
    role: (formData.get("role") as string).trim(),
    email: (formData.get("email") as string)?.trim() || null,
    institution: (formData.get("institution") as string)?.trim() || null,
    bio: (formData.get("bio") as string).trim(),
    focusAreas: (formData.get("focusAreas") as string)?.trim() || null,
    imageUrl: (formData.get("imageUrl") as string)?.trim() || null,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    active: formData.get("active") === "on",
  };

  if (!data.slug || !data.name || !data.role) {
    return { error: "Slug, isim ve ünvan zorunludur." };
  }

  if (id) {
    await prisma.instructor.update({ where: { id }, data });
  } else {
    await prisma.instructor.create({ data });
  }

  revalidatePath("/admin/egitmenler");
  revalidatePath("/ekip-egitmenler");
  revalidatePath("/workshoplar", "layout");
  revalidatePath("/", "layout");
  redirect("/admin/egitmenler");
}

export async function deleteInstructorAction(id: string) {
  await prisma.instructor.delete({ where: { id } });
  revalidatePath("/admin/egitmenler");
  revalidatePath("/ekip-egitmenler");
  revalidatePath("/workshoplar", "layout");
  revalidatePath("/", "layout");
  redirect("/admin/egitmenler");
}
