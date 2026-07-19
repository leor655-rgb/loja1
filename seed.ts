"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { FlagMark } from "./FlagMark";
import { Marquee } from "./Marquee";

const NAV = [
  { label: "Catálogo", href: "/produtos" },
  { label: "Camisetas Heavy", href: "/produtos?categoria=camiseta" },
  { label: "Shorts Street", href: "/produtos?categoria=short" },
];

const TICKER = [
  "FRETE GRÁTIS ACIMA DE R$199",
  "DROP 01 // NO AR",
  "STREETWEAR UNISSEX",
  "VENDIDO EM UNIDADES",
  "30 DIAS PARA TROCA",
];

function BagIcon({ count }: { count: number }) {
  return (
    <span className="relative inline-flex">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 7h12l1 13H5L6 7z" />
        <path d="M9 7V6a3 3 0 0 1 6 0v1" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </span>
  );
}

export function Header() {
  const { count, openCart, loaded } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Fita de alerta rolante */}
      <div className="border-b border-black/40 bg-tape text-black">
        <Marquee
          items={TICKER}
          className="py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
        />
      </div>

      <div
        className={`border-b border-line bg-cream/90 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-[0_14px_44px_rgba(0,0,0,0.75)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            className="flex items-center gap-2 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <span className="text-ink">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </span>
          </button>

          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="RED FLAG — início"
          >
            <FlagMark className="h-8 w-8 text-ink transition-transform duration-300 group-hover:-rotate-6" />
            <span className="font-display text-2xl uppercase tracking-wide text-ink">
              RED FLAG<span className="text-terracotta">®</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/produtos"
              aria-label="Buscar peças"
              className="hidden text-ink-soft transition-colors hover:text-ink sm:inline-flex"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="Abrir sacola"
              className="relative text-ink transition-transform hover:scale-110"
            >
              <BagIcon count={loaded ? count : 0} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-line bg-cream px-4 py-3 lg:hidden">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 border-b border-line py-4 font-display text-xl uppercase tracking-wide text-ink"
                  >
                    <FlagMark className="h-5 w-5 text-ink" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
