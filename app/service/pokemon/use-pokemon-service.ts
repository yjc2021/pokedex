import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import queryOptions from "./queries";

export function usePokemon() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } = useInfiniteQuery({
    ...queryOptions.all(),
    select: (returnedData) => returnedData.pages.flatMap((page) => page.results),
    staleTime: Infinity,
  });

  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    pokemonEntries: data,
    handleNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
}

export function usePokemonDetail(pokemonId: string) {
  return useQuery(queryOptions.detail(pokemonId));
}
