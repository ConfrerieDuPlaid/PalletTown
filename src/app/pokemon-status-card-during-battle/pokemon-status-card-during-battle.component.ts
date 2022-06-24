import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";
import {PokemonType} from "../pokemon/pokemon.type";

@Component({
  selector: 'app-pokemon-status-card-during-battle',
  templateUrl: './pokemon-status-card-during-battle.component.html',
  styleUrls: ['./pokemon-status-card-during-battle.component.scss']
})
export class PokemonStatusCardDuringBattleComponent implements OnInit {
  @Input() public pokemon!: Pokemon
  constructor() { }

  ngOnInit(): void {
  }

}
