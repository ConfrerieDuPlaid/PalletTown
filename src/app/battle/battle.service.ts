import {Inject, Injectable} from '@angular/core';
import {BattleLogger} from "../battle-log/logger/battle.logger";
import {ConsoleBattleLogger} from "../battle-log/logger/console.battle.logger";
import {Pokemon} from "../pokemon/pokemon";
import {PokemonType} from "../pokemon/pokemon.type";
import {DateUtils} from "../../utils/date.utils";
import {interval, map, Observable, takeUntil, takeWhile} from "rxjs";
import {LogService} from "../battle-log/logger/log.service";

export function log() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {

    const targetMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const result = targetMethod.apply(this, args);
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  pokemon1!: Pokemon;
  pokemon2!: Pokemon;

  private currentAttacker!: Pokemon;
  private lastAttackDate: Date | null = null;
  private readonly minimumSecondsBetweenTwoAttacks = 1;

  constructor(
    private logger: LogService
  ) { }

  public init(pokemon1: Pokemon, pokemon2: Pokemon) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
    this.currentAttacker = this.getFirstAttacker();
  }

  private getFirstAttacker(): Pokemon {
    const firePokemon: Pokemon | null = this.getPokemonByType(PokemonType.Fire);
    if(firePokemon) {
      return firePokemon;
    } else {
      return this.pokemon1;
    }
  }

  private getPokemonByType(type: PokemonType): Pokemon | null {
    if(this.pokemon1.type === type) return this.pokemon1;
    if(this.pokemon2.type === type) return this.pokemon2;
    return null;
  }

   start(): Observable<void> {
    const millisecondsBetweenTwoAttacks = this.minimumSecondsBetweenTwoAttacks * 1_000 + 50;
    return interval(millisecondsBetweenTwoAttacks)
      .pipe(
        map(()=> this.nextTurn()),
        takeWhile(()=> this.isInProgress())
      )
     //this.logger.log(error.message)
  }

  public isInProgress(): boolean {
    return this.pokemon1.isAlive() && this.pokemon2.isAlive();
  }


  private nextTurn(): void{
    if(this.isTheFirstTurn()) this.logger.logBattleBegins();
    this.attackerAttacksDefender();
    this.switchAttackerAndDefender();
    if(!this.isInProgress()) {
      this.logger.logWinnerIs(this.getWinner())
      this.logger.logloserIs(this.getLoser())
    }
  }

  private isTheFirstTurn(): Boolean {
    return this.lastAttackDate === null;
  }



  @log()
  attackerAttacksDefender(): void | never {
    this.checkDurationSinceLastAttack();
    const damages = this.currentAttacker.attacks(this.getDefender());
    this.logger.log(`${this.currentAttacker.name} attacks and does ${damages} damages.`)
    this.updateLastAttackDate();
  }

  private checkDurationSinceLastAttack(): void | never {
    if(!this.lastAttackDate) return; // no attacks yet => first attack
    const secondsSinceLastAttack = this.getSecondsSinceLastAttack();
    if(secondsSinceLastAttack < this.minimumSecondsBetweenTwoAttacks) {
      throw new Error(`Time since last attack too small : ${secondsSinceLastAttack}s < ${this.minimumSecondsBetweenTwoAttacks}s`);
    }
  }

  private getSecondsSinceLastAttack(): number {
    if(!this.lastAttackDate) throw new Error("No attacks yet.");
    return DateUtils.getSecondsDifferenceBetweenTwoDates(
      DateUtils.now(),
      this.lastAttackDate
    );
  }

  private updateLastAttackDate() {
    this.lastAttackDate = DateUtils.now();
  }

  private switchAttackerAndDefender(): void{
    this.currentAttacker = this.getDefender();
  }

  private getDefender(): Pokemon {
    return this.currentAttacker === this.pokemon2
      ? this.pokemon1
      : this.pokemon2;
  }

  private getWinner(): Pokemon | never {
    if(this.isInProgress()) throw new Error('No winner, battle is not over.');

    return this.pokemon1.currentHp > this.pokemon2.currentHp
      ? this.pokemon1
      : this.pokemon2;
  }

  private getLoser(): Pokemon {
    return this.pokemon1.equals(this.getWinner())
      ? this.pokemon2
      : this.pokemon1;
  }
}
