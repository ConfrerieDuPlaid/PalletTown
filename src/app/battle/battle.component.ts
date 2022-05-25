import {Component, Input, OnInit} from '@angular/core';
import {Battle} from "../domain/battle";
import {Pokemon} from "../domain/pokemon";
import {PokemonType} from "../domain/pokemon.type";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  @Input() battle!: Battle;

  constructor() {}

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
    this.battle = new Battle(
      pikachu,
      pidgey
    );
    this.battle.start();
  }

}
