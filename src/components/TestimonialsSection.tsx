import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { getSiteReviews } from "@/lib/reviews";

/** Approved Google reviews from the "Reviews" sheet (see src/lib/reviews.ts). */
export default async function TestimonialsSection() {
  const { reviews, stats, loadedAt } = await getSiteReviews();
  return <TestimonialsCarousel reviews={reviews} stats={stats} renderedAt={loadedAt} />;
}
