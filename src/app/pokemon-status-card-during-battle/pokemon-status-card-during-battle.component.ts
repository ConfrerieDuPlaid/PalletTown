import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../battle/domain/pokemon";
import {PokemonType} from "../battle/domain/pokemon.type";

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
