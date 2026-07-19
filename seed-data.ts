import Link from "next/link";
import { FlagMark } from "./FlagMark";

const COLS = [
  {
    title: "Drops",
    links: [
      { label: "Catálogo completo", href: "/produtos" },
      { label: "Camisetas Heavy", href: "/produtos?categoria=camiseta" },
      { label: "Shorts Street", href: "/produtos?categoria=short" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Envio & entregas", href: "/produtos" },
      { label: "Trocas & estornos", href: "/produtos" },
      { label: "Tabela de medidas", href: "/produtos" },
      { label: "Fale com a loja", href: "/produtos" },
    ],
  },
  {
    title: "A marca",
    links: [
      { label: "Manifesto", href: "/" },
      { label: "Termos de uso", href: "/" },
      { label: "Privacidade", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24">
      {/* Fita zebrada de fechamento */}
      <div className="tape h-3 w-full" aria-hidden="true" />

      <div className="border-t border-line bg-cream-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <FlagMark className="h-9 w-9 text-ink" />
              <span className="font-display text-2xl uppercase tracking-wide text-ink">
                RED FLAG<span className="text-terracotta">®</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
              Streetwear autoral brasileiro. Camisetas heavyweight e shorts
              street com modelagem unissex — produzidos em tiragem única e
              vendidos em unidades. Quando esgota, esgotou.
            </p>
            <div className="mt-7">
              <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta">
                <FlagMark className="h-3.5 w-3.5 text-ink" />
                Entre na lista de drops
              </span>
              <form className="flex max-w-sm items-stretch gap-2" action="#">
                <input
                  type="email"
                  required
                  placeholder="SEU E-MAIL"
                  className="w-full border border-line bg-cream px-4 py-3 text-xs font-bold uppercase tracking-widest text-ink outline-none placeholder:text-muted focus:border-terracotta"
                />
                <button type="submit" className="btn btn-pine shrink-0 px-5 py-3">
                  Entrar
                </button>
              </form>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-ink">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-bold uppercase tracking-widest text-ink-soft transition-colors hover:text-terracotta"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted sm:flex-row sm:px-6">
            <p>© {new Date().getFullYear()} RED FLAG CO. Todos os direitos reservados.</p>
            <p className="flex items-center gap-2">
              <FlagMark className="h-3.5 w-3.5 text-ink" />
              Ignore os avisos · Vista o perigo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
