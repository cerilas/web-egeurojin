import PageHero from "@/components/site/page-hero";
import WorkshopCard from "@/components/site/workshop-card";
import { getWorkshops } from "@/lib/workshops";

export const metadata = {
  title: "Ürojinekoloji Workshopları — Pelvik Taban Hekim Eğitimi",
  description:
    "Pelvik taban ultrasonografisi, üriner inkontinans, MUS cerrahisi ve aşırı aktif mesane konularında İzmir'de düzenlenen yoğun hekim eğitimi workshopları.",
  alternates: { canonical: "https://egeurojinekoloji.com/workshoplar" },
  openGraph: {
    title: "Ürojinekoloji Workshopları | Ege Ürojinekoloji",
    description:
      "Pelvik taban bozukluklarında uygulamalı klinik hekim eğitimi programları.",
    url: "https://egeurojinekoloji.com/workshoplar",
    type: "website",
  },
};

export const revalidate = 60;

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <>
      <PageHero
        eyebrow="Workshoplar"
        title="Her workshop, belirli bir klinik probleme odaklanan yoğun bir hekim eğitim oturumu olarak planlanır."
        description="Tarih, kontenjan, içerik başlıkları ve katılım koşulları bu sayfada düzenli olarak duyurulur."
      />

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.slug} workshop={workshop} />
          ))}
        </div>
      </section>
    </>
  );
}
