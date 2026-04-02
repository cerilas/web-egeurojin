import "./css/style.css";

import Script from "next/script";
import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://egeurojinekoloji.com"),
  title: {
    default: "Ege Ürojinekoloji — Hekim Eğitimi & Klinik Workshoplar",
    template: "%s | Ege Ürojinekoloji",
  },
  description:
    "Türkiye'nin öncü ürojinekoloji hekim eğitimi platformu. Pelvik taban bozukluklarında inkontinans, prolapsus ve ultrasonografi konularında uygulamalı klinik workshoplar.",
  keywords: [
    "ürojinekoloji workshopu",
    "pelvik taban eğitimi",
    "inkontinans kursu",
    "pelvik organ prolapsusu eğitimi",
    "pelvik taban ultrasonografisi",
    "hekim eğitimi İzmir",
    "MUS cerrahisi kursu",
    "ürojinekoloji Türkiye",
    "PTNS eğitimi",
    "kadın pelvik taban bozuklukları",
  ],
  authors: [{ name: "Ege Ürojinekoloji" }],
  creator: "Ege Ürojinekoloji",
  publisher: "Ege Ürojinekoloji",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://egeurojinekoloji.com",
    siteName: "Ege Ürojinekoloji",
    title: "Ege Ürojinekoloji — Hekim Eğitimi & Klinik Workshoplar",
    description:
      "Türkiye'nin öncü ürojinekoloji hekim eğitimi platformu. Pelvik taban bozukluklarında uygulamalı klinik workshoplar.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Ege Ürojinekoloji — Pelvik Taban Hekim Eğitimi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ege Ürojinekoloji — Hekim Eğitimi & Klinik Workshoplar",
    description:
      "Pelvik taban bozukluklarında inkontinans, prolapsus ve ultrasonografi konularında uygulamalı klinik workshoplar.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://egeurojinekoloji.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-54VBBRN7');`,
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${sourceSerif.variable} bg-stone-50 font-inter tracking-tight text-stone-900 antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-54VBBRN7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
