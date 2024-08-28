import queries from "@/app/service/pokemon/queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import Pokedex from "./pokedex";

async function prefetchFirstPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({ ...queries.all(), pages: 2 });

  const queryData = queryClient.getQueryData(queries.all().queryKey);

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
