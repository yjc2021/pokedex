import { parseOffset } from "@/app/lib/utils";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import PokemonService from "./pokemon-service";

const queryKeys = {
  all: () => ["pokemon"],
  detail: (pokemonId: string) => [...queryKeys.all(), pokemonId] as const,
};

const queries = {
  all: () =>
    infiniteQueryOptions({
      queryKey: queryKeys.all(),
      queryFn: ({ pageParam }) => PokemonService.getPokemon({ offset: pageParam }),
      getNextPageParam: (lastPage) => parseOffset(lastPage.next),
      initialPageParam: 0,
    }),
  detail: (pokemonId: string) =>
    queryOptions({
      queryKey: queryKeys.detail(pokemonId),
      queryFn: () => PokemonService.getPokemonDetail(pokemonId),
    }),
};

export default queries;
