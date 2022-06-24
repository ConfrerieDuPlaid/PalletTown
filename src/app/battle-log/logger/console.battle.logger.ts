import { Pokemon } from "../../pokemon/pokemon";
import {BattleLogger} from "./battle.logger";

export class ConsoleBattleLogger implements BattleLogger {
  startDate: Date|null = null;
  history: string[] = [];
  log(data: string|Pokemon): string {
    const msg = data instanceof Pokemon
      ? `${data.name} : ${data.currentHp} PV`
      : data;
    console.log(msg);
    this.history.push(msg);
    return msg;
  }

  logBattleBegins(): void {
    if(this.startDate === null)
      this.startDate = new Date();
  }

  logWinnerIs(winner: Pokemon): void {
  }
}
