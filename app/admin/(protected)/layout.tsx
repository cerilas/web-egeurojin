"use client";

import Link from "next/link";
import { useTransition } from "react";
import { logoutAction } from "./auth-actions";

const navLinks = [
  { href: "/admin", label: "Genel Bakış" },
  { href: "/admin/workshoplar", label: "Workshoplar" },
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

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <Link href="/admin" className="shrink-0 text-base font-semibold text-stone-800 hover:text-emerald-800 transition">
            Ege Ürojinekoloji — Yönetim
          </Link>
          <nav className="flex flex-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
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
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}