import { db } from "./index";
import { products, reviews, orders, type Product, type OrderItem } from "./schema";
import { eq, desc, asc, and, sql, inArray, avg, count } from "drizzle-orm";
import { ensureSeed } from "./seed";

export type ProductFilters = {
  category?: string;
  gender?: string;
  sort?: "relevance" | "price-asc" | "price-desc" | "rating" | "newest";
  q?: string;
};

export type ProductWithStats = Product & {
  avgRating: number;
  reviewCount: number;
};

/** Returns products with aggregated rating/count from the reviews table. */
export async function getProducts(
  filters: ProductFilters = {},
): Promise<ProductWithStats[]> {
  await ensureSeed();

  const conditions = [];
  if (filters.category && filters.category !== "todos") {
    conditions.push(eq(products.category, filters.category));
  }
  if (filters.gender && filters.gender !== "todos") {
    conditions.push(eq(products.gender, filters.gender));
  }
  if (filters.q) {
    conditions.push(sql`${products.name} ILIKE ${`%${filters.q}%`}`);
  }
  const where = conditions.length ? and(...conditions) : undefined;

  let orderBy;
  switch (filters.sort) {
    case "price-asc":
      orderBy = asc(products.price);
      break;
    case "price-desc":
      orderBy = desc(products.price);
      break;
    case "rating":
      orderBy = desc(products.rating);
      break;
    case "newest":
      orderBy = desc(products.createdAt);
      break;
    default:
      orderBy = desc(products.featured);
  }

  const rows = await db
    .select()
    .from(products)
    .where(where)
    .orderBy(orderBy, desc(products.rating));

  return attachStats(rows);
}

async function attachStats(rows: Product[]): Promise<ProductWithStats[]> {
  if (rows.length === 0) {
    return rows.map((r) => ({ ...r, avgRating: r.rating, reviewCount: r.reviewCount }));
  }
  const stats = await db
    .select({
      productId: reviews.productId,
      avg: avg(reviews.rating),
      cnt: count(reviews.id),
    })
    .from(reviews)
    .where(inArray(reviews.productId, rows.map((r) => r.id)))
    .groupBy(reviews.productId);

  const map = new Map(stats.map((s) => [s.productId, s]));
  return rows.map((r) => {
    const s = map.get(r.id);
    return {
      ...r,
      avgRating: s ? Number(s.avg) : r.rating,
      reviewCount: s ? Number(s.cnt) : r.reviewCount,
    };
  });
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithStats | null> {
  await ensureSeed();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  if (rows.length === 0) return null;
  const [withStats] = await attachStats(rows);
  return withStats;
}

export async function getFeatured(limit = 8): Promise<ProductWithStats[]> {
  const all = await getProducts({ sort: "relevance" });
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getRelated(
  product: Product,
  limit = 4,
): Promise<ProductWithStats[]> {
  const all = await getProducts({ gender: product.gender });
  return all.filter((p) => p.id !== product.id).slice(0, limit);
}

export async function getReviews(productId: number) {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt));
}

export type NewReviewInput = {
  productId: number;
  author: string;
  rating: number;
  title: string;
  body: string;
};

export async function addReview(input: NewReviewInput) {
  const [inserted] = await db
    .insert(reviews)
    .values({
      productId: input.productId,
      author: input.author,
      rating: input.rating,
      title: input.title,
      body: input.body,
      verified: false,
    })
    .returning();

  // Recompute product rating + review count.
  const [stats] = await db
    .select({ avg: avg(reviews.rating), cnt: count(reviews.id) })
    .from(reviews)
    .where(eq(reviews.productId, input.productId));

  await db
    .update(products)
    .set({
      rating: stats ? Number(stats.avg) : 0,
      reviewCount: stats ? Number(stats.cnt) : 0,
    })
    .where(eq(products.id, input.productId));

  return inserted;
}

export type NewOrderInput = {
  customerName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  items: OrderItem[];
};

export async function createOrder(input: NewOrderInput) {
  const total = input.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const [order] = await db
    .insert(orders)
    .values({
      customerName: input.customerName,
      email: input.email,
      address: input.address,
      city: input.city,
      state: input.state,
      postalCode: input.postalCode,
      total,
      items: input.items,
    })
    .returning();
  return order;
}

export async function getOrder(id: number) {
  const [order] = await db.select().from(orders).where(eq(orders.id, id));
  return order ?? null;
}
