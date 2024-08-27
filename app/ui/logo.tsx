import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <Image src="/logo.png" alt="Pokedex logo" width={48} height={48} />
      <p className="text-[36px]">Pokedex</p>
    </div>
  );
}
