export const revalidate = 3600;

import { Container } from "@pruthvik007/components";
import { getMediaByCategory } from "@/lib/tmdb/api";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/tmdb/constants";
import { SampleCategoryMedia } from "@/components/sample-category-media";
import type { CategoryType } from "@/lib/tmdb/types";

export default async function HomePage() {
  const categoryData = await Promise.all(
    CATEGORIES.map(async (category: CategoryType) => {
      const data = await getMediaByCategory("movies", category, { page: 1 });
      return { category, items: data.results };
    })
  );

  return (
    <Container size="lg">
      <div className="flex flex-col gap-8">
        {categoryData.map(({ category, items }) => (
          <SampleCategoryMedia
            key={category}
            title={CATEGORY_LABELS[category]}
            category={category}
            initialItems={items}
          />
        ))}
      </div>
    </Container>
  );
}
