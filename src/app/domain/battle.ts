import {Pokemon} from "./pokemon";
import {PokemonType} from "./pokemon.type";
import {BattleLogger} from "../logger/battle.logger";
import {DateUtils} from "../../utils/date.utils";

export class Battle {
    private currentAttacker: Pokemon;
    private lastAttackDate: Date | null;
    private readonly minimumSecondsBetweenTwoAttacks = 1;
    constructor(
        private readonly p1: Pokemon,
        private readonly p2: Pokemon,
        private readonly logger: BattleLogger
    ) {
      this.currentAttacker = this.getFirstAttacker();
      this.lastAttackDate = null;
    }

    start(): void {
        while(this.isInProgress()) {
            this.nextTurn();
        }
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

    nextTurn(): void {
        this.attackerAttacksDefender();
        this.switchAttackerAndDefender();
    }

    attackerAttacksDefender(): void | never {
        this.checkDurationSinceLastAttack();
        this.currentAttacker.attacks(this.getDefender());
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
            this.lastAttackDate,
            DateUtils.now()
        );
    }

    private updateLastAttackDate() {
        this.lastAttackDate = DateUtils.now();
    }

    getDefender(): Pokemon {
        return this.currentAttacker === this.p2
            ? this.p1
            : this.p2;
    }

    switchAttackerAndDefender(): void{
        this.currentAttacker = this.getDefender();
    }

    getWinner(): Pokemon | never {
        if(this.isInProgress()){
            throw new Error('No winner, battle is not over.');
        }
        return this.p1.currentHp > this.p2.currentHp
            ? this.p1
            : this.p2;
    }

    private isInProgress(): boolean {
        return this.p1.isAlive() && this.p1.isAlive();
    }
}
