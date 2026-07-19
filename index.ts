"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { ProductWithStats } from "@/db/queries";
import { formatBRL } from "@/lib/format";

export function AddToCart({ product }: { product: ProductWithStats }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | undefined>(
    product.colors[0]?.name,
  );
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!size) {
      setError("SELECIONE UM TAMANHO ANTES DE ADICIONAR AO SEU COFRE.");
      return;
    }
    setError("");
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        size,
        color: color ?? "",
        price: product.price,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-6 border-t border-line pt-6">
      {/* Color */}
      {product.colors.length > 0 && (
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-ink">OPÇÃO DE VARIAÇÃO</span>
            <span className="text-xs font-bold uppercase tracking-wider text-muted">{color}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => setColor(c.name)}
                className={`grid h-10 w-10 place-items-center rounded-none border transition-all ${
                  color === c.name
                    ? "border-pine ring-1 ring-pine"
                    : "border-line hover:border-ink"
                }`}
              >
                <span
                  className="h-7 w-7 rounded-none border border-black/10"
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-ink">GRADE DE TAMANHO // UNISSEX</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Grade Ampla (Boxy)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setError("");
              }}
              className={`min-w-[3.5rem] rounded-none border px-4 py-3 text-xs font-black uppercase tracking-wider transition-all ${
                size === s
                  ? "border-pine bg-pine text-white"
                  : "border-line text-ink hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {error && <p className="mt-3 text-xs font-bold text-terracotta uppercase tracking-wider">{error}</p>}
      </div>

      {/* Qty + Add */}
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-none border border-line bg-cream">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Diminuir quantidade"
            className="grid h-12 w-12 place-items-center font-bold text-ink transition-colors hover:text-terracotta"
          >
            −
          </button>
          <span className="w-8 text-center text-xs font-black">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            aria-label="Aumentar quantidade"
            className="grid h-12 w-12 place-items-center font-bold text-ink transition-colors hover:text-terracotta"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-dark flex-1 py-4 font-black"
        >
          {added ? "ADICIONADO COFRE ✓" : "GARANTIR PEÇA"}
        </button>
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted">
        VALOR UNITÁRIO {formatBRL(product.price)} · DROPS LIMITADOS COLECIONÁVEIS
      </p>
    </div>
  );
}
