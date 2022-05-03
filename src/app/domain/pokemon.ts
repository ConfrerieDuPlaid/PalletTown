import {PokemonType} from "./pokemon.type";
import {Bonus} from "./bonus";

export interface PokemonProps {
    name: string;
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

    constructor(props: PokemonProps) {
        this.name = props.name;
        this.maxHp = props.maxHp;
        this.currentHp = props.maxHp;
        this.type = props.type;
    }

    isAlive() {
        return this.maxHp > 0;
    }

    attacks(target: Pokemon) {

    }
}
