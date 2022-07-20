import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BattleComponent} from "./battle/battle.component";
import {ChoiceComponent} from "./choice/choice.component";
import {AddPokemonComponent} from "./add-pokemon/add-pokemon.component";

const routes: Routes = [
  { path: 'add', component: AddPokemonComponent },
  { path: 'choice', component: ChoiceComponent },
  { path: 'battle/:pokemon1/:pokemon2', component: BattleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
