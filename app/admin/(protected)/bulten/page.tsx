import { prisma } from "@/lib/db";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Bülten Aboneleri</h1>
        <span className="text-sm text-stone-500">{subscribers.length} abone</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-left">
            <tr>
              <th className="w-10 px-4 py-3 font-semibold text-stone-600">#</th>
              <th className="px-4 py-3 font-semibold text-stone-600">E-posta</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Kayıt Tarihi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {subscribers.map((sub, index) => (
              <tr key={sub.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 text-stone-400">{index + 1}</td>
                <td className="px-4 py-3">
                  <a
                    href={`mailto:${sub.email}`}
                    className="font-medium text-emerald-700 hover:underline"
                  >
                    {sub.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {sub.createdAt.toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-stone-400">
                  Henüz abone yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
