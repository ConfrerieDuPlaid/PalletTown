import {Logger} from "./logger";

export interface BattleLogger extends Logger{
  history: string[]
}
