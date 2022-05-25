import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Pokemon} from "./pokemon";
import {PokemonType} from "./pokemon.type";
import {Battle} from "./battle";
import {BattleLogger} from "../logger/battle.logger";

describe('BattleComponent', () => {

  const pikachu = new Pokemon({
    name: "Pikachu",
    maxHp: 1,
    type: PokemonType.Electric
  });
  const pidgey = new Pokemon({
    name: "Pidgey",
    maxHp: 1,
    type: PokemonType.Wind
  });

  let battle: Battle;

  class mockBattleLogger implements BattleLogger {
    private _history: string[] = [];
    log(data: unknown): string {
      const msg = "" + data;
      this._history.push(msg);
      return msg;
    }
    get history(): string[] {
      return this._history;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: []
    }).compileComponents();

    battle = new Battle(
      pikachu,
      pidgey
    );
    battle.logger = new mockBattleLogger();
  });

  it('should start battle', async () => {
    await battle.start();
  })
});
