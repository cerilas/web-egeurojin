import PageHero from "@/components/site/page-hero";
import SectionHeading from "@/components/site/section-heading";

export const metadata = {
  title: "Hakkımızda — Ege Ürojinekoloji Eğitim Programı",
  description:
    "Ege Ürojinekoloji; pelvik taban bozukluklarında kanıt temelli, uygulamalı hekim eğitimi veren Türkiye'nin öncü klinik workshop organizasyonudur.",
  alternates: { canonical: "https://egeurojinekoloji.com/hakkimizda" },
  openGraph: {
    title: "Hakkımızda | Ege Ürojinekoloji",
    description:
      "Pelvik taban bozukluklarında kanıt temelli, uygulamalı hekim eğitimi.",
    url: "https://egeurojinekoloji.com/hakkimizda",
    type: "website",
  },
};

const values = [
  {
    title: "Pratik beceri odaklı",
    description:
      "Teorik bilgi; görüntüleme, simülasyon ve prosedür adımlarıyla birlikte ele alınır.",
  },
  {
    title: "Kanıt temelli",
    description:
      "Kılavuzlar, klinik çalışmalar ve gerçek karar noktaları tek anlatı içinde birleştirilir.",
  },
  {
    title: "Dayanışma üretir",
    description:
      "Program, yalnızca eğitim vermeyi değil; meslektaşlar arası güvenli iletişim ağı kurmayı da hedefler.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Ege Ürojin, Prof. Dr. hekim eğitimi odağında pelvik taban pratiğini güncel ve uygulanabilir hale getirmek için tasarlandı."
        description="Amaç; kadın hastalıkları ve doğum pratiğinde pelvik taban bozukluklarının tanı ve tedavisini yalnızca anlatmak değil, günlük klinik uygulamaya dönüştürmektir."
      />

      <section className="px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Program felsefesi"
            title="Doğru hastaya, doğru tedaviyi, doğru teknikle uygulayabilmek için içerik ve pratik aynı masada olmalı."
          />
          <div className="space-y-6 text-base leading-8 text-stone-600">
            <p>
              Workshop programı; üriner inkontinans, pelvik organ prolapsusu, aşırı aktif
              mesane, pelvik taban ultrasonografisi ve cerrahi teknikler başlıklarında
              dönemsel olarak planlanır. Her dönem, seçili bir klinik soruna odaklanır.
            </p>
            <p>
              Bu sayfa; program duyuruları, workshop takvimi, eğitmen bilgisi ve ön kayıt
              iletişimini tek çatı altında toplar. Hedef kitle yalnızca hekimlerdir ve
              içerik dili klinik karar süreçlerine göre hazırlanır.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <article
                key={item.title}
                className="rounded-4xl border border-stone-200 bg-white p-6 shadow-lg shadow-stone-950/5"
              >
                <h2 className="text-xl font-semibold text-stone-900">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-stone-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
