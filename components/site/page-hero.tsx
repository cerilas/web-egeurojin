type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-4xl border border-stone-200 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.14),transparent_32%),white] px-6 py-14 shadow-xl shadow-stone-950/5 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl [font-family:var(--font-display)] text-4xl font-semibold leading-tight text-stone-900 md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600 md:text-xl">{description}</p>
        </div>
      </div>
    </section>
  );
}
