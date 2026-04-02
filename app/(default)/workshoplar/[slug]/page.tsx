import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import InstructorCard from "@/components/site/instructor-card";
import PageHero from "@/components/site/page-hero";
import WorkshopCoverImage from "@/components/site/workshop-cover-image";
import WorkshopGallery from "@/components/site/workshop-gallery";
import { formatDateRange, splitLines } from "@/lib/format";
import { getAbsoluteImageUrl } from "@/lib/image-url";
import { getWorkshopBySlug, getWorkshops } from "@/lib/workshops";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const workshops = await getWorkshops();
  return workshops.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const workshop = await getWorkshopBySlug(slug);

  if (!workshop) {
    return { title: "Workshop bulunamadı" };
  }

  const url = `https://egeurojinekoloji.com/workshoplar/${slug}`;
  const ogImage = workshop.coverImageUrl
    ? {
        url: getAbsoluteImageUrl(workshop.coverImageUrl, "https://egeurojinekoloji.com"),
        width: 1200,
        height: 630,
        alt: workshop.title,
      }
    : { url: "/images/og-default.jpg", width: 1200, height: 630, alt: workshop.title };

  return {
    title: `${workshop.title} — ${workshop.location} Ürojinekoloji Workshopu`,
    description: workshop.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      title: workshop.title,
      description: workshop.shortDescription,
      url,
      type: "article",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: workshop.title,
      description: workshop.shortDescription,
      images: [ogImage.url],
    },
  };
}

export const revalidate = 300;

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const workshop = await getWorkshopBySlug(slug);

  if (!workshop) {
    notFound();
  }

  const isPast = new Date(workshop.endDate ?? workshop.startDate) < new Date();

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: workshop.title,
    description: workshop.shortDescription,
    startDate: workshop.startDate,
    endDate: workshop.endDate ?? workshop.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: workshop.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: workshop.location,
        addressCountry: "TR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Ege Ürojinekoloji",
      url: "https://egeurojinekoloji.com",
    },
    image: workshop.coverImageUrl
      ? getAbsoluteImageUrl(workshop.coverImageUrl, "https://egeurojinekoloji.com")
      : "https://egeurojinekoloji.com/images/og-default.jpg",
    url: `https://egeurojinekoloji.com/workshoplar/${slug}`,
    ...(workshop.capacity ? { maximumAttendeeCapacity: workshop.capacity } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <PageHero
        eyebrow={workshop.heroLabel ?? "Workshop detayı"}
        title={workshop.title}
        description={workshop.shortDescription}
      />

      {/* Cover image */}
      {workshop.coverImageUrl ? (
        <div className="px-4 pb-6 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <WorkshopCoverImage
              src={workshop.coverImageUrl}
              alt={`${workshop.title} kapak fotoğrafı`}
            />
          </div>
        </div>
      ) : null}

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.6fr]">
          <div className="space-y-8">
            <article className="rounded-4xl border border-stone-200 bg-white p-7 shadow-lg shadow-stone-950/5">
              <h2 className="text-2xl font-semibold text-stone-900">Genel Bakış</h2>
              <p className="mt-4 text-base leading-8 text-stone-600">{workshop.overview}</p>
            </article>

            <article className="rounded-4xl border border-stone-200 bg-white p-7 shadow-lg shadow-stone-950/5">
              <h2 className="text-2xl font-semibold text-stone-900">Öğrenme Çıktıları</h2>
              <ul className="mt-5 grid gap-3 text-base leading-7 text-stone-600">
                {splitLines(workshop.learningOutcomes).map((item) => (
                  <li key={item} className="rounded-2xl bg-stone-50 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-4xl border border-stone-200 bg-white p-7 shadow-lg shadow-stone-950/5">
              <h2 className="text-2xl font-semibold text-stone-900">Program Akışı</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-stone-600">
                {splitLines(workshop.agenda).map((item, index) => (
                  <li key={item} className="flex gap-4 rounded-2xl bg-stone-50 px-4 py-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-4xl border border-stone-200 bg-white p-7 shadow-lg shadow-stone-950/5">
              <h2 className="text-2xl font-semibold text-stone-900">Kimler İçin?</h2>
              <p className="mt-4 text-base leading-8 text-stone-600">{workshop.audience}</p>
            </article>

            {/* Photo Gallery */}
            {workshop.gallery && workshop.gallery.length > 0 ? (
              <WorkshopGallery images={workshop.gallery} />
            ) : null}

            {/* Map */}
            {(workshop.mapEmbedUrl ?? workshop.mapAddress) ? (
              <article className="rounded-4xl border border-stone-200 bg-white p-7 shadow-lg shadow-stone-950/5">
                <h2 className="text-2xl font-semibold text-stone-900">Konum</h2>
                {workshop.mapAddress ? (
                  <p className="mt-3 flex items-start gap-2 text-base text-stone-600">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    {workshop.mapAddress}
                  </p>
                ) : null}
                {workshop.mapEmbedUrl ? (
                  <div className="mt-5 overflow-hidden rounded-2xl">
                    <iframe
                      src={workshop.mapEmbedUrl}
                      width="100%"
                      height="320"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${workshop.venue} harita konumu`}
                      className="block"
                    />
                  </div>
                ) : null}
              </article>
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-lg shadow-stone-950/5">
              <h2 className="text-xl font-semibold text-stone-900">Hızlı Bilgiler</h2>
              <dl className="mt-5 grid gap-4 text-sm text-stone-600">
                <div>
                  <dt className="font-semibold text-stone-900">Tarih</dt>
                  <dd className="mt-1">{formatDateRange(workshop.startDate, workshop.endDate)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-stone-900">Şehir</dt>
                  <dd className="mt-1">{workshop.location}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-stone-900">Mekan</dt>
                  <dd className="mt-1">{workshop.venue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-stone-900">Kontenjan</dt>
                  <dd className="mt-1">{workshop.capacity ? `${workshop.capacity} kişi` : "Yakında duyurulacak"}</dd>
                </div>
              </dl>
              {workshop.priceNote ? (
                <p className="mt-5 rounded-2xl bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-600">
                  {workshop.priceNote}
                </p>
              ) : null}
              {isPast ? (
                <span className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-stone-200 px-5 py-3 text-sm font-medium text-stone-500">
                  Bu workshop tamamlanmıştır
                </span>
              ) : (
                <Link
                  href={workshop.registrationUrl}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
                >
                  Ön Kayıt İçin İletişime Geç
                </Link>
              )}
            </div>

            {/* Instructor Roster */}
            <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-lg shadow-stone-950/5">
              <h2 className="text-xl font-semibold text-stone-900">Eğitmen Kadrosu</h2>
              {workshop.instructors.length ? (
                <ul className="mt-5 space-y-5">
                  {workshop.instructors.map((instructor) => (
                    <InstructorCard key={instructor.slug} instructor={instructor} />
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-stone-600">
                  Eğitmen kadrosu duyuru takvimine göre bu alanda güncellenecektir.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
