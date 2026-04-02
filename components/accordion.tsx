"use client";

import { useState } from "react";

type AccordionpProps = {
  children: React.ReactNode;
  title: string;
  id: string;
  active?: boolean;
};

export default function Accordion({
  children,
  title,
  id,
  active = false,
}: AccordionpProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(active);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white shadow-sm shadow-black/[0.03]">
      <h2>
        <button
          id={`accordion-title-${id}`}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-semibold text-stone-900"
          onClick={(e) => {
            e.preventDefault();
            setAccordionOpen((prevState) => !prevState);
          }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}
        >
          <span>{title}</span>
          <span className="ml-8 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-100 shadow-xs">
            <svg
              className={`origin-center transform fill-stone-500 transition duration-200 ease-out ${accordionOpen && "rotate-180!"}`}
              xmlns="http://www.w3.org/2000/svg"
              width={10}
              height={6}
              fill="none"
            >
              <path
                d="m2 .586 3 3 3-3L9.414 2 5.707 5.707a1 1 0 0 1-1.414 0L.586 2 2 .586Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={`accordion-text-${id}`}
        role="region"
        aria-labelledby={`accordion-title-${id}`}
        className={`grid overflow-hidden text-sm text-stone-700 transition-all duration-300 ease-in-out ${accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 leading-7">{children}</p>
        </div>
      </div>
    </div>
  );
}
