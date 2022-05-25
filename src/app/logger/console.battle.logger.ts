import {BattleLogger} from "./battle.logger";
import {Pokemon} from "../domain/pokemon";

export class ConsoleBattleLogger implements BattleLogger {
  history: string[] = [];
  log(data: string|Pokemon): string {
    const msg = data instanceof Pokemon
      ? `${data.name} : ${data.currentHp} PV`
      : data;
    console.log(msg);
    this.history.push(msg);
    return msg;
  }
}
