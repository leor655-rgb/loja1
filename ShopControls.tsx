import Link from "next/link";
import { getProducts, type ProductFilters } from "@/db/queries";
import { ProductCard } from "@/components/ProductCard";
import { ShopControls } from "@/components/ShopControls";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const categoria = first(sp.categoria);
  const ordenarRaw = first(sp.ordenar) ?? "relevance";
  const busca = first(sp.busca);

  const sort = (["relevance", "price-asc", "price-desc", "rating", "newest"].includes(
    ordenarRaw,
  )
    ? ordenarRaw
    : "relevance") as ProductFilters["sort"];

  const products = await getProducts({
    category: categoria,
    sort,
    q: busca,
  });

  const titleParts: string[] = [];
  if (categoria === "camiseta") titleParts.push("Camisetas Heavy");
  if (categoria === "short") titleParts.push("Shorts Streetwear");
  const title =
    busca && busca.trim()
      ? `Resultados para “${busca.trim()}”`
      : titleParts.length
        ? titleParts.join(" · ")
        : "Coleção de Streetwear Unissex";

  return (
    <div>
      <section className="border-b border-line bg-cream-2">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <nav className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted">
            <Link href="/" className="hover:text-ink">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Catálogo</span>
          </nav>
          <h1 className="font-sans font-black text-3xl uppercase tracking-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
            Todas as peças da Red Flag são desenvolvidas com modelagem unissex, tecidos encorpados de luxo e construídas para durar. Vendidas estritamente em unidades.
          </p>
        </div>
      </section>

      <ShopControls total={products.length} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-none border border-line bg-cream-2/50 py-24 text-center">
            <p className="font-sans font-bold text-2xl uppercase text-ink">
              Peça esgotada ou não encontrada
            </p>
            <p className="mt-2 text-sm text-muted">
              Tente redefinir os filtros ou busque por outro termo.
            </p>
            <Link href="/produtos" className="btn btn-dark mt-6">
              Limpar filtros
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 60}>
                <ProductCard product={product} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
