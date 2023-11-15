import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PairGameRoutingModule } from './pair-game-routing.module';
import { GameComponent } from './game/game.component';
import { ScoreboardPopupComponent } from './game/scoreboard-popup/scoreboard-popup.component';

@NgModule({
  declarations: [GameComponent, ScoreboardPopupComponent],
  imports: [CommonModule, PairGameRoutingModule, SharedModule],
})
export class PairGameModule {}
