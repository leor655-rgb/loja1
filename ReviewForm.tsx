import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getReviews, getRelated } from "@/db/queries";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCart } from "@/components/AddToCart";
import { ReviewForm } from "@/components/ReviewForm";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import { formatBRL } from "@/lib/format";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.name + " // RED FLAG",
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const reviews = await getReviews(product.id);
  const related = await getRelated(product, 4);

  const total = reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    n: reviews.filter((r) => r.rating === star).length,
  }));

  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const eyebrow = "UNISSEX STREETWEAR · " + (product.category === "camiseta" ? "Heavy Tee" : "Street Short");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-[10px] font-bold uppercase tracking-widest text-muted">
        <Link href="/" className="hover:text-ink">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link href="/produtos" className="hover:text-ink">
          Catálogo
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badge && (
              <span className="inline-block bg-pine px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white">
                {product.badge}
              </span>
            )}
            <span className="inline-block bg-line px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-ink">
              DROP EXCLUSIVO 🚩
            </span>
          </div>

          <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-terracotta">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-sans font-black text-3xl uppercase tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <Stars value={product.avgRating} size={16} />
            <span className="text-xs font-bold text-muted uppercase tracking-wider">
              {product.avgRating.toFixed(1)} · {total}{" "}
              {total === 1 ? "avaliação" : "avaliações"}
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-sans font-black text-3xl text-ink">
              {formatBRL(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted line-through">
                {formatBRL(product.compareAt as number)}
              </span>
            )}
            <span className="text-xs font-bold uppercase tracking-widest text-muted">/ peça individual</span>
          </div>

          <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <AddToCart product={product} />

          <div className="mt-8 rounded-none border border-line bg-cream-2/70 p-5">
            <h3 className="font-sans font-black text-sm uppercase tracking-widest text-ink flex items-center gap-2">
              <span>🚩</span> FICHA TÉCNICA
            </h3>
            <ul className="detail-list mt-3 space-y-2 text-xs text-ink-soft font-medium">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-[10px] font-bold uppercase tracking-wider text-muted">
            <div className="border border-line bg-cream p-3">
              <p className="font-black text-ink">Envio Rápido</p>
              <p className="mt-1">Todo o Brasil</p>
            </div>
            <div className="border border-line bg-cream p-3">
              <p className="font-black text-ink">Devolução</p>
              <p className="mt-1">30 dias sem custo</p>
            </div>
            <div className="border border-line bg-cream p-3">
              <p className="font-black text-ink">Original</p>
              <p className="mt-1">🚩 RED FLAG</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------- REVIEWS ---------------------------- */}
      <section className="mt-20 border-t border-line pt-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
          <div>
            <Reveal>
              <h2 className="font-sans font-black text-2xl uppercase tracking-wider text-ink">
                Avaliações ({total})
              </h2>
              <div className="mt-5 flex items-center gap-4">
                <span className="font-sans font-black text-5xl text-ink">
                  {total ? product.avgRating.toFixed(1) : "—"}
                </span>
                <div>
                  <Stars value={product.avgRating} size={18} />
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted">
                    {total} {total === 1 ? "opinião" : "opiniões"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {distribution.map((d) => {
                  const pct = total ? (d.n / total) * 100 : 0;
                  return (
                    <div key={d.star} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                      <span className="w-3 text-muted">{d.star}</span>
                      <div className="h-2 flex-1 bg-cream-2">
                        <div
                          className="h-full bg-pine"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-muted">{d.n}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <ReviewForm productId={product.id} />
            </Reveal>

            <div className="mt-8 space-y-5">
              {reviews.length === 0 && (
                <p className="text-xs font-bold text-muted uppercase tracking-widest">
                  Ainda não há avaliações neste drop. Deixe sua opinião realista abaixo.
                </p>
              )}
              {reviews.map((r) => (
                <Reveal key={r.id}>
                  <article className="border border-line bg-cream p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center bg-pine text-white text-xs font-black">
                          {r.author.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="text-sm font-bold uppercase text-ink">{r.author}</p>
                          <p className="text-[10px] font-bold uppercase text-muted tracking-widest flex items-center gap-1">
                            {r.verified ? (
                              <>
                                <span className="text-pine">🚩</span> COMPRA VERIFICADA
                              </>
                            ) : (
                              "AVALIAÇÃO GERAL"
                            )}
                          </p>
                        </div>
                      </div>
                      <Stars value={r.rating} size={12} />
                    </div>
                    <h4 className="mt-3 font-sans font-bold text-base uppercase text-ink">
                      {r.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                      {r.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- RELATED ---------------------------- */}
      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-14">
          <Reveal>
            <h2 className="font-sans font-black text-2xl uppercase tracking-wider text-ink">
              Combine seu Drop // 🚩
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
