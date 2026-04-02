"use client";

import { getDisplayImageSrc } from "@/lib/image-url";

type Props = {
  src: string;
  alt: string;
};

export default function WorkshopCoverImage({ src, alt }: Props) {
  return (
    <div className="overflow-hidden rounded-4xl bg-stone-100 shadow-lg shadow-stone-950/5">
      <img
        src={getDisplayImageSrc(src)}
        alt={alt}
        className="h-56 w-full object-cover sm:h-72 md:h-96"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect fill='%23e7e5e4' width='1200' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%2378716c' font-size='28' font-family='sans-serif'%3EGorsel yuklenemedi%3C/text%3E%3C/svg%3E";
        }}
      />
    </div>
  );
}
