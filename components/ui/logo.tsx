import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Ege Ürojin">
      <span className="[font-family:var(--font-display)] text-xl font-semibold md:text-2xl">
        <span className="text-stone-900">Ege</span><span className="text-emerald-700">Ürojin</span>
      </span>
    </Link>
  );
}
