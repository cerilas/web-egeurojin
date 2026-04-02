import Link from "next/link";

import ContactForm from "@/components/site/contact-form";
import PageHero from "@/components/site/page-hero";
import { siteContact } from "@/lib/site-data";

export const metadata = {
  title: "İletişim & Ön Kayıt — Ege Ürojinekoloji",
  description:
    "Workshop katılımı, kurum içi eğitim talebi veya bilimsel iş birliği için ön kayıt formu. Kontenjan ve program bilgileri iletişim birimi tarafından paylaşılır.",
  alternates: { canonical: "https://egeurojinekoloji.com/iletisim" },
  openGraph: {
    title: "İletişim & Ön Kayıt | Ege Ürojinekoloji",
    description:
      "Workshop katılım başvurusu ve ön kayıt formu.",
    url: "https://egeurojinekoloji.com/iletisim",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Workshop katılımı, kurum içi eğitim talebi veya bilimsel iş birliği için doğrudan iletişim kurun."
        description="Ön kayıt, kontenjan ve program bilgilendirmesi hekim iletişim bilgileri üzerinden yürütülür."
      />

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div className="rounded-4xl border border-stone-200 bg-white p-7 shadow-lg shadow-stone-950/5">
            <h2 className="text-2xl font-semibold text-stone-900">İletişim Kanalları</h2>
            <dl className="mt-6 grid gap-4 text-sm text-stone-600">
              <div>
                <dt className="font-semibold text-stone-900">E-posta</dt>
                <dd className="mt-1">{siteContact.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-stone-900">Telefon</dt>
                <dd className="mt-1">{siteContact.phone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-stone-900">Şehir</dt>
                <dd className="mt-1">{siteContact.city}</dd>
              </div>
            </dl>
            <div className="mt-8 rounded-3xl bg-stone-900 p-5 text-stone-50">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Ön kayıt
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {siteContact.registrationLabel} için iletişim formunu doldurmanız yeterlidir.
              </p>
              <Link
                href={siteContact.registrationUrl}
                className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-900 transition hover:bg-emerald-100"
              >
                Ön Kayıt Formuna Git
              </Link>
            </div>
          </div>

          <div className="rounded-4xl border border-stone-200 bg-white p-7 shadow-lg shadow-stone-950/5">
            <h2 className="text-2xl font-semibold text-stone-900">Mesaj Gönder</h2>
            <p className="mt-3 text-base leading-7 text-stone-600">
              Eğitim talebi, konuşmacı daveti, kurum içi program veya workshop katılımı için formu kullanabilirsiniz.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
