import EvolutionChainService from "./evolution-chain-service";

const queryKeys = {
  all: ["evolution-chain"] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => EvolutionChainService.getEvolutionChain(),
  }),
  detail: (evolutionChainId: string) => ({
    queryKey: [...queryKeys.all, evolutionChainId] as const,
    queryFn: () => EvolutionChainService.getEvolutionChainDetail(evolutionChainId),
  }),
};

export default queryOptions;
