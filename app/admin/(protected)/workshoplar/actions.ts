"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

function toDateOrNull(val: string | null | undefined): Date | null {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

function toGalleryArray(val: FormDataEntryValue | null) {
  if (typeof val !== "string") return [];

  return val
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function saveWorkshopAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string } | never> {
  const id = formData.get("id") as string | null;

  const data = {
    slug: (formData.get("slug") as string).trim(),
    title: (formData.get("title") as string).trim(),
    teaser: (formData.get("teaser") as string).trim(),
    shortDescription: (formData.get("shortDescription") as string).trim(),
    overview: (formData.get("overview") as string).trim(),
    agenda: (formData.get("agenda") as string).trim(),
    learningOutcomes: (formData.get("learningOutcomes") as string).trim(),
    audience: (formData.get("audience") as string).trim(),
    location: (formData.get("location") as string).trim(),
    venue: (formData.get("venue") as string).trim(),
    startDate: toDateOrNull(formData.get("startDate") as string) ?? new Date(),
    endDate: toDateOrNull(formData.get("endDate") as string),
    registrationUrl: (formData.get("registrationUrl") as string).trim(),
    capacity: formData.get("capacity") ? Number(formData.get("capacity")) : null,
    priceNote: (formData.get("priceNote") as string)?.trim() || null,
    heroLabel: (formData.get("heroLabel") as string)?.trim() || null,
    coverImageUrl: (formData.get("coverImageUrl") as string)?.trim() || null,
    gallery: toGalleryArray(formData.get("gallery")),
    mapEmbedUrl: (formData.get("mapEmbedUrl") as string)?.trim() || null,
    mapAddress: (formData.get("mapAddress") as string)?.trim() || null,
    published: formData.get("published") === "on",
  };

  if (!data.slug || !data.title) {
    return { error: "Slug ve başlık zorunludur." };
  }

  const instructorIds = formData.getAll("instructorIds") as string[];

  if (id) {
    await prisma.workshop.update({ where: { id }, data });
    // Update instructor relationships
    await prisma.workshopInstructor.deleteMany({ where: { workshopId: id } });
    if (instructorIds.length) {
      await prisma.workshopInstructor.createMany({
        data: instructorIds.map((instructorId, index) => ({
          workshopId: id,
          instructorId,
          sortOrder: index,
        })),
      });
    }
  } else {
    const created = await prisma.workshop.create({ data });
    if (instructorIds.length) {
      await prisma.workshopInstructor.createMany({
        data: instructorIds.map((instructorId, index) => ({
          workshopId: created.id,
          instructorId,
          sortOrder: index,
        })),
      });
    }
  }

  revalidatePath("/admin/workshoplar");
  revalidatePath("/workshoplar", "layout");
  revalidatePath("/", "layout");
  redirect("/admin/workshoplar");
}

export async function deleteWorkshopAction(id: string) {
  await prisma.workshop.delete({ where: { id } });
  revalidatePath("/admin/workshoplar");
  revalidatePath("/workshoplar", "layout");
  revalidatePath("/", "layout");
  redirect("/admin/workshoplar");
}
