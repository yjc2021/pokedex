import { useQuery } from "@tanstack/react-query";

import queryOptions from "./queries";

export function usePokemon() {
  return useQuery(queryOptions.all());
}

export function usePokemonDetail(pokemonId: string) {
  return useQuery(queryOptions.detail(pokemonId));
}
