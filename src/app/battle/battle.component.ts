import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from "./domain/pokemon";
import {PokemonType} from "./domain/pokemon.type";
import {BattleService} from "./battle.service";
import {Observable, Subscriber, Subscription} from "rxjs";
import {LogService} from "../battle-log/logger/log.service";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit, OnDestroy {
  private battle: Observable<void> = new Observable<void>()
  private subscriber?: Subscription


  constructor(
    readonly battleService: BattleService,
    readonly logger: LogService
  ) {}

  ngOnInit(): void {
    const pikachu = new Pokemon({
      name: "Pikachu",
      maxHp: 40,
      type: PokemonType.Electric
    });
    const pidgey = new Pokemon({
      name: "Pidgey",
      maxHp: 30,
      type: PokemonType.Wind
    });
    this.battleService.init(pikachu, pidgey);
    this.battle = this.battleService.start();
  }

  start(): void {
    this.subscriber = this.battle.subscribe();
  }

  pause(): void {
    this.subscriber?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }


}
