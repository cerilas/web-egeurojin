"use client";

import { useState } from "react";

export default function MessageCell({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 120;

  return (
    <div>
      <p className={!expanded && isLong ? "line-clamp-2" : undefined}>{text}</p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-xs font-medium text-emerald-700 hover:underline"
        >
          {expanded ? "Kapat ↑" : "Tamamını gör ↓"}
        </button>
      )}
    </div>
  );
}
