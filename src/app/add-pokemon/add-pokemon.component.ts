import { Component, OnInit } from '@angular/core';
import {PokemonType, PokemonTypeClass} from "../pokemon/pokemon.type";
import {Pokemon} from "../pokemon/pokemon";
import {PokedexService} from "../pokedex/pokedex.service";

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit {

  constructor(private pokedexService: PokedexService) { }

  public name: string = "";
  public hp: number = 0;
  public type: string = "";
  public okMessage: string = "";
  public koMessage: string = "";
  public pokemonTypes: PokemonTypeClass[] = [];

  ngOnInit(): void {
    this.initFields();
  }

  private initFields () {
    this.initPokemonTypes()
  }

  private initPokemonTypes () {
   this.pokedexService.getPokemonTypes().subscribe(pokeTypes => {
     this.pokemonTypes = pokeTypes
     console.log(this.pokemonTypes);
   })
  }

  addPokemon() {
    console.log(this.name, this.hp, this.type)
    const newPokemon: Pokemon = new Pokemon({
      name: this.name,
      maxHp: this.hp,
      type: PokemonType.Electric
    })
    let userPokemonsJSON: string | null = localStorage.getItem('userPokemons')
    if (!userPokemonsJSON) {
      userPokemonsJSON = JSON.stringify(newPokemon);
    } else {
      const setPokemons = JSON.parse(userPokemonsJSON)
      setPokemons.push(newPokemon)
      userPokemonsJSON = JSON.stringify(setPokemons);
    }
    localStorage.setItem('userPokemons', userPokemonsJSON)
    console.log(localStorage)
  }
}
