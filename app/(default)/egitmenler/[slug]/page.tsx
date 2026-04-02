import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/site/page-hero";
import { getInstructorBySlug, getInstructors } from "@/lib/workshops";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const instructors = await getInstructors();
  return instructors.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  if (!instructor) {
    return { title: "Eğitmen bulunamadı" };
  }

  return {
    title: `${instructor.name} — ${instructor.role} | Ege Ürojinekoloji`,
    description: instructor.bio.slice(0, 160),
    alternates: { canonical: `https://egeurojinekoloji.com/egitmenler/${slug}` },
    openGraph: {
      title: `${instructor.name} — ${instructor.role}`,
      description: instructor.bio.slice(0, 160),
      url: `https://egeurojinekoloji.com/egitmenler/${slug}`,
      type: "profile",
    },
  };
}

export const revalidate = 60;

export default async function InstructorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  if (!instructor) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Eğitmen Profili"
        title={instructor.name}
        description={instructor.role}
      />

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-4xl border border-stone-200 bg-white p-8 shadow-lg shadow-stone-950/5">
            <div className="flex flex-col items-start gap-6 sm:flex-row">
              {instructor.imageUrl ? (
                <img
                  src={instructor.imageUrl}
                  alt={instructor.name}
                  className="h-32 w-32 shrink-0 rounded-full object-cover ring-4 ring-stone-200"
                />
              ) : (
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-stone-200 ring-4 ring-stone-100">
                  <svg
                    className="h-16 w-16 text-stone-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              )}
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold text-stone-900">{instructor.name}</h2>
                <p className="mt-1 text-lg text-emerald-800">{instructor.role}</p>
                {instructor.institution && (
                  <p className="mt-1 text-sm text-stone-500">{instructor.institution}</p>
                )}
                {instructor.email && (
                  <a
                    href={`mailto:${instructor.email}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-900"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    {instructor.email}
                  </a>
                )}
              </div>
            </div>

            {instructor.focusAreas && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                  Uzmanlık Alanları
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {instructor.focusAreas.split(",").map((area) => (
                    <span
                      key={area.trim()}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800"
                    >
                      {area.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                Biyografi
              </h3>
              <p className="mt-2 text-base leading-8 text-stone-600">{instructor.bio}</p>
            </div>

            {instructor.workshopSlugs.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                  Workshoplar
                </h3>
                <ul className="mt-3 space-y-2">
                  {instructor.workshopSlugs.map((ws) => (
                    <li key={ws.slug}>
                      <Link
                        href={`/workshoplar/${ws.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        {ws.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/ekip-egitmenler"
              className="text-sm font-medium text-stone-500 hover:text-stone-800"
            >
              ← Tüm Eğitmenler
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
