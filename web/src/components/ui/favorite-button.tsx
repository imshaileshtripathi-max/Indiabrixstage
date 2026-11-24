"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

export function FavoriteButton({ label }: { label: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      aria-label={`${isFavorite ? "Remove" : "Add"} ${label} ${isFavorite ? "from" : "to"} favourites`}
      aria-pressed={isFavorite}
      className="focus-ring relative z-10 flex size-10 items-center justify-center rounded-full bg-white/95 text-[#173B65] shadow-sm transition hover:scale-105 hover:text-[#0C9B87]"
      onClick={() => setIsFavorite((value) => !value)}
      type="button"
    >
      <Heart
        aria-hidden="true"
        className={isFavorite ? "fill-[#0C9B87] text-[#0C9B87]" : ""}
        size={18}
      />
    </button>
  );
}
