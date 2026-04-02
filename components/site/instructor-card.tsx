"use client";

import type { InstructorSummary } from "@/lib/site-data";

type Props = {
  instructor: InstructorSummary;
};

export default function InstructorCard({ instructor }: Props) {
  return (
    <li className="rounded-2xl bg-stone-50 p-4">
      <div className="flex items-center gap-4">
        {instructor.imageUrl ? (
          <img
            src={instructor.imageUrl}
            alt={instructor.name}
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-stone-200"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).replaceWith(
                Object.assign(document.createElement("div"), {
                  className:
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-stone-200 ring-2 ring-stone-100",
                  innerHTML:
                    '<svg class="h-7 w-7 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>',
                }),
              );
            }}
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-stone-200 ring-2 ring-stone-100">
            <svg
              className="h-7 w-7 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-stone-900">{instructor.name}</p>
          <p className="mt-0.5 text-sm text-emerald-800">{instructor.role}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-stone-600">{instructor.bio}</p>
    </li>
  );
}
