import { prisma } from "@/lib/db";
import MessageCell from "./message-cell";

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

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">İletişim Mesajları</h1>
        <span className="text-sm text-stone-500">{messages.length} mesaj</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-sm">
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
                  <MessageCell text={msg.message} />
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
    </div>
  );
}
