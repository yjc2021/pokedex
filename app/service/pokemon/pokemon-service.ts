import Service from "@/app/service/service";
import { Pokemon } from "@/app/types/pokemon/pokemon";

class PokemonService extends Service {
  getPokemon() {
    return this.http.get<Pokemon[]>("/pokemon");
  }

  getPokemonDetail(pokemonId: string) {
    return this.http.get<Pokemon>(`/pokemon/${pokemonId}`);
  }
}

export default new PokemonService();
