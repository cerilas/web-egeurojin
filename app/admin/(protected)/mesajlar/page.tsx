import Link from "next/link";
import { prisma } from "@/lib/db";
import MessageCell from "./message-cell";

const PAGE_SIZE = 25;

const statusLabel: Record<string, string> = {
  NEW: "Yeni",
  READ: "Okundu",
  REPLIED: "Yanıtlandı",
  ARCHIVED: "Arşivlendi",
};

const statusColor: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  READ: "bg-stone-100 text-stone-600",
  REPLIED: "bg-emerald-100 text-emerald-700",
  ARCHIVED: "bg-amber-100 text-amber-700",
};

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ sayfa?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.sayfa) || 1);
  const totalCount = await prisma.contactMessage.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">İletişim Mesajları</h1>
          <p className="mt-1 text-sm text-stone-500">{totalCount} mesaj</p>
        </div>
        <a
          href="/api/admin/export-messages"
          className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Excel İndir
        </a>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-stone-600">İsim</th>
              <th className="px-4 py-3 font-semibold text-stone-600">E-posta</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Telefon</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Kurum</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Mesaj</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Tarih</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium text-stone-800">
                  {msg.name}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-emerald-700 hover:underline"
                  >
                    {msg.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {msg.phone ?? <span className="text-stone-400">—</span>}
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {msg.organization ?? <span className="text-stone-400">—</span>}
                </td>
                <td className="max-w-xs px-4 py-3 text-stone-600">
                  <MessageCell
                    msg={{
                      id: msg.id,
                      name: msg.name,
                      email: msg.email,
                      phone: msg.phone,
                      organization: msg.organization,
                      message: msg.message,
                      createdAt: msg.createdAt.toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                      status: msg.status,
                    }}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-stone-500">
                  {msg.createdAt.toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      statusColor[msg.status] ?? "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {statusLabel[msg.status] ?? msg.status}
                  </span>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-stone-400">
                  Henüz mesaj yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-stone-500">
            Sayfa {page} / {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/mesajlar?sayfa=${page - 1}`}
                className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
              >
                ← Önceki
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/mesajlar?sayfa=${page + 1}`}
                className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
              >
                Sonraki →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
