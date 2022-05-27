import {PokemonType} from "./pokemon.type";
import {Bonus} from "./bonus";
import {BonusFactory} from "./bonus.factory";
import {Injectable} from "@angular/core";

export interface PokemonProps {
    name: PokemonName;
    maxHp: number;
    type: PokemonType,
    bonus?: Bonus
}

type PokemonName = string;

export class Pokemon implements PokemonProps {
    readonly maxHp: number;
    currentHp: number;
    name: PokemonName;
    type: PokemonType;
    bonus?: Bonus

    constructor(props: PokemonProps) {
        this.name = props.name;
        this.maxHp = props.maxHp;
        this.currentHp = props.maxHp;
        this.type = props.type;
        this.bonus = BonusFactory.byType(props.type);
    }

    isAlive() {
        return this.currentHp > 0;
    }

    attacks(target: Pokemon) {
      let damages = 20;
      if(this.bonus?.on === target.type)
        damages *= 1 + this.bonus.value;
      target.getDamages(damages)
    }

  private getDamages(damages: number) {
      const hpAfterDamages = this.currentHp -= damages;
      this.currentHp = hpAfterDamages >= 0
        ? hpAfterDamages
        : 0;
  }
}
