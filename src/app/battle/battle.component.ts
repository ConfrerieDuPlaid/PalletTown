import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "./domain/pokemon";
import {PokemonType} from "./domain/pokemon.type";
import {BattleService} from "./battle.service";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {


  constructor(
    public readonly battleService: BattleService
  ) {}

  ngOnInit(): void {
    const pikachu = new Pokemon({
      name: "Pikachu",
      maxHp: 89,
      type: PokemonType.Electric
    });
    const pidgey = new Pokemon({
      name: "Pidgey",
      maxHp: 100,
      type: PokemonType.Wind
    });
    this.battleService.init(pikachu, pidgey);
  }

}
