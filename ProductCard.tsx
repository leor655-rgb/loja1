import Link from "next/link";
import { getFeatured } from "@/db/queries";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import { FlagMark } from "@/components/FlagMark";
import { Marquee } from "@/components/Marquee";

const HERO_IMG =
  "https://images.pexels.com/photos/18815964/pexels-photo-18815964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100";
const STORY_IMG =
  "https://images.pexels.com/photos/33346142/pexels-photo-33346142.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600";

const COLLECTIONS = [
  {
    kicker: "Heavy cotton 260g/m²",
    title: "Camisetas Heavy",
    href: "/produtos?categoria=camiseta",
    img: "https://images.pexels.com/photos/30710033/pexels-photo-30710033.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
  },
  {
    kicker: "Cargo · Fleece · Nylon",
    title: "Shorts Street",
    href: "/produtos?categoria=short",
    img: "https://images.pexels.com/photos/29205183/pexels-photo-29205183.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
  },
];

const MANIFESTO = [
  ["01", "Heavy cotton de verdade", "Gramatura 260g/m², caimento boxy estruturado e gola grossa que não deforma."],
  ["02", "Unissex de rua", "Grade ampla pensada para todos os corpos. Sem seção masculina ou feminina — só streetwear."],
  ["03", "Tiragem única", "Drops numerados, vendidos em unidades. Quando esgota, não repõe."],
  ["04", "Envio expresso", "Postagem em até 24h com rastreio para todo o Brasil."],
] as const;

const TICKER_BONE = [
  "RED FLAG STREETWEAR",
  "DROP 01 NO AR",
  "VENDIDO EM UNIDADES",
  "HEAVY COTTON 260GSM",
  "UNISSEX",
  "IGNORE OS AVISOS",
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeatured(8);

  return (
    <div>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="grid-bg relative grid min-h-[92vh] grid-cols-1 border-b border-line bg-cream lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-16">
          <Reveal>
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-terracotta">
              <FlagMark className="h-4 w-4 text-ink" />
              Streetwear autoral · Brasil
            </p>

            <h1 className="mt-6 font-display text-[clamp(3.2rem,8vw,7rem)] uppercase leading-[0.9] text-ink">
              Ignore os
              <br />
              <span className="text-outline">avisos.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft">
              Camisetas heavyweight e shorts street com modelagem unissex.
              Produzidos em tiragem única, vendidos em unidades — para quem
              trata cada peça como colecionável.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/produtos" className="btn btn-dark">
                Acessar o drop
              </Link>
              <Link href="/produtos?categoria=camiseta" className="btn btn-outline">
                Camisetas heavy
              </Link>
            </div>

            <div className="mt-12 flex divide-x divide-line border-y border-line">
              <div className="py-4 pr-8">
                <p className="font-display text-3xl text-ink">07</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted">
                  peças no drop
                </p>
              </div>
              <div className="py-4 px-8">
                <p className="font-display text-3xl text-ink">
                  260<span className="text-base">g/m²</span>
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted">
                  algodão heavy
                </p>
              </div>
              <div className="py-4 pl-8">
                <p className="font-display text-3xl text-terracotta">4.8★</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted">
                  avaliação média
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="img-zoom relative min-h-[56vh] border-line lg:min-h-full lg:border-l">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMG}
            alt="Campanha RED FLAG — streetwear nas ruas"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.65] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/20" />

          {/* Selo carimbado */}
          <div className="absolute right-6 top-8 rotate-6 border-2 border-terracotta bg-cream/80 px-4 py-2 backdrop-blur-sm">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-terracotta">
              Unidades limitadas
            </p>
          </div>

          {/* Faixa do drop */}
          <div className="absolute inset-x-0 bottom-14 -rotate-2">
            <div className="bg-terracotta py-2.5 text-center font-display text-xl uppercase tracking-[0.15em] text-black shadow-[0_18px_50px_rgba(220,38,38,0.35)]">
              DROP 01 // NO AR AGORA
            </div>
          </div>
        </div>
      </section>

      {/* Letreiro invertido */}
      <Marquee
        items={TICKER_BONE}
        reverse
        className="border-y border-black/30 bg-bone py-3 font-display text-2xl uppercase tracking-[0.12em] text-black"
      />

      {/* ----------------------------- COLEÇÕES ----------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-terracotta">
                <FlagMark className="h-4 w-4 text-ink" />
                Corte unissex
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
                As duas armas do drop
              </h2>
            </div>
            <Link
              href="/produtos"
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft underline decoration-terracotta decoration-2 underline-offset-8 transition-colors hover:text-terracotta"
            >
              Catálogo completo →
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <Link
                href={c.href}
                className="group relative block aspect-[16/11] overflow-hidden border border-line bg-cream-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover brightness-[0.55] contrast-[1.05] transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-terracotta">
                      {c.kicker}
                    </span>
                    <h3 className="mt-1 font-display text-3xl uppercase tracking-wide text-ink">
                      {c.title}
                    </h3>
                  </div>
                  <span className="grid h-11 w-11 place-items-center bg-terracotta text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------- DESTAQUES ----------------------------- */}
      <section className="border-y border-line bg-cream-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-terracotta px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-black">
                  <FlagMark className="h-3.5 w-3.5 text-black" />
                  Esgotando rápido
                </div>
                <h2 className="mt-4 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
                  Mais pedidos do drop
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
                As peças que a rua escolheu primeiro. Cada unidade é contada —
                sem reposição.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 80}>
                <ProductCard product={product} priority={i < 4} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/produtos" className="btn btn-outline px-10">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------- MANIFESTO (invertido) --------------------- */}
      <section className="bg-bone text-black">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-pine">
              <FlagMark className="h-4 w-4 text-black" />
              Manifesto
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5.5vw,4.8rem)] uppercase leading-[0.95]">
              Nascido nas ruas.
              <br />
              <span className="text-outline-dark">Feito pra durar.</span>
            </h2>
            <p className="mt-7 max-w-md text-sm leading-relaxed font-medium text-black/70">
              A RED FLAG nasceu do incômodo com o básico descartável. Cada
              drop é desenhado em tiragem única, com algodão heavyweight,
              costura reforçada e a bandeira vermelha como assinatura. A gente
              não segue tendência — a gente iça a bandeira.
            </p>
            <div className="tape mt-10 h-3 w-40" aria-hidden="true" />
          </Reveal>

          <Reveal delay={120}>
            <ol className="divide-y divide-black/15 border-y border-black/20">
              {MANIFESTO.map(([n, title, body]) => (
                <li key={n} className="group flex gap-6 py-6 transition-colors">
                  <span className="font-display text-3xl text-pine transition-transform duration-300 group-hover:-translate-y-1">
                    {n}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.14em]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/60">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ STORY ------------------------------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="img-zoom relative h-[62vh] min-h-[440px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STORY_IMG}
            alt="Atitude RED FLAG nas ruas"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.45] contrast-[1.15]"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Reveal>
            <div className="max-w-3xl text-center">
              <FlagMark className="mx-auto h-10 w-10 text-ink" />
              <h2 className="mt-6 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] uppercase leading-tight tracking-wide text-ink">
                “O luxo real é a coragem de ignorar
                <span className="text-terracotta"> todos os avisos de perigo.</span>”
              </h2>
              <Link
                href="/produtos"
                className="btn mt-9 bg-ink text-black hover:bg-white"
              >
                Garantir minha peça
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------- NAS RUAS / SOCIAL ----------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-terracotta">
                #REDFLAGNASRUAS
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
                Quem já içou a bandeira
              </h2>
            </div>
            <div className="flex items-center gap-3 border border-line px-4 py-3">
              <Stars value={4.8} size={15} />
              <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">
                4.8 · +5.000 pedidos
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "https://images.pexels.com/photos/9157771/pexels-photo-9157771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700",
            "https://images.pexels.com/photos/8262223/pexels-photo-8262223.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700",
            "https://images.pexels.com/photos/25315934/pexels-photo-25315934.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700",
            "https://images.pexels.com/photos/11311403/pexels-photo-11311403.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700",
          ].map((src, i) => (
            <Reveal key={src} delay={i * 90}>
              <div className="img-zoom group relative aspect-square overflow-hidden border border-line bg-cream-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Cliente RED FLAG nas ruas"
                  loading="lazy"
                  className="h-full w-full object-cover brightness-[0.75] contrast-[1.05]"
                />
                <span className="absolute bottom-3 left-3 bg-black/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  @redflag.co
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
