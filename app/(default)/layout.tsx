"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <Header />

      <main className="grow pt-28 md:pt-36">
        <div key={pathname} className="animate-page-in">
          {children}
        </div>
      </main>

      <Footer border={true} />
    </>
  );
}
