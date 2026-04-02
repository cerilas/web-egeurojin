# Ege Urojinekoloji Workshop

Next.js 15, Tailwind CSS 4 ve PostgreSQL tabanli kurumsal workshop sitesi.

Bu temel su ihtiyaclar icin hazirlandi:

- landing ve kurumsal tanitim akisi
- Hakkimizda, Iletisim, Ekip ve Egitmenler sayfalari
- veritabanindan beslenen Workshop listesi ve detay sayfalari
- Ceviz platformuna yonlenen kayit akisi
- Railway uzerinde deploy edilebilir bir yapi

## Teknoloji

- Next.js 15 App Router
- React 19
- Tailwind CSS 4
- Prisma ORM
- PostgreSQL
- Railway deployment

## Sayfalar

- /
- /hakkimizda
- /workshoplar
- /workshoplar/[slug]
- /iletisim
- /ekip-egitmenler

## Veri modeli

Prisma semasi su ana tablolarla kuruldu:

- Workshop
- Instructor
- WorkshopInstructor
- ContactMessage

Workshop icerigi veritabanindan okunur. DATABASE_URL tanimli degilse uygulama fallback seed verisiyle calisir.

## Gelistirme

1. Bagimliliklari kur:

```bash
npm install
```

2. Ortam degiskenini tanimla:

```bash
cp .env.example .env
```

3. PostgreSQL ayagini kaldir ve migration uygula:

```bash
npm run db:migrate
```

4. Ornek veriyi yukle:

```bash
npm run db:seed
```

5. Gelistirme sunucusunu baslat:

```bash
npm run dev
```

## Railway

Railway uzerinde asgari kurulum:

1. Yeni bir PostgreSQL servisi olustur.
2. Web servisine `DATABASE_URL` degiskenini Railway PostgreSQL baglantisindan ver.
3. Build command:

```bash
npm run build
```

4. Start command:

```bash
npm run start
```

5. Ilk deploy oncesi migration calistir:

```bash
npm run db:deploy
```

Istersen bunu Railway post-deploy komutuna da tasiyabilirsin.

## Notlar

- `package.json` icindeki Prisma seed tanimi Prisma 7 ile degisecek. Su an Prisma 6 ile sorunsuz calisiyor.
- Su an admin panel yok. Workshop ve egitmen verisi Prisma tarafindan yonetiliyor.
- Bir sonraki mantikli adim, yonetim paneli veya headless CMS entegrasyonu.