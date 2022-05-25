import {BattleLogger} from "../logger/battle.logger";
import {Pokemon} from "../domain/pokemon";

export class ConsoleBattleLogger implements BattleLogger {
  log(data: string|Pokemon): string {
    const msg = data instanceof Pokemon
      ? `${data.name} : ${data.currentHp} PV`
      : data;
    console.log(msg);
    return msg;
  }
}
