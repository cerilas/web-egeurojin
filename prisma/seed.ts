import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { fallbackWorkshops } from "@/lib/site-data";

const prisma = new PrismaClient();

async function main() {
  // Workshop seed
  for (const workshop of fallbackWorkshops) {
    await prisma.workshop.upsert({
      where: { slug: workshop.slug },
      update: {
        title: workshop.title,
        teaser: workshop.teaser,
        shortDescription: workshop.shortDescription,
        overview: workshop.overview,
        agenda: workshop.agenda,
        learningOutcomes: workshop.learningOutcomes,
        audience: workshop.audience,
        location: workshop.location,
        venue: workshop.venue,
        startDate: new Date(workshop.startDate),
        endDate: workshop.endDate ? new Date(workshop.endDate) : null,
        registrationUrl: workshop.registrationUrl,
        capacity: workshop.capacity,
        priceNote: workshop.priceNote,
        heroLabel: workshop.heroLabel,
        published: true,
      },
      create: {
        slug: workshop.slug,
        title: workshop.title,
        teaser: workshop.teaser,
        shortDescription: workshop.shortDescription,
        overview: workshop.overview,
        agenda: workshop.agenda,
        learningOutcomes: workshop.learningOutcomes,
        audience: workshop.audience,
        location: workshop.location,
        venue: workshop.venue,
        startDate: new Date(workshop.startDate),
        endDate: workshop.endDate ? new Date(workshop.endDate) : null,
        registrationUrl: workshop.registrationUrl,
        capacity: workshop.capacity,
        priceNote: workshop.priceNote,
        heroLabel: workshop.heroLabel,
        published: true,
      },
    });
  }

  // Bülten abone dummy verisi
  const newsletterEmails = [
    "ayse.yilmaz@hacettepe.edu.tr",
    "mehmet.kaya@istanbul.edu.tr",
    "zeynep.celik@ege.edu.tr",
    "ali.demir@marmara.edu.tr",
    "fatma.sahin@ankara.edu.tr",
    "burak.arslan@dokuz9.edu.tr",
  ];
  for (const email of newsletterEmails) {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
  }

  // İletişim formu dummy verisi
  const contactMessages = [
    {
      name: "Dr. Ayşe Kılıç",
      email: "ayskilic@hastane.gov.tr",
      phone: "0532 111 22 33",
      organization: "Ankara Şehir Hastanesi",
      message: "Ürojinekoloji workshop'una kurumsal katılım sağlamak istiyoruz. Toplu kayıt imkânı var mı?",
      status: "NEW" as const,
    },
    {
      name: "Uzm. Dr. Can Öztürk",
      email: "can.ozturk@medikaldernek.org",
      phone: "0216 333 44 55",
      organization: "Türk Jinekoloji Derneği",
      message: "Eğitim içerikleri hakkında bilgi almak istiyorum. Sertifikalı program var mı?",
      status: "READ" as const,
    },
    {
      name: "Dr. Selin Erdoğan",
      email: "selin.erdogan@gmail.com",
      phone: null,
      organization: null,
      message: "Bir sonraki workshop tarihi ne zaman? İzmir'de düzenlenecek mi?",
      status: "REPLIED" as const,
    },
    {
      name: "Prof. Dr. Murat Yıldız",
      email: "myildiz@ege.edu.tr",
      phone: "0232 444 55 66",
      organization: "Ege Üniversitesi Tıp Fakültesi",
      message: "Pratisyen hekimler için temel ürojinekoloji eğitimi planlanıyor mu?",
      status: "NEW" as const,
    },
  ];
  for (const msg of contactMessages) {
    const existing = await prisma.contactMessage.findFirst({
      where: { email: msg.email },
    });
    if (!existing) {
      await prisma.contactMessage.create({ data: msg });
    }
  }

  // Admin kullanıcı seed
  const adminUsers = [
    { email: "admin@egeurojinekoloji.com", name: "Admin", password: "admin123" },
  ];
  for (const user of adminUsers) {
    await prisma.adminUser.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        passwordHash: hashSync(user.password, 12),
        active: true,
      },
    });
  }

  console.log("Seed tamamlandı.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
