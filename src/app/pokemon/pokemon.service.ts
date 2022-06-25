import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Pokemon} from "./pokemon";
import {HttpClient} from "@angular/common/http";
import {PokemonType} from "./pokemon.type";
import {log} from "../battle/battle.service";

interface PokeApiPokemonResponse {
  name: string,
  stats: [{ base_stat: number }],
  types: [{type: {name: string}}]
}

export class PokeApiResponseAdapter {
  adapt(res: PokeApiPokemonResponse): Pokemon {
    return new Pokemon({
      name: res.name,
      type: PokemonType.Electric,
      maxHp: res.stats[0].base_stat,
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient,
    private pokeApiResponseAdapter: PokeApiResponseAdapter
    ) { }

  getPokemonByName(name: string): Observable<Pokemon> {
    const api = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get<PokeApiPokemonResponse>(api)
      .pipe(map(res => this.pokeApiResponseAdapter.adapt(res)))
  }
}
