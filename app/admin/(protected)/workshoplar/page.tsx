import { prisma } from "@/lib/db";

export default async function AdminWorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    orderBy: { startDate: "asc" },
    include: {
      instructors: {
        orderBy: { sortOrder: "asc" },
        include: { instructor: { select: { name: true } } },
      },
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Workshoplar</h1>
        <a
          href="/admin/workshoplar/yeni"
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          + Yeni Workshop
        </a>
      </div>
      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-left">
            <tr>
              <th className="w-64 px-4 py-3 font-semibold text-stone-600">Başlık</th>
              <th className="w-28 whitespace-nowrap px-4 py-3 font-semibold text-stone-600">Konum</th>
              <th className="w-40 px-4 py-3 font-semibold text-stone-600">Mekan</th>
              <th className="w-28 whitespace-nowrap px-4 py-3 font-semibold text-stone-600">Başlangıç</th>
              <th className="w-28 whitespace-nowrap px-4 py-3 font-semibold text-stone-600">Bitiş</th>
              <th className="w-20 whitespace-nowrap px-4 py-3 font-semibold text-stone-600">Kapasite</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Eğitmenler</th>
              <th className="w-24 whitespace-nowrap px-4 py-3 font-semibold text-stone-600">Durum</th>
              <th className="w-20 px-4 py-3 font-semibold text-stone-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {workshops.map((ws) => (
              <tr key={ws.id} className="hover:bg-stone-50">
                <td className="max-w-xs px-4 py-3">
                  <a
                    href={`/workshoplar/${ws.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate font-medium text-stone-800 hover:text-emerald-700 hover:underline"
                    title={ws.title}
                  >
                    {ws.title}
                  </a>
                  {ws.heroLabel && (
                    <span className="mt-0.5 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      {ws.heroLabel}
                    </span>
                  )}
                  <p className="truncate text-xs text-stone-400">/workshoplar/{ws.slug}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-stone-600">{ws.location}</td>
                <td className="max-w-[160px] truncate px-4 py-3 text-stone-600" title={ws.venue}>{ws.venue}</td>
                <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                  {ws.startDate.toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                  {ws.endDate ? ws.endDate.toLocaleDateString("tr-TR") : "—"}
                </td>
                <td className="px-4 py-3 text-center text-stone-600">
                  {ws.capacity ?? "—"}
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {ws.instructors.length > 0
                    ? ws.instructors.map((i) => i.instructor.name).join(", ")
                    : <span className="text-stone-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      ws.published
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {ws.published ? "Yayında" : "Taslak"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`/admin/workshoplar/${ws.id}`}
                    className="rounded-md border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 transition hover:border-emerald-300 hover:text-emerald-700"
                  >
                    Düzenle
                  </a>
                </td>
              </tr>
            ))}
            {workshops.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-stone-400">
                  Henüz workshop yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
