import queries from "@/app/service/pokemon/queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import PokedexDetail from "./pokedex-detail";

type Props = {
  params: {
    pokemonId: string;
  };
};

async function prefetchPokemonDetail(pokemonId: string) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queries.detail(pokemonId));

  return queryClient;
}

export default async function PokedexDetailPage({ params }: Props) {
  const { pokemonId } = params;

  const queryClient = await prefetchPokemonDetail(pokemonId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokedexDetail pokemonId={pokemonId} />
    </HydrationBoundary>
  );
}
