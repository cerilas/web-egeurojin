import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function InstructorsAdminPage() {
  const instructors = await prisma.instructor.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { workshops: true } },
    },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Eğitmenler</h1>
        <Link
          href="/admin/egitmenler/yeni"
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          + Yeni Eğitmen
        </Link>
      </div>

      {instructors.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
          <p className="text-stone-500">Henüz eğitmen eklenmemiş.</p>
          <Link
            href="/admin/egitmenler/yeni"
            className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-900"
          >
            İlk eğitmeni ekleyin →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-stone-600">Eğitmen</th>
                <th className="px-4 py-3 font-semibold text-stone-600">Ünvan</th>
                <th className="px-4 py-3 font-semibold text-stone-600">Kurum</th>
                <th className="px-4 py-3 font-semibold text-stone-600">E-posta</th>
                <th className="px-4 py-3 font-semibold text-stone-600">Workshop</th>
                <th className="px-4 py-3 font-semibold text-stone-600">Durum</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {instructors.map((instructor) => (
                <tr key={instructor.id} className="transition hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {instructor.imageUrl ? (
                        <img
                          src={instructor.imageUrl}
                          alt={instructor.name}
                          className="h-9 w-9 rounded-full object-cover ring-1 ring-stone-200"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200 text-xs font-medium text-stone-500">
                          {instructor.name.charAt(0)}
                        </div>
                      )}
                      <span className="font-medium text-stone-900">{instructor.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{instructor.role}</td>
                  <td className="px-4 py-3 text-stone-600">{instructor.institution ?? "—"}</td>
                  <td className="px-4 py-3 text-stone-600">{instructor.email ?? "—"}</td>
                  <td className="px-4 py-3 text-stone-600">{instructor._count.workshops}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        instructor.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {instructor.active ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/egitmenler/${instructor.id}`}
                      className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
