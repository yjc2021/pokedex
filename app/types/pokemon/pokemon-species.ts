import { NamedAPIResource } from "./common";

type Name = {
  name: string;
  language: NamedAPIResource;
};

type PokemonSpeciesDexEntry = {
  entry_number: number;
  pokedex: NamedAPIResource;
};

type FlavorText = {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
};

type FormDescription = {
  description: string;
  language: NamedAPIResource;
};

type Genus = {
  genus: string;
  language: NamedAPIResource;
};

type PokemonSpeciesVariety = {
  is_default: boolean;
  pokemon: NamedAPIResource;
};

export type PokemonSpecies = {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResource;
  pokedex_numbers: PokemonSpeciesDexEntry[];
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolves_from_species: NamedAPIResource;
  evolution_chain: NamedAPIResource;
  habitat?: NamedAPIResource;
  generation: NamedAPIResource;
  names: Name[];
  flavor_text_entries: FlavorText[];
  form_descriptions: FormDescription[];
  genera: Genus[];
  varieties: PokemonSpeciesVariety[];
};
