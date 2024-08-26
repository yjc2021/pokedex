import { NamedAPIResource } from "./common";

type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};

type VersionGameIndex = {
  game_index: number;
  version: NamedAPIResource;
};

type PokemonHeldItemVersion = {
  rarity: number;
  version: NamedAPIResource;
};

type PokemonHeldItem = {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
};

type PokemonMove = {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    version_group: NamedAPIResource;
    move_learn_method: NamedAPIResource;
  }[];
};

type PokemonSprites = {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_shiny: string;
  front_shiny_female?: string;
  other: {
    dream_world: {
      front_default: string;
      front_female?: string;
    };
    home: {
      front_default: string;
      front_female?: string;
      front_shiny: string;
      front_shiny_female?: string;
    };
    official_artwork: {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string;
      back_female?: string;
      back_shiny: string;
      back_shiny_female?: string;
      front_default: string;
      front_shiny: string;
      front_shiny_female?: string;
    };
  };
};

type PokemonCries = {
  latest: string;
  legacy: string;
};

type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
};

type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

type PokemonTypePast = {
  generation: NamedAPIResource;
  types: PokemonType[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  cries: PokemonCries;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: PokemonTypePast[];
};
