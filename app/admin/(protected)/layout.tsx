"use client";

import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import { logoutAction } from "./auth-actions";

const navLinks = [
  { href: "/admin", label: "Genel Bakış" },
  { href: "/admin/workshoplar", label: "Workshoplar" },
  { href: "/admin/egitmenler", label: "Eğitmenler" },
  { href: "/admin/mesajlar", label: "İletişim Mesajları" },
  { href: "/admin/bulten", label: "Bülten Aboneleri" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/admin" className="shrink-0 text-sm font-semibold text-stone-800 transition hover:text-emerald-800 sm:text-base">
            Ege Ürojinekoloji — Yönetim
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition hover:bg-stone-100 hover:text-stone-900 ${
                  pathname === link.href
                    ? "bg-stone-100 text-stone-900"
                    : "text-stone-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <Link
              href="/"
              className="text-sm text-stone-500 transition hover:text-stone-800"
            >
              ← Siteye Dön
            </Link>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              {isPending ? "Çıkılıyor…" : "Çıkış Yap"}
            </button>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto rounded-md p-2 text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 lg:hidden"
            aria-label="Menüyü aç"
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-stone-200 bg-white px-4 pb-4 pt-2 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition hover:bg-stone-100 hover:text-stone-900 ${
                    pathname === link.href
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-stone-100 pt-3">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
              >
                ← Siteye Dön
              </Link>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-left text-sm font-medium text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                {isPending ? "Çıkılıyor…" : "Çıkış Yap"}
              </button>
            </div>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}