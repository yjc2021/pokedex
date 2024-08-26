import { useQuery } from "@tanstack/react-query";

import queryOptions from "./queries";

export function useEvolutionChain() {
  return useQuery(queryOptions.all());
}

export function useEvolutionChainDetail(evolutionChainId: string) {
  return useQuery(queryOptions.detail(evolutionChainId));
}
