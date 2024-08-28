import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

import { formatName } from "@/app/lib/utils";
import { Pokemon } from "@/app/types/pokemon/pokemon";

type Props = {
  pokemon: Pokemon;
};

// API 구조상 새 페이지마다 rerender를 방지할 수 없는 상황이라 판단되어
// PokedexCard의 렌더링을 최적화하기 위해 memo를 사용했다
const PokedexCard = memo(function PokedexCard({ pokemon }: Props) {
  // const renderTimes = useRef(0);
  // console.log(`render: ${renderTimes.current++}`);
  return (
    <Link
      href={`/pokedex/${pokemon.name}`}
      key={pokemon.id}
      className="group relative flex h-auto w-fit flex-col items-center rounded-md p-1 duration-100 hover:bg-slate-100"
    >
      <div className="absolute left-0 top-0 h-3 w-3 border-l-4 border-t-4 border-yellow-500 opacity-0 transition-opacity duration-100 group-hover:opacity-100" />
      <div className="absolute right-0 top-0 h-3 w-3 border-r-4 border-t-4 border-yellow-500 opacity-0 transition-opacity duration-100 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 h-3 w-3 border-b-4 border-l-4 border-yellow-500 opacity-0 transition-opacity duration-100 group-hover:opacity-100" />
      <div className="absolute bottom-0 right-0 h-3 w-3 border-b-4 border-r-4 border-yellow-500 opacity-0 transition-opacity duration-100 group-hover:opacity-100" />
      <Image
        src={pokemon.sprites.front_default}
        alt={`Image of ${pokemon.name}`}
        width={100}
        height={100}
      />
      <p className="text-xs">{formatName(pokemon.name)}</p>
    </Link>
  );
});

export default PokedexCard;
