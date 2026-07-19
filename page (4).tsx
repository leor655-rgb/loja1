import { db } from "@/db";
import { products } from "@/db/schema";
import { addReview } from "@/db/queries";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const data = body as {
    productId?: number;
    author?: string;
    rating?: number;
    title?: string;
    body?: string;
  };

  const productId = Number(data.productId);
  const rating = Number(data.rating);
  const author = (data.author ?? "").trim();
  const title = (data.title ?? "").trim();
  const reviewBody = (data.body ?? "").trim();

  if (
    !Number.isFinite(productId) ||
    !Number.isFinite(rating) ||
    rating < 1 ||
    rating > 5 ||
    author.length < 2 ||
    title.length < 2 ||
    reviewBody.length < 4
  ) {
    return Response.json(
      { error: "Dados da avaliação incompletos ou inválidos." },
      { status: 400 },
    );
  }

  const [exists] = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!exists) {
    return Response.json({ error: "Produto não encontrado." }, { status: 404 });
  }

  const inserted = await addReview({
    productId,
    author: author.slice(0, 80),
    rating: Math.round(rating),
    title: title.slice(0, 120),
    body: reviewBody.slice(0, 1000),
  });

  return Response.json({ ok: true, review: inserted }, { status: 201 });
}
