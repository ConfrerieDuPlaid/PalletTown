import {Pokemon} from "./pokemon";
import {PokemonType} from "./pokemon.type";
import {DateUtils} from "../../utils/date.utils";
import {BattleLogger} from "../logger/battle.logger";
import {ConsoleBattleLogger} from "../logger/console.battle.logger";


export class Battle {
    logger : BattleLogger = new ConsoleBattleLogger();
    private currentAttacker: Pokemon;
    private lastAttackDate: Date | null;
    private readonly minimumSecondsBetweenTwoAttacks = 1;
    constructor(
        readonly p1: Pokemon,
        readonly p2: Pokemon
    ) {
      this.currentAttacker = this.getFirstAttacker();
      this.lastAttackDate = null;
    }

    async start(): Promise<void> {
        while(this.isInProgress()) {
          try {
            this.nextTurn();
            this.logger.log(this.getDefender());
            await this.sleepUntilNextTurn();
          } catch (error) {
            if (error instanceof Error) this.logger.log(error.message)
          }
        }
        this.logger.log(`${this.getWinner().name} is the winner !`);
    }

    // TODO strategy for first attacker selection
    private getFirstAttacker(): Pokemon {
        const firePokemon: Pokemon | null = this.getPokemonByType(PokemonType.Fire);
        if(firePokemon) {
            return firePokemon;
        } else {
            return this.p1;
        }
    }

    private getPokemonByType(type: PokemonType): Pokemon | null {
        if(this.p1.type === type) return this.p1;
        if(this.p2.type === type) return this.p2;
        return null;
    }

    private nextTurn(): void {
        this.attackerAttacksDefender();
        this.switchAttackerAndDefender();
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
       return this.currentAttacker === this.p2
        ? this.p1
        : this.p2;
    }

    private getWinner(): Pokemon | never {
        if(this.isInProgress()){
            throw new Error('No winner, battle is not over.');
        }
        return this.p1.currentHp > this.p2.currentHp
            ? this.p1
            : this.p2;
    }

    private isInProgress(): boolean {
        return this.p1.isAlive() && this.p2.isAlive();
    }

    private async sleepUntilNextTurn(): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, this.minimumSecondsBetweenTwoAttacks * 1_000))
    }
}
