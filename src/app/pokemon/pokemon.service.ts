import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Pokemon} from "./pokemon";
import {HttpClient} from "@angular/common/http";
import {PokemonType} from "./pokemon.type";
import {log} from "../battle/battle.service";

interface PokeapiPokemonResponse {
  name: string,
  stats: [{ base_stat: number }]
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonByName(name: string): Observable<Pokemon> {
    const api = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get<PokeapiPokemonResponse>(api)
      .pipe(map(res => new Pokemon({
          name: res.name,
          type: PokemonType.Electric,
          maxHp: res.stats[0].base_stat,
      })))
  }
}
