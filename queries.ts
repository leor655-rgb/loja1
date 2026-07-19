"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { cartItemKey } from "@/lib/types";
import { formatBRL } from "@/lib/format";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQty,
    removeItem,
    subtotal,
    count,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const freeShippingThreshold = 19900;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`drawer-content fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Sua sacola"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl text-ink">
            Sua sacola
            {count > 0 && (
              <span className="ml-2 text-base text-muted">({count})</span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar"
            className="rounded-full p-2 text-ink transition-colors hover:bg-cream-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 grid h-20 w-20 place-items-center rounded-full bg-cream-2 text-muted">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 7h12l1 13H5L6 7z" />
                <path d="M9 7V6a3 3 0 0 1 6 0v1" />
              </svg>
            </div>
            <p className="font-display text-xl text-ink">Sua sacola está vazia</p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Explore nossas camisetas e shorts e encontre seu novo favorito.
            </p>
            <button onClick={closeCart} className="btn btn-dark mt-6">
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-6 py-3">
              <div className="mb-2 flex items-center justify-between text-xs text-muted">
                <span>
                  {remaining > 0
                    ? `Faltam ${formatBRL(remaining)} para frete grátis`
                    : "Você ganhou frete grátis!"}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-2">
                <div
                  className="h-full rounded-full bg-pine transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="scroll-area flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-line">
                {items.map((item) => {
                  const key = cartItemKey(item);
                  return (
                    <li key={key} className="flex gap-4 py-5">
                      <Link
                        href={`/produtos/${item.slug}`}
                        onClick={closeCart}
                        className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-2"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-muted">
                              {item.color} · Tam. {item.size}
                            </p>
                            <Link
                              href={`/produtos/${item.slug}`}
                              onClick={closeCart}
                              className="font-display text-base leading-tight text-ink hover:text-pine"
                            >
                              {item.name}
                            </Link>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(key)}
                            aria-label="Remover"
                            className="text-muted transition-colors hover:text-terracotta"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                              <path d="M4 7h16M9 7V5h6v2M7 7l1 12h8l1-12" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              type="button"
                              onClick={() => updateQty(key, item.qty - 1)}
                              aria-label="Diminuir"
                              className="grid h-8 w-8 place-items-center text-ink transition-colors hover:text-terracotta"
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-sm">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(key, item.qty + 1)}
                              aria-label="Aumentar"
                              className="grid h-8 w-8 place-items-center text-ink transition-colors hover:text-terracotta"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-display text-base text-ink">
                            {formatBRL(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-line bg-cream px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-display text-2xl text-ink">
                  {formatBRL(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Frete e impostos calculados no checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn btn-dark mt-4 w-full"
              >
                Finalizar compra
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full text-center text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
