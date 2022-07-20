import {Injectable} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";
import {PokemonType} from "../pokemon/pokemon.type";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface PokeApiPokemonListResponse {
  results: [{name: string, url: string}]
}

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  pokemons: Pokemon[] = []

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(): Observable<Pokemon[]> {
    const api = 'https://pokeapi.co/api/v2/pokemon';
    return this.http.get<PokeApiPokemonListResponse>(api)
      .pipe(map(res => res.results.map(p => new Pokemon({name: p.name, maxHp: 0, type: PokemonType.Electric}))))
  }
}
