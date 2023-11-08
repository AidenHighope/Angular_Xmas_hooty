import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PairGameRoutingModule } from './pair-game-routing.module';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [GameComponent],
  imports: [CommonModule, PairGameRoutingModule, SharedModule],
})
export class PairGameModule {}
