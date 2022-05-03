import {Pokemon, PokemonProps} from "./pokemon";
import {PokemonType} from "./pokemon.type";

export class IcePokemon extends Pokemon{
    constructor(props: PokemonProps) {
        props.bonus = {
            value: 0.5,
            on: PokemonType.Fire
        };
        super(props);
    }
}