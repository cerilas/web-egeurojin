"use client";

import { useActionState, useTransition } from "react";
import { saveWorkshopAction, deleteWorkshopAction } from "./actions";

type WorkshopFormProps = {
  workshop?: {
    id: string;
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
    published: boolean;
  };
};

function toDateInput(d: Date | null | undefined) {
  if (!d) return "";
  return d.toISOString().slice(0, 10);
}

function toGalleryInput(images: string[] | null | undefined) {
  return images?.join("\n") ?? "";
}

export default function WorkshopForm({ workshop }: WorkshopFormProps) {
  const [state, formAction, isPending] = useActionState(saveWorkshopAction, null);
  const [isDeleting, startDelete] = useTransition();

  function handleDelete() {
    if (!workshop) return;
    if (!confirm(`"${workshop.title}" workshopunu silmek istediğinize emin misiniz?`))
      return;
    startDelete(() => deleteWorkshopAction(workshop.id));
  }

  return (
    <form action={formAction} className="space-y-8">
      {workshop && <input type="hidden" name="id" value={workshop.id} />}

      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {/* Temel Bilgiler */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
          Temel Bilgiler
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Başlık *" name="title" defaultValue={workshop?.title} required />
          <Field label="Slug *" name="slug" defaultValue={workshop?.slug} required
            hint="URL'de kullanılır: /workshoplar/slug" />
          <Field label="Hero Etiketi" name="heroLabel" defaultValue={workshop?.heroLabel ?? ""}
            hint='Örn: "Mayıs 2025"' />
          <div className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3">
            <input
              type="checkbox"
              id="published"
              name="published"
              defaultChecked={workshop?.published ?? true}
              className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-stone-700">
              Yayında
            </label>
          </div>
        </div>
      </section>

      {/* Özet */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
          Özet
        </h2>
        <div className="grid gap-4">
          <Field label="Teaser (kısa tanım) *" name="teaser" defaultValue={workshop?.teaser} required />
          <TextAreaField label="Kısa Açıklama *" name="shortDescription"
            defaultValue={workshop?.shortDescription} rows={3} required />
        </div>
      </section>

      {/* İçerik */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
          İçerik
        </h2>
        <div className="grid gap-4">
          <TextAreaField label="Genel Bakış (Overview) *" name="overview"
            defaultValue={workshop?.overview} rows={5} required />
          <TextAreaField label="Gündem (Agenda) *" name="agenda"
            defaultValue={workshop?.agenda} rows={5} required />
          <TextAreaField label="Öğrenme Çıktıları *" name="learningOutcomes"
            defaultValue={workshop?.learningOutcomes} rows={4} required />
          <TextAreaField label="Hedef Kitle *" name="audience"
            defaultValue={workshop?.audience} rows={3} required />
        </div>
      </section>

      {/* Lojistik */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
          Lojistik
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Şehir *" name="location" defaultValue={workshop?.location} required />
          <Field label="Mekan *" name="venue" defaultValue={workshop?.venue} required />
          <Field label="Başlangıç Tarihi *" name="startDate" type="date"
            defaultValue={toDateInput(workshop?.startDate)} required />
          <Field label="Bitiş Tarihi" name="endDate" type="date"
            defaultValue={toDateInput(workshop?.endDate)} />
          <Field label="Kapasite" name="capacity" type="number"
            defaultValue={workshop?.capacity?.toString() ?? ""} />
          <Field label="Fiyat Notu" name="priceNote" defaultValue={workshop?.priceNote ?? ""}
            hint='Örn: "Ücretsiz" veya "₺1.500"' />
        </div>
      </section>

      {/* Bağlantılar */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
          Bağlantılar &amp; Medya
        </h2>
        <div className="grid gap-4">
          <Field label="Kayıt URL *" name="registrationUrl"
            defaultValue={workshop?.registrationUrl} required />
          <Field label="Kapak Görsel URL" name="coverImageUrl"
            defaultValue={workshop?.coverImageUrl ?? ""} />
          <TextAreaField
            label="Galeri Görselleri"
            name="gallery"
            defaultValue={toGalleryInput(workshop?.gallery)}
            rows={5}
            hint="Her satıra bir görsel URL ekleyin. Boş satırlar yok sayılır."
          />
          {workshop?.gallery && workshop.gallery.length > 0 && (
            <div>
              <p className="mb-2 block text-sm font-medium text-stone-700">Mevcut Galeri Önizleme</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {workshop.gallery.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="overflow-hidden rounded-lg border border-stone-200 bg-stone-50"
                  >
                    <img
                      src={image}
                      alt={`Galeri görseli ${index + 1}`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <Field label="Harita Adresi" name="mapAddress"
            defaultValue={workshop?.mapAddress ?? ""} />
          <TextAreaField label="Harita Embed URL" name="mapEmbedUrl"
            defaultValue={workshop?.mapEmbedUrl ?? ""} rows={2} />
        </div>
      </section>

      {/* Butonlar */}
      <div className="flex items-center justify-between border-t border-stone-200 pt-6">
        <a
          href="/admin/workshoplar"
          className="text-sm text-stone-500 hover:text-stone-800"
        >
          ← İptal
        </a>
        <div className="flex gap-3">
          {workshop && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              {isDeleting ? "Siliniyor…" : "Sil"}
            </button>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-stone-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {isPending ? "Kaydediliyor…" : workshop ? "Güncelle" : "Oluştur"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
      />
      {hint && <p className="mt-1 text-xs text-stone-400">{hint}</p>}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-stone-700">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
      />
      {hint && <p className="mt-1 text-xs text-stone-400">{hint}</p>}
    </div>
  );
}
