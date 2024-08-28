import queries from "@/app/service/pokemon/queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import Pokedex from "./pokedex";

async function prefetchFirstPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({ ...queries.all(), pages: 2 });

  const queryData = queryClient.getQueryData(queries.all().queryKey);
  // Option 1 (Sequentially Prefetching Each Result)
  // This method will prefetch each result one by one,
  // waiting for each prefetchQuery to complete before moving to the next

  // for(const {results} of pages) {
  //   await Promise.all(
  //     results.map((pokemonReference) =>
  //       queryClient.prefetchQuery({
  //         queryKey: queryOptions.detail(pokemonReference.name).queryKey,
  //         queryFn: () => queryOptions.detail(pokemonReference.name).queryFn(),
  //       })
  //     )
  //   )
  // };

  // Option 2 (Prefetching All Results in Parallel per Page)
  // This method will prefetch all results for a single page in parallel, then move to the next page.

  // for (const { results } of pages) {
  //   for (const result of results) {
  //     await queryClient.prefetchQuery({
  //       queryKey: queryOptions.detail(result.name).queryKey,
  //       queryFn: () => queryOptions.detail(result.name).queryFn(),
  //     });
  //   }
  // }

  // Option 3 (All Pages and Results in Parallel)
  // This method will prefetch all results across all pages in parallel, which is the fastest approach but might overwhelm your network or API if there are many results.

  if (queryData) {
    const { pages } = queryData;
    await Promise.all(
      pages.flatMap(({ results }) =>
        results.map((pokemonReference) =>
          queryClient.prefetchQuery(queries.detail(pokemonReference.name)),
        ),
      ),
    );
  }

  return queryClient;
}

export default async function Page() {
  const queryClient = await prefetchFirstPage();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Pokedex />
    </HydrationBoundary>
  );
}
