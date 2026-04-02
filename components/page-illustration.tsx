import Image from "next/image";

import Stripes from "@/public/images/stripes.svg";

export default function PageIllustration() {
  return (
    <>
      {/* Stripes illustration */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={Stripes}
          width={768}
          alt="Stripes"
          priority
        />
      </div>
      {/* Circles */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 ml-145 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-linear-to-tr from-amber-300 to-emerald-400 opacity-40 blur-[160px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-105 ml-95 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-linear-to-tr from-teal-500 to-emerald-950 opacity-35 blur-[160px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-160 -ml-75 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-linear-to-tr from-emerald-500 to-stone-900 opacity-30 blur-[160px]" />
      </div>
    </>
  );
}
