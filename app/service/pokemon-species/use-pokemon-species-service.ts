import { useQuery } from "@tanstack/react-query";

import queryOptions from "./queries";

export function usePokemonSpecies() {
  return useQuery(queryOptions.all());
}

export function usePokemonSpeciesDetail(speciesId: string) {
  return useQuery(queryOptions.detail(speciesId));
}
