import {Logger} from "./logger";

export interface BattleLogger extends Logger{
  startDate: Date|null;
  history: string[]

  logBattleBegins(): void;
}
