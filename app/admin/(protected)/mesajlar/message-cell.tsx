"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { markMessageAsRead } from "./actions";

type MessageData = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  message: string;
  createdAt: string;
  status: string;
};

export default function MessageCell({ msg }: { msg: MessageData }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
    if (msg.status === "NEW") {
      markMessageAsRead(msg.id);
    }
  }, [msg.id, msg.status]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isLong = msg.message.length > 120;

  return (
    <div>
      <p className="line-clamp-2">{msg.message}</p>
      {isLong && (
        <button
          onClick={handleOpen}
          className="mt-1 text-xs font-medium text-emerald-700 hover:underline"
        >
          Detayı Gör →
        </button>
      )}
      {!isLong && msg.status === "NEW" && (
        <button
          onClick={handleOpen}
          className="mt-1 text-xs font-medium text-emerald-700 hover:underline"
        >
          Okundu olarak işaretle
        </button>
      )}

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setOpen(false)}
          >
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-stone-200 px-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{msg.name}</h3>
                  <p className="mt-0.5 text-sm text-stone-500">
                    <a href={`mailto:${msg.email}`} className="text-emerald-700 hover:underline">
                      {msg.email}
                    </a>
                    {msg.phone && <span className="ml-2">· {msg.phone}</span>}
                  </p>
                  {msg.organization && (
                    <p className="mt-0.5 text-sm text-stone-500">{msg.organization}</p>
                  )}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-5">
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-stone-700">{msg.message}</p>
              </div>
              <div className="flex items-center justify-between border-t border-stone-100 px-6 py-3">
                <span className="text-xs text-stone-400">{msg.createdAt}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-stone-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-800"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
