import InstructorForm from "../instructor-form";

export default function NewInstructorPage() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <a href="/admin/egitmenler" className="text-sm text-stone-500 hover:text-stone-800">
          ← Eğitmenler
        </a>
        <span className="text-stone-300">/</span>
        <h1 className="text-2xl font-bold text-stone-800">Yeni Eğitmen</h1>
      </div>
      <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
        <InstructorForm />
      </div>
    </div>
  );
}
