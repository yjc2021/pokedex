import Service from "@/app/service/service";
import { NamedAPIResource } from "@/app/types/pokemon/common";
import { Pokemon } from "@/app/types/pokemon/pokemon";

type GetPokemonRequest = {
  offset?: number;
  limit?: number;
};

type GetPokemonResponse = {
  count: number;
  next: string;
  previous?: string;
  results: NamedAPIResource[];
};
class PokemonService extends Service {
  getPokemon({ offset = 0, limit = 20 }: GetPokemonRequest) {
    return this.http.get<GetPokemonResponse>(`/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetail(pokemonId: string) {
    return this.http.get<Pokemon>(`/pokemon/${pokemonId}`);
  }
}

export default new PokemonService();
