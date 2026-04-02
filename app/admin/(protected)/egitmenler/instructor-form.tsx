"use client";

import { useActionState, useTransition } from "react";
import { saveInstructorAction, deleteInstructorAction } from "./actions";

type InstructorFormProps = {
  instructor?: {
    id: string;
    slug: string;
    name: string;
    role: string;
    email: string | null;
    institution: string | null;
    bio: string;
    focusAreas: string | null;
    imageUrl: string | null;
    sortOrder: number;
    active: boolean;
  };
};

export default function InstructorForm({ instructor }: InstructorFormProps) {
  const [state, formAction, isPending] = useActionState(saveInstructorAction, null);
  const [isDeleting, startDelete] = useTransition();

  function handleDelete() {
    if (!instructor) return;
    if (!confirm(`"${instructor.name}" eğitmenini silmek istediğinize emin misiniz?`))
      return;
    startDelete(() => deleteInstructorAction(instructor.id));
  }

  return (
    <form action={formAction} className="space-y-8">
      {instructor && <input type="hidden" name="id" value={instructor.id} />}

      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
          Temel Bilgiler
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="İsim Soyisim *" name="name" defaultValue={instructor?.name} required />
          <Field
            label="Slug *"
            name="slug"
            defaultValue={instructor?.slug}
            required
            hint="URL'de kullanılır: /egitmenler/slug"
          />
          <Field label="Ünvan *" name="role" defaultValue={instructor?.role} required
            hint='Örn: "Prof. Dr." veya "Doç. Dr."' />
          <Field label="E-posta" name="email" type="email" defaultValue={instructor?.email ?? ""} />
          <Field label="Kurum" name="institution" defaultValue={instructor?.institution ?? ""}
            hint="Örn: Ege Üniversitesi Tıp Fakültesi" />
          <Field label="Sıralama" name="sortOrder" type="number"
            defaultValue={instructor?.sortOrder?.toString() ?? "0"} />
          <div className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3">
            <input
              type="checkbox"
              id="active"
              name="active"
              defaultChecked={instructor?.active ?? true}
              className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="active" className="text-sm font-medium text-stone-700">
              Aktif
            </label>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
          Detaylar
        </h2>
        <div className="grid gap-4">
          <Field label="Uzmanlık Alanları" name="focusAreas"
            defaultValue={instructor?.focusAreas ?? ""}
            hint="Virgülle ayırın: Pelvik taban, Ürodinamik, Laparoskopi" />
          <TextAreaField label="Biyografi *" name="bio"
            defaultValue={instructor?.bio} rows={5} required />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
          Profil Görseli
        </h2>
        <div className="grid gap-4">
          <Field label="Profil Resmi URL" name="imageUrl"
            defaultValue={instructor?.imageUrl ?? ""} />
          {instructor?.imageUrl && (
            <div>
              <p className="mb-2 block text-sm font-medium text-stone-700">Önizleme</p>
              <img
                src={instructor.imageUrl}
                alt={instructor.name}
                className="h-24 w-24 rounded-full object-cover ring-2 ring-stone-200"
              />
            </div>
          )}
        </div>
      </section>

      <div className="flex items-center justify-between border-t border-stone-200 pt-6">
        <a
          href="/admin/egitmenler"
          className="text-sm text-stone-500 hover:text-stone-800"
        >
          ← İptal
        </a>
        <div className="flex gap-3">
          {instructor && (
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
            {isPending ? "Kaydediliyor…" : instructor ? "Güncelle" : "Oluştur"}
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
