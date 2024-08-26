import Service from "@/app/service/service";
import { PokemonSpecies } from "@/app/types/pokemon/pokemon-species";

class PokemonSpeciesService extends Service {
  getPokemonSpecies() {
    return this.http.get<PokemonSpecies[]>("/pokemon-species");
  }

  getPokemonSpeciesDetail(speciesId: string) {
    return this.http.get<PokemonSpecies>(`/pokemon-species/${speciesId}`);
  }
}

export default new PokemonSpeciesService();
