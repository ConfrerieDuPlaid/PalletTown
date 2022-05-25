import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonStatusCardDuringBattleComponent } from './pokemon-status-card-during-battle/pokemon-status-card-during-battle.component';
import { BattleComponent } from './battle/battle.component';
import { BattleLogComponent } from './battle-log/battle-log.component';

@NgModule({
  declarations: [
    AppComponent,
    BattleComponent,
    PokemonStatusCardDuringBattleComponent,
    BattleComponent,
    BattleLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
