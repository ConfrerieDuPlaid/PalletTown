import {PokemonType} from "../../pokemon/pokemon.type";
import {Bonus} from "./bonus";

class BonusException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BonusException"
  }
}

export class BonusFactory {
  static byType(type: PokemonType): Bonus {
    switch (type) {
      case PokemonType.Ice: return {
        value: 0.5,
        on: PokemonType.Fire
      };
      case PokemonType.Electric: return {
        value: 0.2,
        on: PokemonType.Wind
      };
      case PokemonType.Wind: return {
        value: 0.4,
        on: PokemonType.Bug
      };
      default: throw new BonusException(`Type ${type} has no bonus.`);
    }
  }
}
