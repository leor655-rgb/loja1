import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/db/queries";
import { formatBRL } from "@/lib/format";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function OrderPage({ params }: Params) {
  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isFinite(orderId)) notFound();

  const order = await getOrder(orderId);
  if (!order) notFound();

  const items = order.items ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-pine text-cream">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Pedido confirmado!
        </h1>
        <p className="mt-3 max-w-md text-muted">
          Obrigado, {order.customerName.split(" ")[0]}. Seu pedido{" "}
          <strong className="text-ink">#{order.id}</strong> foi recebido e já
          estamos preparando o envio.
        </p>
      </div>

      <div className="mt-12 rounded-3xl border border-line bg-cream-2/50 p-6 sm:p-8">
        <h2 className="font-display text-2xl text-ink">Resumo do pedido</h2>
        <ul className="mt-5 divide-y divide-line">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-4 py-4">
              <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">
                  {item.name}
                </p>
                <p className="text-xs text-muted">
                  {item.color} · Tam. {item.size} · {item.qty} un.
                </p>
              </div>
              <span className="text-sm text-ink">
                {formatBRL(item.price * item.qty)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="font-medium text-ink">Total pago</span>
          <span className="font-display text-2xl text-ink">
            {formatBRL(order.total)}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-cream p-6">
          <h3 className="font-display text-lg text-ink">Envio para</h3>
          <p className="mt-2 text-sm text-ink-soft">
            {order.customerName}
            <br />
            {order.address}
            <br />
            {order.city} · {order.state} · {order.postalCode}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-cream p-6">
          <h3 className="font-display text-lg text-ink">Acompanhe</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Enviamos o código de rastreio para{" "}
            <span className="text-ink">{order.email}</span> em até 24h.
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/produtos" className="btn btn-dark">
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}
