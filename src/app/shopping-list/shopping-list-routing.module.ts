import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogListGameComponent } from './log-list-game/log-list-game.component';

const routes: Routes = [
  { path: '', redirectTo: 'log-list-game', pathMatch: 'full' },
  { path: 'log-list-game', component: LogListGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
