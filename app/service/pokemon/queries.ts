import PokemonService from "./pokemon-service";

const queryKeys = {
  all: ["pokemon"] as const,
  detail: (pokemonId: string) => [...queryKeys.all, pokemonId] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => PokemonService.getPokemon(),
  }),
  detail: (pokemonId: string) => ({
    queryKey: queryKeys.detail(pokemonId),
    queryFn: () => PokemonService.getPokemonDetail(pokemonId),
  }),
};

export default queryOptions;
