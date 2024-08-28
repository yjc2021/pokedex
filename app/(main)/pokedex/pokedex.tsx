"use client";

import queries from "@/app/service/pokemon/queries";
import { usePokemon } from "@/app/service/pokemon/use-pokemon-service";
import PokedexCard from "@/app/ui/pokedex/pokedex-card";
import { useQueries } from "@tanstack/react-query";

export default function Pokedex() {
  const { pokemonEntries, handleNextPage, isFetchingNextPage, hasNextPage } = usePokemon();

  const queryResults = useQueries({
    queries: pokemonEntries
      ? pokemonEntries.map((reference) => ({
          ...queries.detail(reference.name),
          staleTime: Infinity,
        }))
      : [],
  });

  return (
    <main className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-1">
        {queryResults.map(({ isLoading, data }, index) => {
          if (isLoading || !data)
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`skeleton-${index}`}
                className="h-[130px] w-[110px] rounded-md bg-slate-100"
              />
            );
          return <PokedexCard key={data.id} pokemon={data} />;
        })}
      </div>
      {hasNextPage && (
        <button
          className="rounded-md bg-slate-400 p-2 text-white"
          type="button"
          onClick={handleNextPage}
          disabled={isFetchingNextPage}
        >
          <p>Load More</p>
        </button>
      )}
    </main>
  );
}
