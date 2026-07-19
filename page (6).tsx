"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { cartItemKey } from "@/lib/types";
import { formatBRL } from "@/lib/format";

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

const FREE_SHIPPING = 19900;
const SHIPPING_FEE = 1990;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear, loaded } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Falha ao finalizar o pedido.");
      }
      const data = await res.json();
      clear();
      router.push(`/order/${data.orderId}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    }
  };

  if (loaded && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
        <h1 className="font-display text-3xl text-ink">
          Sua sacola está vazia
        </h1>
        <p className="mt-3 text-muted">
          Adicione algumas peças antes de finalizar a compra.
        </p>
        <Link href="/produtos" className="btn btn-dark mt-6">
          Explorar a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-ink">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Checkout</span>
      </nav>

      <h1 className="font-display text-4xl text-ink sm:text-5xl">Checkout</h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
        {/* Form */}
        <form onSubmit={submit} className="space-y-8">
          <section>
            <h2 className="font-display text-2xl text-ink">Contato</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-ink">
                  Nome completo
                </label>
                <input
                  required
                  value={form.customerName}
                  onChange={set("customerName")}
                  className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-ink"
                  placeholder="Maria Silva"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-ink">
                  E-mail
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-ink"
                  placeholder="voce@email.com"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">Endereço de entrega</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-ink">
                  Endereço
                </label>
                <input
                  required
                  value={form.address}
                  onChange={set("address")}
                  className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-ink"
                  placeholder="Rua, número, complemento"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  Cidade
                </label>
                <input
                  required
                  value={form.city}
                  onChange={set("city")}
                  className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-ink"
                  placeholder="São Paulo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">
                    Estado
                  </label>
                  <select
                    required
                    value={form.state}
                    onChange={set("state")}
                    className="w-full rounded-xl border border-line bg-cream px-3 py-3 text-sm outline-none focus:border-ink"
                  >
                    <option value="">UF</option>
                    {UFS.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">
                    CEP
                  </label>
                  <input
                    required
                    value={form.postalCode}
                    onChange={set("postalCode")}
                    className="w-full rounded-xl border border-line bg-cream px-3 py-3 text-sm outline-none focus:border-ink"
                    placeholder="01000-000"
                  />
                </div>
              </div>
            </div>
          </section>

          {error && (
            <p className="rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending" || items.length === 0}
            className="btn btn-dark w-full py-3.5 disabled:opacity-60"
          >
            {status === "sending" ? "Processando..." : "Finalizar compra"}
          </button>
          <p className="text-center text-xs text-muted">
            Pagamento simulado para demonstração · ambiente seguro
          </p>
        </form>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-line bg-cream-2/50 p-6">
            <h2 className="font-display text-2xl text-ink">Resumo</h2>
            <ul className="mt-5 space-y-4">
              {items.map((item) => {
                const key = cartItemKey(item);
                return (
                  <li key={key} className="flex gap-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] text-cream">
                        {item.qty}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted">
                        {item.color} · Tam. {item.size}
                      </p>
                      <p className="mt-1 text-sm text-ink">
                        {formatBRL(item.price * item.qty)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-ink">{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Frete</span>
                <span className="text-ink">
                  {shipping === 0 ? "Grátis" : formatBRL(shipping)}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-3">
                <span className="font-medium text-ink">Total</span>
                <span className="font-display text-2xl text-ink">
                  {formatBRL(total)}
                </span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="mt-3 text-xs text-muted">
                Faltam {formatBRL(FREE_SHIPPING - subtotal)} para frete grátis.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
