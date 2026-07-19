import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <p className="text-sm uppercase tracking-[0.24em] text-terracotta">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
        Página não encontrada
      </h1>
      <p className="mt-3 text-muted">
        O link pode estar quebrado ou o produto saiu de catálogo.
      </p>
      <Link href="/" className="btn btn-dark mt-7">
        Voltar ao início
      </Link>
    </div>
  );
}
