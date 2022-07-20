import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";
import {PokemonType} from "../pokemon/pokemon.type";
import {BattleService} from "./battle.service";
import {combineLatestWith, Observable, Subscription} from "rxjs";
import {LogService} from "./battle-log/logger/log.service";
import {PokemonService} from "../pokemon/pokemon.service";
import {ActivatedRoute, Params} from "@angular/router";

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
    readonly logger: LogService,
    readonly pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.fetchFighters(params['pokemon1'], params['pokemon2'])
    })
  }

  private fetchFighters(firstFighterName: string, secondFighterName: string) {
    const p1 = this.pokemonService.getPokemonByName(firstFighterName);
    const p2 = this.pokemonService.getPokemonByName(secondFighterName);
    p1.pipe(combineLatestWith(p2))
      .subscribe(([first, second])=> {
        this.battleService.init(first, second);
        this.battle = this.battleService.start();
      })
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
