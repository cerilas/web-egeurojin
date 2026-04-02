export type InstructorSummary = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  focusAreas?: string;
  imageUrl?: string;
};

export type WorkshopSummary = {
  slug: string;
  title: string;
  teaser: string;
  shortDescription: string;
  overview: string;
  agenda: string;
  learningOutcomes: string;
  audience: string;
  location: string;
  venue: string;
  startDate: string;
  endDate?: string;
  registrationUrl: string;
  capacity?: number;
  priceNote?: string;
  heroLabel?: string;
  coverImageUrl?: string;
  gallery?: string[];
  mapEmbedUrl?: string;
  mapAddress?: string;
  instructors: InstructorSummary[];
};

export const siteNavigation = [
  { href: "/#anasayfa", label: "Anasayfa" },
  { href: "/#amac", label: "Amaç" },
  { href: "/#program", label: "Program" },
  { href: "/#sss", label: "Sık Sorulanlar" },
  { href: "/workshoplar", label: "Workshoplar" },
  { href: "/iletisim", label: "İletişim" },
];

export const siteStats = [
  { value: "Kanıt temelli", label: "Tanı ve tedavi yaklaşımı" },
  { value: "Uygulamalı", label: "Prosedür ve simülasyon oturumları" },
  { value: "Meslektaş ağı", label: "Klinik paylaşım ve dayanışma" },
];

export const siteSocialProof = {
  stats: [
    { value: "150+", label: "Eğitilen Hekim" },
    { value: "12", label: "Tamamlanan Workshop" },
    { value: "%96", label: "Katılımcı Memnuniyeti" },
    { value: "4", label: "Klinik Başlık" },
  ],
  partners: [
    "Ege Üniversitesi Tıp Fakültesi",
    "Ankara Kadın Doğum ve Çocuk Hastalıkları",
    "İstanbul Üniversitesi Cerrahpaşa",
    "Dokuz Eylül Üniversitesi",
    "Marmara Üniversitesi Tıp Fakültesi",
  ],
};

export const sitePillars = [
  {
    title: "Güncel klinik içerik",
    description:
      "Pelvik taban bozukluklarının tanı, tedavi ve komplikasyon yönetimini güncel kılavuzlar ve pratik algoritmalarla bir araya getirir.",
  },
  {
    title: "Uygulamalı eğitim",
    description:
      "Teorik anlatımı, realistik maketler, görüntüleme oturumları ve prosedür odaklı istasyonlarla destekler.",
  },
  {
    title: "Sürdürülebilir topluluk",
    description:
      "Eğitim günleri sonrasında da klinik deneyim paylaşımını ve meslektaş iletişimini sürdürür.",
  },
];

export const siteFaqs = [
  {
    id: "kayit",
    title: "Ön kayıt süreci nasıl yürütülür?",
    content:
      "Katılım talebi, iletişim sayfasındaki ön kayıt formu ile alınır. Takvim, kontenjan ve katılım onayı doğrudan organizasyon ekibi tarafından hekimlere iletilir.",
  },
  {
    id: "icerik",
    title: "Workshop içerikleri hangi başlıkları kapsar?",
    content:
      "İçerik başlıkları; üriner inkontinans, pelvik organ prolapsusu, aşırı aktif mesane, pelvik taban ultrasonografisi ve cerrahi teknikler gibi klinik ihtiyaç alanlarına göre güncellenir.",
  },
  {
    id: "ekip",
    title: "Eğitmen kadrosu nasıl duyurulur?",
    content:
      "Her workshop dönemi için açıklanan eğitmen kadrosu, ekip sayfasında ve ilgili workshop detayında birlikte duyurulur.",
  },
];

export const fallbackInstructors: InstructorSummary[] = [
  {
    slug: "prof-dr-ayse-yilmaz",
    name: "Prof. Dr. Ayşe Yılmaz",
    role: "Ürojinekoloji Uzmanı",
    bio: "Kadın pelvik taban bozukluklarının tanı ve cerrahi tedavisinde 20 yılı aşkın klinik deneyime sahiptir. Ulusal ve uluslararası kongrelerde düzenli olarak eğitim vermektedir.",
    focusAreas: "Pelvik organ prolapsusu, MUS cerrahisi, pelvik taban ultrasonografisi",
    imageUrl: "/images/instructors/placeholder-1.jpg",
  },
];

export const fallbackWorkshops: WorkshopSummary[] = [
  {
    slug: "pelvik-taban-ultrasonografisi",
    title: "Pelvik Taban Ultrasonografisi",
    teaser: "Tanısal dönüşüm ve görüntüleme pratiği",
    shortDescription:
      "Transperineal ve endovajinal değerlendirme temelleri, levator ani hasarı, mesh izlemi ve klinik karar süreçleri.",
    overview:
      "Pelvik taban ultrasonografisi; üriner inkontinans, prolapsus ve obstetrik hasarın değerlendirilmesinde non-invaziv ve yüksek tekrar edilebilirlik sunan temel araçlardan biridir. Bu modül, teknik kurulumdan klinik yorumlamaya kadar sistematik bir çerçeve sunar.",
    agenda:
      "Transperineal pencere kurulumu\nMesane boynu ve üretral destek analizi\nLevator ani avülzyonu ve hiatal alan ölçümleri\nPOP kompartman ayrımı\nPostoperatif sling ve mesh değerlendirmesi",
    learningOutcomes:
      "PFUS çekim akışını standardize etmek\nSistosel tipi, avülzyon ve hiatal genişlemeyi yorumlamak\nUltrason bulgularını cerrahi planlama ile ilişkilendirmek",
    audience:
      "Ürojinekolojiye ilgi duyan kadın hastalıkları ve doğum uzmanları, yan dal adayları ve pelvik taban pratiğini yapılandırmak isteyen klinisyenler.",
    location: "İzmir",
    venue: "Ege Ürojinekoloji Workshop Eğitim Alanı",
    startDate: "2026-06-14T09:00:00.000Z",
    endDate: "2026-06-14T17:30:00.000Z",
    registrationUrl: "/iletisim",
    capacity: 24,
    priceNote: "Ön kayıt ve kontenjan bilgisi iletişim birimi tarafından paylaşılır.",
    heroLabel: "Görüntüleme Modülü",
    coverImageUrl: "/images/workshops/pelvik-taban-ultrasonografisi-cover.jpg",
    gallery: [
      "/images/workshops/pelvik-taban-ultrasonografisi-1.jpg",
      "/images/workshops/pelvik-taban-ultrasonografisi-2.jpg",
      "/images/workshops/pelvik-taban-ultrasonografisi-3.jpg",
    ],
    mapAddress: "Ege Ürojinekoloji Workshop Eğitim Alanı, İzmir",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98614.33!2d27.1!3d38.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8a4!2sIzmir!5e0!3m2!1sen!2str!4v1",
    instructors: fallbackInstructors,
  },
  {
    slug: "uriner-inkontinans-ve-mus",
    title: "Üriner İnkontinans ve MUS Cerrahisi",
    teaser: "Tanısal algoritmadan prosedür pratiğine",
    shortDescription:
      "SUI, UUI ve mikst inkontinans ayrımı; konservatif yaklaşım; midüretral sling teknikleri ve uzun dönem sonuçlar.",
    overview:
      "Bu modül, üriner inkontinansın klinik ayrımını, kılavuz destekli tedavi basamaklarını ve MUS cerrahisinin pratik karar noktalarını bir araya getirir. İçerik, hem poliklinik yönetimini hem de cerrahi karar sürecini hedefler.",
    agenda:
      "İnkontinans tiplerinin klinik ayrımı\nICIQ-UI SF, ped testi ve işeme günlüğü\nTVT ve TOT endikasyonları\nUzun dönem MUS verilerinin yorumlanması\nKomplikasyon ve takip algoritmaları",
    learningOutcomes:
      "Baskın inkontinans tipine göre yönetim planı kurmak\nMUS adayını doğru seçmek\nUzun dönem başarıyı yalnız kür üzerinden değil, fonksiyonel sonuçlarla birlikte değerlendirmek",
    audience:
      "Pelvik taban cerrahisinde karar verme standardını geliştirmek isteyen kadın hastalıkları ve doğum uzmanları.",
    location: "İzmir",
    venue: "Cerrahi Beceri ve Simülasyon Laboratuvarı",
    startDate: "2026-07-05T09:00:00.000Z",
    endDate: "2026-07-06T16:30:00.000Z",
    registrationUrl: "/iletisim",
    capacity: 20,
    priceNote: "İki günlük yoğun uygulama formatı.",
    heroLabel: "Cerrahi Modül",
    coverImageUrl: "/images/workshops/uriner-inkontinans-cover.jpg",
    gallery: [
      "/images/workshops/uriner-inkontinans-1.jpg",
      "/images/workshops/uriner-inkontinans-2.jpg",
      "/images/workshops/uriner-inkontinans-3.jpg",
    ],
    mapAddress: "Cerrahi Beceri ve Simülasyon Laboratuvarı, İzmir",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98614.33!2d27.1!3d38.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8a4!2sIzmir!5e0!3m2!1sen!2str!4v1",
    instructors: fallbackInstructors,
  },
  {
    slug: "asiri-aktif-mesane-ve-ptns",
    title: "Aşırı Aktif Mesane ve PTNS",
    teaser: "Tedavi uyumu, ileri yönetim ve dijital sağlık",
    shortDescription:
      "AAM tanısı, davranışsal tedavi, farmakoloji, PTNS ve üçüncü basamak stratejilerinin uygulama odaklı özeti.",
    overview:
      "Aşırı aktif mesane modülü; sadece tedavi seçeneklerini değil, tedaviye uyumu ve hasta yolculuğunu da merkeze alır. PTNS ve dijital takip araçları, bu programın belirgin fark yaratan başlıklarıdır.",
    agenda:
      "AAM klinik ayrımı ve ayırıcı tanı\nDavranışsal tedavi ve uyum yönetimi\nAntimuskarinik ve beta-3 agonist seçimi\nPTNS uygulama akışı\nDijital günlükler ve hasta iletişim stratejileri",
    learningOutcomes:
      "AAM için basamaklı ama kişiselleştirilmiş yönetim kurgulamak\nPTNS için uygun hasta grubunu seçmek\nTakip ve uyumu dijital araçlarla güçlendirmek",
    audience:
      "Poliklinik pratiğinde AAM yönetimini standardize etmek ve ileri tedavileri yapılandırmak isteyen klinisyenler.",
    location: "İzmir",
    venue: "Nöromodülasyon Uygulama İstasyonu",
    startDate: "2026-09-12T09:30:00.000Z",
    endDate: "2026-09-12T17:00:00.000Z",
    registrationUrl: "/iletisim",
    capacity: 18,
    priceNote: "Kontenjan sınırlıdır; ön kayıt sırasına göre bilgilendirme yapılır.",
    heroLabel: "Poliklinik ve İleri Tedavi Modülü",
    coverImageUrl: "/images/workshops/asiri-aktif-mesane-cover.jpg",
    gallery: [
      "/images/workshops/asiri-aktif-mesane-1.jpg",
      "/images/workshops/asiri-aktif-mesane-2.jpg",
      "/images/workshops/asiri-aktif-mesane-3.jpg",
    ],
    mapAddress: "Nöromodülasyon Uygulama İstasyonu, İzmir",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98614.33!2d27.1!3d38.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8a4!2sIzmir!5e0!3m2!1sen!2str!4v1",
    instructors: fallbackInstructors,
  },
];

export const siteTestimonials = [
  {
    id: "t1",
    quote:
      "Pelvik taban ultrasonografisi modülü, poliklinik değerlendirmemi doğrudan değiştirdi. Transperineal pencere kurulumu ve levator ani yorumlaması artık rutinim haline geldi.",
    name: "Dr. Selin Arslan",
    title: "Kadın Hastalıkları ve Doğum Uzmanı",
    hospital: "İzmir Atatürk Eğitim ve Araştırma Hastanesi",
  },
  {
    id: "t2",
    quote:
      "MUS cerrahisi endikasyonları konusunda kafamdaki belirsizlikleri bu workshop net bir şekilde çözdü. Uzun dönem verilerin interaktif tartışılması özellikle değerliydi.",
    name: "Doç. Dr. Emre Yıldız",
    title: "Ürojinekoloji Yan Dal Uzmanı",
    hospital: "Ege Üniversitesi Tıp Fakültesi",
  },
  {
    id: "t3",
    quote:
      "AAM modülünde PTNS uygulama akışını adım adım pratik etme fırsatı bulduk. Teorik içerik ile istasyon çalışması arasındaki denge çok iyi kurulmuştu.",
    name: "Dr. Ayşe Kaya",
    title: "Üroloji Uzmanı",
    hospital: "Ankara Şehir Hastanesi",
  },
  {
    id: "t4",
    quote:
      "Katılımcı sayısının sınırlı tutulması programın en güçlü yanıydı. Her istasyonda bireysel geri bildirim alabilmek klinik öğrenmeyi gerçekten hızlandırdı.",
    name: "Op. Dr. Murat Demir",
    title: "Kadın Hastalıkları ve Doğum Uzmanı",
    hospital: "Dokuz Eylül Üniversitesi Hastanesi",
  },
  {
    id: "t5",
    quote:
      "Prolapsus kompartman ayrımını ultrasonografi eşliğinde değerlendirmeyi ilk kez bu kadar sistematik öğrendim. Cerrahi planlama kararlarıma somut bir katkı sağladı.",
    name: "Dr. Fatma Öztürk",
    title: "Jinekoloji Uzmanı",
    hospital: "İstanbul Kanuni Sultan Süleyman Hastanesi",
  },
  {
    id: "t6",
    quote:
      "Workshop sonrasında aynı grubun devam eden paylaşımı, eğitimi bir etkinlikle sınırlı bırakmayan bir yapı oluşturmuş. Meslektaş iletişimi için değerli bir zemin.",
    name: "Dr. Berk Çelik",
    title: "Kadın Hastalıkları ve Doğum Asistanı",
    hospital: "Hacettepe Üniversitesi Tıp Fakültesi",
  },
];

export const siteContact = {
  email: "iletisim@egeurojin.com",
  phone: "+90 232 000 00 00",
  city: "İzmir",
  registrationLabel: "Ön kayıt ve katılım bilgilendirmesi",
  registrationUrl: "/iletisim",
  instagram: "https://www.instagram.com/egeurojinekoloji/",
};
