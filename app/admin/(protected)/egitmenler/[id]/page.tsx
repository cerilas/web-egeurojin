import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import InstructorForm from "../instructor-form";

export default async function InstructorEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const instructor = await prisma.instructor.findUnique({ where: { id } });
  if (!instructor) notFound();

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <a href="/admin/egitmenler" className="text-sm text-stone-500 hover:text-stone-800">
          ← Eğitmenler
        </a>
        <span className="text-stone-300">/</span>
        <h1 className="text-2xl font-bold text-stone-800">{instructor.name}</h1>
      </div>
      <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
        <InstructorForm instructor={instructor} />
      </div>
    </div>
  );
}
