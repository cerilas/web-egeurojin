import Link from "next/link";
import { siteContact, siteNavigation } from "@/lib/site-data";
import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer className="pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid gap-10 py-8 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,#d6d3d1,transparent)1]" : ""}`}
        >
          <div className="space-y-4">
            <div>
              <Logo />
            </div>
            <p className="max-w-md text-sm leading-6 text-stone-600">
              Ege Ürojin; pelvik taban bozukluklarında güncel tanı, tedavi ve uygulamalı
              klinik eğitim yaklaşımını hekim odaklı bir programla sunar.
            </p>
            <div className="text-sm text-stone-500">
              &copy; 2026 Ege Ürojin
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">
              Sayfalar
            </h3>
            <ul className="space-y-2 text-sm">
              {siteNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-stone-600 transition hover:text-stone-900"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">
              İletişim
            </h3>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <span className="font-medium text-stone-900">E-posta:</span> {siteContact.email}
              </li>
              <li>
                <span className="font-medium text-stone-900">Telefon:</span> {siteContact.phone}
              </li>
              <li>
                <Link
                  className="inline-flex rounded-full border border-stone-200 px-4 py-2 font-medium text-stone-800 transition hover:border-emerald-700 hover:text-emerald-800"
                  href={siteContact.registrationUrl}
                >
                  Ön Kayıt Formuna Git
                </Link>
              </li>
              <li>
                <a
                  href={siteContact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-stone-600 transition hover:text-pink-500"
                >
                  <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @egeurojinekoloji
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
