"use client";

import Image from "next/image";

import { usePokemonDetail } from "@/app/service/pokemon/use-pokemon-service";

type Props = {
  pokemonId: string;
};

export default function PokedexDetail({ pokemonId }: Props) {
  const { data: pokemonDetail } = usePokemonDetail(pokemonId);

  return (
    <main>
      <Image
        src={`${pokemonDetail?.sprites.front_default}`}
        alt={`Image of ${pokemonDetail?.name}`}
        width={150}
        height={150}
      />
      <h1>{pokemonDetail?.name}</h1>
      <p>{pokemonDetail?.height}</p>
      <p>{pokemonDetail?.weight}</p>
    </main>
  );
}
