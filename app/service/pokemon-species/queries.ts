import PokemonSpeciesService from "@/app/service/pokemon-species/pokemon-species-service";

const queryKeys = {
  all: ["pokemon-species"] as const,
  detail: (speciesId: string) => [...queryKeys.all, speciesId] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => PokemonSpeciesService.getPokemonSpecies(),
  }),
  detail: (speciesId: string) => ({
    queryKey: queryKeys.detail(speciesId),
    queryFn: () => PokemonSpeciesService.getPokemonSpeciesDetail(speciesId),
  }),
};

export default queryOptions;
