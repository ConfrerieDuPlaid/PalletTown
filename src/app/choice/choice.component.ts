import { Component, OnInit } from '@angular/core';
import {PokedexService} from "../pokedex/pokedex.service";
import {Pokemon} from "../pokemon/pokemon";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  pokemons: Pokemon[] = [];

  firstFighter = '';
  secondFighter = '';

  readyToFight = false;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.pokedexService
      .getPokemons()
      .subscribe((pokemons) => this.pokemons = pokemons);
    this.updateReadyToFight();
  }

  setFirstFighter(fighter: string) {
    this.firstFighter = fighter;
    this.updateReadyToFight();
  }

  setSecondFighter(fighter: string) {
    this.secondFighter = fighter;
    this.updateReadyToFight();
  }

  private updateReadyToFight() {
    this.readyToFight = this.firstFighter.trim().length > 0
      && this.secondFighter.trim().length > 0;
  }
}
