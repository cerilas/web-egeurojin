import Link from "next/link";
import PageHero from "@/components/site/page-hero";
import { getInstructors } from "@/lib/workshops";

export const metadata = {
  title: "Ekip & Eğitmenler — Ürojinekoloji Uzmanları",
  description:
    "Ege Ürojinekoloji workshop programlarında görev alan eğitmen kadrosu; klinik odak alanları ve deneyimleri ile tanıtılmaktadır.",
  alternates: { canonical: "https://egeurojinekoloji.com/ekip-egitmenler" },
  openGraph: {
    title: "Ekip & Eğitmenler | Ege Ürojinekoloji",
    description:
      "Pelvik taban bozukluklarında uzman eğitmen kadrosu.",
    url: "https://egeurojinekoloji.com/ekip-egitmenler",
    type: "website",
  },
};

export const revalidate = 60;

export default async function TeamPage() {
  const instructors = await getInstructors();

  return (
    <>
      <PageHero
        eyebrow="Ekip & Eğitmenler"
        title="Eğitmen kadrosu, dönemsel workshop programına göre bu sayfada duyurulur."
        description="Klinik odak alanlarına göre görev alan eğitmenler, ilgili workshop detaylarıyla birlikte paylaşılır."
      />

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {instructors.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {instructors.map((instructor) => (
                <Link
                  key={instructor.slug}
                  href={`/egitmenler/${instructor.slug}`}
                  className="block rounded-4xl border border-stone-200 bg-white p-6 shadow-lg shadow-stone-950/5 transition hover:border-emerald-200 hover:shadow-emerald-100/50"
                >
                  <div className="flex items-center gap-4">
                    {instructor.imageUrl ? (
                      <img
                        src={instructor.imageUrl}
                        alt={instructor.name}
                        className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-stone-200"
                      />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-stone-200 ring-2 ring-stone-100">
                        <svg className="h-8 w-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">
                        {instructor.role}
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-stone-900">{instructor.name}</h2>
                      {instructor.institution && (
                        <p className="mt-0.5 text-sm text-stone-500">{instructor.institution}</p>
                      )}
                    </div>
                  </div>
                  {instructor.focusAreas ? (
                    <p className="mt-3 text-sm text-stone-500">{instructor.focusAreas}</p>
                  ) : null}
                  <p className="mt-3 text-base leading-7 text-stone-600 line-clamp-3">{instructor.bio}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-4xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center shadow-lg shadow-stone-950/5">
              <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-stone-900">
                Eğitmen kadrosu bu alana eklenecek.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600">
                Kadro netleştikçe isim, rol, biyografi ve yer aldıkları workshoplar bu
                alanda güncellenecektir.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
