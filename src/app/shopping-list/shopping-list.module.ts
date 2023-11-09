import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { LogListGameComponent } from './log-list-game/log-list-game.component';
import { ChildMessageComponent } from './log-list-game/child-message/child-message.component';

@NgModule({
  declarations: [LogListGameComponent, ChildMessageComponent],
  imports: [CommonModule, ShoppingListRoutingModule, SharedModule],
})
export class ShoppingListModule {}
