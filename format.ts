import Link from "next/link";
import { Stars } from "./Stars";
import { formatBRL } from "@/lib/format";
import type { ProductWithStats } from "@/db/queries";

export function ProductCard({
  product,
  priority = false,
}: {
  product: ProductWithStats;
  priority?: boolean;
}) {
  const img = product.images[0];
  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / (product.compareAt as number)) * 100)
    : 0;

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group block focus:outline-none"
    >
      <div className="img-zoom relative aspect-[3/4] overflow-hidden rounded-none border border-line bg-cream-2 transition-colors duration-300 group-hover:border-terracotta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover filter brightness-[0.9] contrast-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        {product.badge && (
          <span className="absolute left-3 top-3 bg-pine px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-white shadow-sm">
            {product.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute right-3 top-3 bg-white text-black px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest shadow-sm">
            -{discountPct}%
          </span>
        )}

        <span className="absolute inset-x-4 bottom-4 translate-y-3 bg-white py-3 text-center text-xs font-black uppercase tracking-widest text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Visualizar peça
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-terracotta flex items-center gap-1">
            <span>🚩</span> UNISSEX · {product.category === "camiseta" ? "Heavy Tee" : "Street Short"}
          </p>
          <h3 className="mt-1.5 truncate font-sans text-base font-extrabold uppercase tracking-wide text-ink">
            {product.name}
          </h3>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <Stars value={product.avgRating} size={12} />
        <span className="text-xs text-muted">
          {product.avgRating.toFixed(1)} ({product.reviewCount})
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-sans font-black text-lg text-ink">
          {formatBRL(product.price)}
        </span>
        {hasDiscount && (
          <span className="text-xs text-muted line-through">
            {formatBRL(product.compareAt as number)}
          </span>
        )}
        <span className="ml-auto text-[10px] text-muted font-bold uppercase tracking-wider">/ un.</span>
      </div>
    </Link>
  );
}
