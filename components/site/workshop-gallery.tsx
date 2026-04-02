"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { getDisplayImageSrc } from "@/lib/image-url";

type Props = {
  images: string[];
};

export default function WorkshopGallery({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const normalizedImages = images.map((image, index) => ({
    id: `${image}-${index}`,
    src: getDisplayImageSrc(image),
  }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex]);

  if (normalizedImages.length === 0) return null;

  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + normalizedImages.length) % normalizedImages.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % normalizedImages.length));

  return (
    <article className="rounded-4xl border border-stone-200 bg-white p-7 shadow-lg shadow-stone-950/5">
      <h2 className="text-2xl font-semibold text-stone-900">Fotoğraf Galerisi</h2>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {normalizedImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <img
              src={image.src}
              alt={`Galeri fotoğrafı ${index + 1}`}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23e7e5e4' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%2378716c' font-size='14' font-family='sans-serif'%3EFotoğraf yüklenecek%3C/text%3E%3C/svg%3E";
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-stone-900/0 transition duration-300 group-hover:bg-stone-900/20">
              <svg
                className="h-8 w-8 text-white opacity-0 transition duration-300 group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.197 5.197a7.5 7.5 0 0 0 10.606 10.606ZM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isMounted && lightboxIndex !== null
        ? createPortal(
            <div
              className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-stone-950/90 p-4"
              onClick={close}
            >
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Önceki"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>

              <img
                src={normalizedImages[lightboxIndex].src}
                alt={`Galeri fotoğrafı ${lightboxIndex + 1}`}
                className="max-h-[calc(100vh-3rem)] w-auto max-w-[calc(100vw-7rem)] rounded-2xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect fill='%23292524' width='800' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%2378716c' font-size='18' font-family='sans-serif'%3EFotoğraf yüklenecek%3C/text%3E%3C/svg%3E";
                }}
              />

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Sonraki"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
                aria-label="Kapat"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <span className="absolute bottom-4 text-sm text-white/60">
                {lightboxIndex + 1} / {normalizedImages.length}
              </span>
            </div>,
            document.body,
          )
        : null}
    </article>
  );
}
