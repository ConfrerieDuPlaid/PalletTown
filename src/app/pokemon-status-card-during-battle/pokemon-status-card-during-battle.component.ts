import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../domain/pokemon";
import {PokemonType} from "../domain/pokemon.type";

@Component({
  selector: 'app-pokemon-status-card-during-battle',
  templateUrl: './pokemon-status-card-during-battle.component.html',
  styleUrls: ['./pokemon-status-card-during-battle.component.scss']
})
export class PokemonStatusCardDuringBattleComponent implements OnInit {
  @Input() public pokemon: Pokemon = new Pokemon({
    name: "Pikachu",
    maxHp: 89,
    type: PokemonType.Electric
  })
  constructor() { }

  ngOnInit(): void {
  }

}
