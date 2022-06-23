import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonStatusCardDuringBattleComponent } from './pokemon-status-card-during-battle/pokemon-status-card-during-battle.component';
import { BattleComponent } from './battle/battle.component';
import { BattleLogComponent } from './battle-log/battle-log.component';
import {BattleService} from "./battle/battle.service";
import { PlayPauseBattleComponent } from './play-pause-battle/play-pause-battle.component';
import {DatePipe} from "@angular/common";
import {LogService} from "./battle-log/logger/log.service";

@NgModule({
  declarations: [
    AppComponent,
    BattleComponent,
    PokemonStatusCardDuringBattleComponent,
    BattleComponent,
    BattleLogComponent,
    PlayPauseBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    BattleService,
    LogService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
