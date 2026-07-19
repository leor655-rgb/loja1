"use client";

import { useState } from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const safe = images.length ? images : [""];

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      <div className="flex gap-3 lg:flex-col">
        {safe.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={`h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
              active === i ? "border-ink opacity-100" : "border-line opacity-70 hover:opacity-100"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${name} ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="img-zoom relative flex-1 overflow-hidden rounded-2xl bg-cream-2">
        <div className="aspect-[4/5] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={safe[active]}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
