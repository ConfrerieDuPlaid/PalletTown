import {Logger} from "./logger";
import {Pokemon} from "../../battle/domain/pokemon";

export interface BattleLogger extends Logger{
  startDate: Date|null;
  history: string[]

  logBattleBegins(): void;
  logWinnerIs(winner: Pokemon): void;
}
