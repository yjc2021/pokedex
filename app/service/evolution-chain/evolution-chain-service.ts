import Service from "@/app/service/service";

class EvolutionChainService extends Service {
  getEvolutionChain() {
    return this.http.get("/evolution-chain");
  }

  getEvolutionChainDetail(evolutionChainId: string) {
    return this.http.get(`/evolution-chain/${evolutionChainId}`);
  }
}

export default new EvolutionChainService();
