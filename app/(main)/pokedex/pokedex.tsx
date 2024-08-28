"use client";

import { useCallback } from "react";

import queries from "@/app/service/pokemon/queries";
import { usePokemon } from "@/app/service/pokemon/use-pokemon-service";
import { Pokemon } from "@/app/types/pokemon/pokemon";
import PokedexCard from "@/app/ui/pokedex/pokedex-card";
import { useQueries, useQueryClient, UseQueryResult } from "@tanstack/react-query";

// 아래 TODO 해결한 방법
// usePokemon으로 받아온 data (pokemonPages)는 누적된 데이터이기 때문에 마지막 인덱스만을 대상으로 queries.detail() 쿼리를 호출한다
// 하지만, 후처리가 없으면 useQueries가 반환하는 데이터는 새로운 데이터만 반환하기 때문에 이전 데이터를 포함해서 반환하도록
// combine 콜백에서 queryClient.getQueriesData()를 사용해 cache된 이전 데이터를 가져온다.
// combine 콜백은 호출마다 재생성되므로 useCallback으로 감싸 최적화를 적용했다

export default function Pokedex() {
  const queryClient = useQueryClient();
  const { pokemonPages, handleNextPage, isFetchingNextPage } = usePokemon();

  const { data: pokemons, pending } = useQueries({
    queries: pokemonPages
      ? pokemonPages[pokemonPages.length - 1].results.map(({ name }) => ({
          ...queries.detail(name),
          staleTime: Infinity,
        }))
      : [],
    combine: useCallback(
      (results: UseQueryResult<Pokemon, Error>[]) => {
        return {
          data: queryClient.getQueriesData<Pokemon>({
            queryKey: queries.all().queryKey,
            predicate: (query) => query.queryKey.length !== 1,
          }),
          pending: results.some((result) => result.isPending),
        };
      },
      [queryClient],
    ),
  });

  // TODO: 지금 문제가 되는 부분은 nextPage를 불러올 때마다 pokemonEntries는 이전 데이터를 포함해서 데이터를 업데이트하는데
  // 이 데이터를 모두 useQueries로 불러오기 때문에 page를 불러올수록 fetch 시간이 길어진다.
  // 새로 추가되는 부분만 불러오던지 pagination으로 전환하던지 해야할 듯
  // const { pokemonEntries, handleNextPage, isFetchingNextPage, isLoading } = usePokemon();

  // const { data: pokemons, pending } = useQueries({
  //   queries: pokemonEntries
  //     ? pokemonEntries.map((pokemonReference) => ({
  //         ...queries.detail(pokemonReference.name),
  //         staleTime: Infinity,
  //       }))
  //     : [],
  //   combine: useCallback((results) => {
  //     return {
  //       data: results.map((result) => result.data),
  //       pending: results.some((result) => result.isPending),
  //     };
  //   }, []),
  // });
  // const intersectionRef = useRef(null);

  // useIntersectionObserver({
  //   target: intersectionRef,
  //   handleIntersect: handleNextPage,
  // });

  return (
    <main className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-1">
        {pokemons.map(
          ([, pokemon]) => pokemon && <PokedexCard key={pokemon.id} pokemon={pokemon} />,
        )}
      </div>
      <button
        className="rounded-md bg-slate-400 p-2 text-white"
        type="button"
        onClick={handleNextPage}
        disabled={isFetchingNextPage || pending}
      >
        <p>Load More</p>
      </button>
    </main>
  );
}
