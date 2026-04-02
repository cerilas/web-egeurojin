import Link from "next/link";

import Accordion from "@/components/accordion";
import PageIllustration from "@/components/page-illustration";
import SectionHeading from "@/components/site/section-heading";
import WorkshopCard from "@/components/site/workshop-card";
import NewsletterForm from "@/components/site/newsletter-form";
import BorderGlow from "@/components/ui/border-glow";
import BlurText from "@/components/ui/blur-text";
import { siteFaqs, sitePillars, siteSocialProof, siteStats, siteTestimonials } from "@/lib/site-data";
import { getFeaturedWorkshops } from "@/lib/workshops";

export const metadata = {
  title: "Hekim Eğitimi & Klinik Workshoplar — Pelvik Taban",
  description:
    "Türkiye'nin öncü ürojinekoloji hekim eğitimi platformu. İnkontinans, prolapsus ve pelvik taban ultrasonografisinde uygulamalı klinik workshoplar — İzmir.",
  alternates: { canonical: "https://egeurojinekoloji.com" },
  openGraph: {
    title: "Ege Ürojinekoloji — Hekim Eğitimi & Klinik Workshoplar",
    description:
      "İnkontinans, prolapsus ve pelvik taban ultrasonografisinde uygulamalı klinik workshoplar.",
    url: "https://egeurojinekoloji.com",
    type: "website",
  },
};

export const revalidate = 60;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "MedicalBusiness"],
  name: "Ege Ürojinekoloji",
  url: "https://egeurojinekoloji.com",
  logo: "https://egeurojinekoloji.com/images/og-default.jpg",
  description:
    "Türkiye'nin öncü ürojinekoloji hekim eğitimi platformu. Pelvik taban bozukluklarında inkontinans, prolapsus ve ultrasonografi konularında uygulamalı klinik workshoplar.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İzmir",
    addressCountry: "TR",
  },
  sameAs: [],
  medicalSpecialty: "https://schema.org/Urology",
};

export default async function Home() {
  const workshops = await getFeaturedWorkshops();

  return (
    <div id="anasayfa" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <PageIllustration />

      <section className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 md:pb-24">
        <img
          src="/images/photos/2.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.23]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-stone-50 via-stone-50/80 to-stone-50/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-800">
              Ürojinekoloji workshopları
            </span>
            <BlurText
              as="h1"
              text="Pelvik taban bozukluklarında uygulamalı klinik eğitim."
              animateBy="words"
              direction="top"
              delay={120}
              stepDuration={0.4}
              className="mt-6 max-w-3xl [font-family:var(--font-display)] text-5xl font-semibold leading-none text-stone-900 md:text-7xl"
            />
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 md:text-xl">
              Hekimlere yönelik yoğun workshop programları; inkontinans, prolapsus ve pelvik taban ultrasonografisi başlıklarında.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/workshoplar"
                className="inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Workshopları İncele
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex rounded-full border border-stone-300 bg-white/80 px-6 py-3 text-sm font-medium text-stone-800 transition hover:border-emerald-700 hover:text-emerald-800"
              >
                Ön Kayıt Formu
              </Link>
            </div>
          </div>

          <BorderGlow
            backgroundColor="rgba(255,255,255,0.85)"
            glowColor="152 55 42"
            colors={["#6ee7b7", "#34d399", "#10b981"]}
            borderRadius={32}
            glowRadius={32}
            glowIntensity={1.3}
            className="shadow-xl shadow-stone-950/5 backdrop-blur"
          >
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                Program yaklaşımı
              </p>
              <div className="mt-6 grid gap-4">
                {siteStats.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-stone-50 px-4 py-4">
                    <p className="text-2xl font-semibold text-stone-900">{item.value}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* Sosyal Kanıt — istatistik bandı + ortak kurumlar */}
      <section className="border-y border-stone-200 bg-stone-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* İstatistikler */}
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {siteSocialProof.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="order-last mt-2 text-sm leading-6 text-stone-500">{stat.label}</dt>
                <dd className="[font-family:var(--font-display)] text-5xl font-semibold tracking-tight text-emerald-700">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Ortak kurumlar */}
          <div className="mt-12 border-t border-stone-200 pt-10">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
              Katılımcı hekimlerin temsil ettiği kurumlardan örnekler
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {siteSocialProof.partners.map((name) => (
                <span
                  key={name}
                  className="text-sm font-medium text-stone-500 transition hover:text-stone-800"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="amac" className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Amaç"
            title="Hedef, hekim pratiğinde doğrudan uygulanabilecek karar ve prosedür becerisi kazandırmaktır."
            description="Program dili; klinik karar, hasta seçimi, komplikasyon öngörüsü ve uzun dönem takip başlıklarına odaklanır."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { photo: "/images/photos/5.jpg", alt: "Cerrahi ekip" },
              { photo: "/images/photos/1.jpg", alt: "Prosedür hazırlığı" },
              { photo: "/images/photos/4.jpg", alt: "Cerrahi uygulama" },
            ].map(({ photo, alt }, i) => (
              <BorderGlow
                key={sitePillars[i].title}
                glowColor="152 55 42"
                colors={["#6ee7b7", "#34d399", "#10b981"]}
                borderRadius={32}
                glowRadius={32}
                glowIntensity={1.3}
                className="shadow-lg shadow-stone-950/5"
              >
                <div className="aspect-16/10 w-full overflow-hidden">
                  <img src={photo} alt={alt} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-stone-900">{sitePillars[i].title}</h3>
                  <p className="mt-4 text-base leading-7 text-stone-600">{sitePillars[i].description}</p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Workshoplar"
              title="Güncel workshop programı"
              description="Tarih, kontenjan ve içerik başlıkları dönemsel olarak güncellenir; her program hekimlerin günlük klinik pratiğini desteklemeyi hedefler."
            />
            <Link href="/workshoplar" className="text-sm font-semibold text-emerald-800 transition hover:text-stone-900">
              Tüm workshopları gör
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {workshops.map((workshop) => (
              <BorderGlow
                key={workshop.slug}
                glowColor="152 55 42"
                colors={["#6ee7b7", "#34d399", "#10b981"]}
                borderRadius={32}
                glowRadius={32}
                glowIntensity={1.3}
              >
                <WorkshopCard workshop={workshop} />
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section id="sss" className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Sık sorulanlar"
            title="İçerik, organizasyon ve ön kayıt süreci nasıl yürütülüyor?"
            description="Aşağıdaki başlıklar; eğitim içeriğinin kapsamını, kontenjan bilgilendirmesini ve hekim başvuru akışını özetler."
          />
          <div className="grid gap-4">
            {siteFaqs.map((item, index) => (
              <Accordion key={item.id} id={item.id} title={item.title} active={index === 0}>
                {item.content}
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Referanslar */}
      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Katılımcı görüşleri"
            title="Hekimler programdan ne kazandı?"
            description="Önceki workshop dönemlerine katılan hekimlerin klinik deneyim aktarımları."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteTestimonials.map((t) => (
              <BorderGlow
                key={t.id}
                glowColor="152 55 42"
                colors={["#6ee7b7", "#34d399", "#10b981"]}
                borderRadius={32}
                glowRadius={32}
                glowIntensity={1.3}
                className="shadow-lg shadow-stone-950/5"
              >
              <figure
                className="flex h-full flex-col justify-between p-6"
              >
                <blockquote>
                  <svg
                    className="mb-4 h-6 w-6 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Z" />
                  </svg>
                  <p className="text-base leading-7 text-stone-600">{t.quote}</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-stone-100 pt-5">
                  <p className="font-semibold text-stone-900">{t.name}</p>
                  <p className="mt-0.5 text-sm text-emerald-800">{t.title}</p>
                  <p className="mt-0.5 text-sm text-stone-400">{t.hospital}</p>
                </figcaption>
              </figure>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* E-posta bülteni */}
      <section className="px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-800">
            <svg
              className="h-3.5 w-3.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Workshop bülteni
          </span>
          <h2 className="mt-5 [font-family:var(--font-display)] text-3xl font-semibold text-stone-900 md:text-4xl">
            Yeni workshoplardan ilk siz haberdar olun.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-500">
            E-posta adresinizi bırakın; yeni program tarihleri, kontenjan açılışları ve kayıt duyuruları size iletilsin.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
          <p className="mt-4 text-xs text-stone-400">Yalnızca workshop duyuruları gönderilir. İstediğiniz zaman aboneliğinizi iptal edebilirsiniz.</p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-stone-900 px-6 py-10 text-stone-50 md:px-10 md:py-12">
          <img
            src="/images/photos/3.jpg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.33]"
          />
          <div className="pointer-events-none absolute inset-0 bg-stone-900/70" aria-hidden="true" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">Ön kayıt</p>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h2 className="[font-family:var(--font-display)] text-3xl font-semibold md:text-5xl">
                  Programa katılım için iletişim formu üzerinden ön kayıt bırakabilirsiniz.
                </h2>
                <p className="mt-4 text-base leading-7 text-stone-300 md:text-lg">
                  Uygun workshop tarihi, kontenjan durumu ve katılım koşulları tarafınıza hekim iletişim bilgileri üzerinden iletilir.
                </p>
              </div>
              <Link
                href="/iletisim"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-emerald-100"
              >
                Ön Kayıt Bırak
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

