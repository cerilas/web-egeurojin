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

export const revalidate = 300;

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
                <article
                  key={instructor.slug}
                  className="rounded-4xl border border-stone-200 bg-white p-6 shadow-lg shadow-stone-950/5"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">
                    {instructor.role}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold text-stone-900">{instructor.name}</h2>
                  {instructor.focusAreas ? (
                    <p className="mt-2 text-sm text-stone-500">{instructor.focusAreas}</p>
                  ) : null}
                  <p className="mt-4 text-base leading-7 text-stone-600">{instructor.bio}</p>
                </article>
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
