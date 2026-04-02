"use client";

import { startTransition, useState } from "react";

const initialState = {
  status: "idle",
  message: "",
} as const;

type ResultState = {
  status: "idle" | "success" | "error";
  message: string;
};

export default function ContactForm() {
  const [result, setResult] = useState<ResultState>(initialState);
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        setIsPending(true);

        startTransition(async () => {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData.entries())),
          });

          const payload = await response.json();

          if (!response.ok) {
            setResult({ status: "error", message: payload.message });
            setIsPending(false);
            return;
          }

          setResult({ status: "success", message: payload.message });
          (event.currentTarget as HTMLFormElement).reset();
          setIsPending(false);
        });
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Ad Soyad
          <input
            name="name"
            required
            className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-600"
            placeholder="Adınız Soyadınız"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          E-posta
          <input
            type="email"
            name="email"
            required
            className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-600"
            placeholder="ornek@egeurojinekoloji.com"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Telefon
          <input
            name="phone"
            className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-600"
            placeholder="+90 ..."
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Kurum
          <input
            name="organization"
            className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-600"
            placeholder="Klinik / Hastane / Üniversite"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-stone-700">
        Mesaj
        <textarea
          name="message"
          required
          rows={6}
          className="rounded-3xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-600"
          placeholder="Sorunuzu ya da talebinizi yazın."
        />
      </label>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Gönderiliyor" : "Mesajı Gönder"}
        </button>
        {result.status !== "idle" ? (
          <p
            className={`text-sm ${
              result.status === "success" ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {result.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
