import {Pokemon} from "../../battle/domain/pokemon";
import {Logger} from "./logger";
import {BattleLogger} from "./battle.logger";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LogService implements BattleLogger{
  startDate: Date|null = null;
  history: string[] = [];
  winner?: Pokemon;
  loser?: Pokemon;

  log(data: string|Pokemon): string {
    const msg = data instanceof Pokemon
      ? `${data.name} : ${data.currentHp} PV`
      : data;
    this.history.push(msg);
    return msg;
  }

  logBattleBegins(): void {
    if(this.startDate === null)
      this.startDate = new Date();
  }

  logWinnerIs(winner: Pokemon): void {
    this.winner = winner;
  }

  logloserIs(loser: Pokemon): void {
    this.loser = loser;
  }
}
