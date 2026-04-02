import { prisma } from "@/lib/db";
import {
  fallbackInstructors,
  fallbackWorkshops,
  type InstructorSummary,
  type WorkshopSummary,
} from "@/lib/site-data";

type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
};

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

function normalizeWorkshop(workshop: {
  slug: string;
  title: string;
  teaser: string;
  shortDescription: string;
  overview: string;
  agenda: string;
  learningOutcomes: string;
  audience: string;
  location: string;
  venue: string;
  startDate: Date;
  endDate: Date | null;
  registrationUrl: string;
  capacity: number | null;
  priceNote: string | null;
  heroLabel: string | null;
  coverImageUrl: string | null;
  gallery: string[];
  mapEmbedUrl: string | null;
  mapAddress: string | null;
  instructors?: Array<{
    role: string | null;
    instructor: {
      slug: string;
      name: string;
      role: string;
      bio: string;
      focusAreas: string | null;
      imageUrl: string | null;
    };
  }>;
}): WorkshopSummary {
  return {
    slug: workshop.slug,
    title: workshop.title,
    teaser: workshop.teaser,
    shortDescription: workshop.shortDescription,
    overview: workshop.overview,
    agenda: workshop.agenda,
    learningOutcomes: workshop.learningOutcomes,
    audience: workshop.audience,
    location: workshop.location,
    venue: workshop.venue,
    startDate: workshop.startDate.toISOString(),
    endDate: workshop.endDate?.toISOString(),
    registrationUrl: workshop.registrationUrl,
    capacity: workshop.capacity ?? undefined,
    priceNote: workshop.priceNote ?? undefined,
    heroLabel: workshop.heroLabel ?? undefined,
    coverImageUrl: workshop.coverImageUrl ?? undefined,
    gallery: workshop.gallery,
    mapEmbedUrl: workshop.mapEmbedUrl ?? undefined,
    mapAddress: workshop.mapAddress ?? undefined,
    instructors:
      workshop.instructors?.map(({ role, instructor }) => ({
        slug: instructor.slug,
        name: instructor.name,
        role: role ?? instructor.role,
        bio: instructor.bio,
        focusAreas: instructor.focusAreas ?? undefined,
        imageUrl: instructor.imageUrl ?? undefined,
      })) ?? [],
  };
}

export async function getWorkshops() {
  if (!hasDatabaseUrl()) {
    return fallbackWorkshops;
  }

  try {
    const workshops = await prisma.workshop.findMany({
      where: { published: true },
      orderBy: { startDate: "asc" },
      include: {
        instructors: {
          orderBy: { sortOrder: "asc" },
          include: { instructor: true },
        },
      },
    });

    if (!workshops.length) {
      return fallbackWorkshops;
    }

    return workshops.map(normalizeWorkshop);
  } catch {
    return fallbackWorkshops;
  }
}

export async function getFeaturedWorkshops(limit = 3) {
  const workshops = await getWorkshops();
  return workshops.slice(0, limit);
}

export async function getWorkshopBySlug(slug: string) {
  if (!hasDatabaseUrl()) {
    return fallbackWorkshops.find((workshop) => workshop.slug === slug) ?? null;
  }

  try {
    const workshop = await prisma.workshop.findUnique({
      where: { slug },
      include: {
        instructors: {
          orderBy: { sortOrder: "asc" },
          include: { instructor: true },
        },
      },
    });

    return workshop ? normalizeWorkshop(workshop) : null;
  } catch {
    return fallbackWorkshops.find((entry) => entry.slug === slug) ?? null;
  }
}

export async function getInstructors(): Promise<InstructorSummary[]> {
  if (!hasDatabaseUrl()) {
    return fallbackInstructors;
  }

  try {
    const instructors = await prisma.instructor.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });

    return instructors.map((instructor) => ({
      slug: instructor.slug,
      name: instructor.name,
      role: instructor.role,
      bio: instructor.bio,
      focusAreas: instructor.focusAreas ?? undefined,
      imageUrl: instructor.imageUrl ?? undefined,
    }));
  } catch {
    return fallbackInstructors;
  }
}

export async function saveContactMessage(input: ContactInput) {
  if (!hasDatabaseUrl()) {
    return { stored: false };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        organization: input.organization,
        message: input.message,
      },
    });

    return { stored: true };
  } catch {
    return { stored: false };
  }
}

export async function saveNewsletterSubscriber(email: string) {
  if (!hasDatabaseUrl()) {
    return { stored: false, duplicate: false };
  }

  try {
    await prisma.newsletterSubscriber.create({ data: { email } });
    return { stored: true, duplicate: false };
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "P2002"
    ) {
      return { stored: false, duplicate: true };
    }
    return { stored: false, duplicate: false };
  }
}
