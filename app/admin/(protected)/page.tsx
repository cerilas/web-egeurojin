import { prisma } from "@/lib/db";
import { getGaOverview } from "@/lib/google-analytics";

async function getStats() {
  const [workshops, messages, subscribers] = await Promise.all([
    prisma.workshop.count(),
    prisma.contactMessage.count(),
    prisma.newsletterSubscriber.count(),
  ]);
  const newMessages = await prisma.contactMessage.count({
    where: { status: "NEW" },
  });
  const ga = await getGaOverview();

  return { workshops, messages, newMessages, subscribers, ga };
}

export default async function AdminPage() {
  const stats = await getStats();

  const cards = [
    {
      label: "Workshoplar",
      value: stats.workshops,
      href: "/admin/workshoplar",
      color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
    {
      label: "İletişim Mesajları",
      value: stats.messages,
      sub: `${stats.newMessages} yeni`,
      href: "/admin/mesajlar",
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      label: "Bülten Aboneleri",
      value: stats.subscribers,
      href: "/admin/bulten",
      color: "bg-violet-50 border-violet-200 text-violet-700",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-800">Genel Bakış</h1>
      <div className="grid gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className={`rounded-xl border p-6 transition hover:shadow-md ${card.color}`}
          >
            <p className="text-sm font-medium opacity-70">{card.label}</p>
            <p className="mt-1 text-4xl font-bold">{card.value}</p>
            {card.sub && (
              <p className="mt-1 text-sm font-medium opacity-70">{card.sub}</p>
            )}
          </a>
        ))}
      </div>

      {stats.ga && (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
          <p className="text-sm font-medium opacity-80">Google Analytics ({stats.ga.periodLabel})</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium opacity-70">Toplam Kullanıcı</p>
              <p className="text-2xl font-bold">{stats.ga.users}</p>
            </div>
            <div>
              <p className="text-xs font-medium opacity-70">Oturum</p>
              <p className="text-2xl font-bold">{stats.ga.sessions}</p>
            </div>
            <div>
              <p className="text-xs font-medium opacity-70">Sayfa Görüntüleme</p>
              <p className="text-2xl font-bold">{stats.ga.pageViews}</p>
            </div>
          </div>
        </div>
      )}

      {!stats.ga && (
        <p className="mt-8 text-sm text-stone-500">
          Google Analytics kartı için değişkenleri tanımlayın: GA4_PROPERTY_ID +
          (GA_OAUTH_CLIENT_ID, GA_OAUTH_CLIENT_SECRET, GA_OAUTH_REFRESH_TOKEN) veya
          (GA_SERVICE_ACCOUNT_EMAIL, GA_SERVICE_ACCOUNT_PRIVATE_KEY)
        </p>
      )}
    </div>
  );
}
