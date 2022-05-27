import {Injectable, Input} from '@angular/core';
import {BattleLogger} from "../battle-log/logger/battle.logger";
import {ConsoleBattleLogger} from "../battle-log/logger/console.battle.logger";
import {Pokemon} from "./domain/pokemon";
import {PokemonType} from "./domain/pokemon.type";
import {DateUtils} from "../../utils/date.utils";

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  pokemon1!: Pokemon;
  pokemon2!: Pokemon;

  logger : BattleLogger = new ConsoleBattleLogger();
  private currentAttacker!: Pokemon;
  private lastAttackDate: Date | null = null;
  private readonly minimumSecondsBetweenTwoAttacks = 1;
  isIsPause = true;

  constructor() { }

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

  async start(): Promise<void> {
    this.isIsPause = false;
    while(this.isInProgress()) {
      try {
        await this.nextTurn();
      } catch (error) {
        if (error instanceof Error) this.logger.log(error.message)
      }
    }
  }

  public isInProgress(): boolean {
    const bothPokemonAreAlive = this.pokemon1.isAlive() && this.pokemon2.isAlive();
    return bothPokemonAreAlive && !this.isIsPause;
  }

  public pause() {
    this.isIsPause = true;
  }

  private async nextTurn(): Promise<void> {
    await this.sleepBeforeTurn();
    if(this.isTheFirstTurn()) this.logger.logBattleBegins();
    this.attackerAttacksDefender();
    this.switchAttackerAndDefender();
  }

  private isTheFirstTurn(): Boolean {
    return this.lastAttackDate === null;
  }

  private attackerAttacksDefender(): void | never {
    this.checkDurationSinceLastAttack();
    this.currentAttacker.attacks(this.getDefender());
    this.logger.log(`${this.currentAttacker.name} attacks ${this.getDefender().name}.`)
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
    if(this.isInProgress()){
      throw new Error('No winner, battle is not over.');
    }
    return this.pokemon1.currentHp > this.pokemon2.currentHp
      ? this.pokemon1
      : this.pokemon2;
  }

  private async sleepBeforeTurn(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.minimumSecondsBetweenTwoAttacks * 1_000))
  }
}
