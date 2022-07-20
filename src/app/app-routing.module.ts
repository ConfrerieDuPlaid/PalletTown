import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BattleComponent} from "./battle/battle.component";
import {ChoiceComponent} from "./choice/choice.component";

const routes: Routes = [
  { path: 'choice', component: ChoiceComponent },
  { path: 'battle/:pokemon1/:pokemon2', component: BattleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
