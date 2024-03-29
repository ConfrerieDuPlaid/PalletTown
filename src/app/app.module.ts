import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleComponent } from './battle/battle.component';
import {BattleService} from "./battle/battle.service";
import {DatePipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { PokemonSelectorComponent } from './choice/pokemon-selector/pokemon-selector.component';
import {LogService} from "./battle/battle-log/logger/log.service";
import {PlayPauseBattleComponent} from "./battle/play-pause-battle/play-pause-battle.component";
import {BattleLogComponent} from "./battle/battle-log/battle-log.component";
import {PokemonStatusCardDuringBattleComponent} from "./battle/pokemon-status-card-during-battle/pokemon-status-card-during-battle.component";
import {FormsModule} from "@angular/forms";
import {PokeApiResponseAdapter} from "./pokemon/pokemon.service";
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import {ChoiceComponent} from "./choice/choice.component";
import {PokedexService} from "./pokedex/pokedex.service";

@NgModule({
  declarations: [
    AppComponent,
    BattleComponent,
    PokemonStatusCardDuringBattleComponent,
    BattleComponent,
    BattleLogComponent,
    PlayPauseBattleComponent,
    ChoiceComponent,
    PokemonSelectorComponent,
    AddPokemonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    BattleService,
    LogService,
    DatePipe,
    PokeApiResponseAdapter,
    PokedexService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
