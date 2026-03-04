export const dynamic = "force-dynamic";

import { Container } from "@pruthvik007/components";
import { getMediaByCategory } from "@/lib/tmdb/api";
import { CATEGORY_LABELS, CATEGORIES } from "@/lib/tmdb/constants";
import { InfiniteCategoryPage } from "@/components/infinite-category-page";
import { notFound } from "next/navigation";
import type { CategoryType } from "@/lib/tmdb/types";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function MoviesCategoryPage({ params }: Props) {
  const { category } = await params;

  if (!CATEGORIES.includes(category as CategoryType)) {
    notFound();
  }

  const categoryType = category as CategoryType;
  const data = await getMediaByCategory("movies", categoryType, { page: 1 });

  return (
    <Container size="lg">
      <h1 className="text-2xl font-bold mb-6 text-center">{CATEGORY_LABELS[categoryType]} Movies</h1>
      <InfiniteCategoryPage
        mediaType="movies"
        category={categoryType}
        initialItems={data.results}
        initialTotalPages={data.total_pages}
      />
    </Container>
  );
}
