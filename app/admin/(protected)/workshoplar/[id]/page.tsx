import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import WorkshopForm from "../workshop-form";

export default async function WorkshopEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workshop = await prisma.workshop.findUnique({ where: { id } });
  if (!workshop) notFound();

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <a href="/admin/workshoplar" className="text-sm text-stone-500 hover:text-stone-800">
          ← Workshoplar
        </a>
        <span className="text-stone-300">/</span>
        <h1 className="text-2xl font-bold text-stone-800">{workshop.title}</h1>
      </div>
      <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
        <WorkshopForm workshop={workshop} />
      </div>
    </div>
  );
}
