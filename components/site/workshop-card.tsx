import Link from "next/link";

import { formatDateRange } from "@/lib/format";
import { getDisplayImageSrc } from "@/lib/image-url";
import type { WorkshopSummary } from "@/lib/site-data";

type WorkshopCardProps = {
  workshop: WorkshopSummary;
};

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-stone-200/80 bg-white/90 shadow-lg shadow-stone-950/5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300">
      {workshop.coverImageUrl ? (
        <div className="aspect-16/10 w-full overflow-hidden bg-stone-100">
          <img
            src={getDisplayImageSrc(workshop.coverImageUrl)}
            alt={`${workshop.title} kapak görseli`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {workshop.heroLabel ? (
              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {workshop.heroLabel}
              </span>
            ) : null}
            <h3 className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-stone-900">
              {workshop.title}
            </h3>
          </div>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
            {workshop.location}
          </span>
        </div>

        <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          {workshop.teaser}
        </p>
        <p className="mt-4 text-base leading-7 text-stone-600">{workshop.shortDescription}</p>

        <dl className="mt-6 grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="font-semibold text-stone-900">Tarih</dt>
            <dd className="mt-1">{formatDateRange(workshop.startDate, workshop.endDate)}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="font-semibold text-stone-900">Mekan</dt>
            <dd className="mt-1">{workshop.venue}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between gap-4 pt-4">
          <span className="text-sm text-stone-500">
            {workshop.capacity ? `${workshop.capacity} kişilik kontenjan` : "Kontenjan duyurulacaktır"}
          </span>
          <Link
            href={`/workshoplar/${workshop.slug}`}
            className="inline-flex rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            Detayı Gör
          </Link>
        </div>
      </div>
    </article>
  );
}
