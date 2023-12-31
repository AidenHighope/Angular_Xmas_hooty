import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ApiQuizRoutingModule } from './api-quiz-routing.module';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { ScoreboardComponent } from './quiz-game/scoreboard/scoreboard.component';
@NgModule({
  declarations: [QuizGameComponent, ScoreboardComponent],
  imports: [CommonModule, ApiQuizRoutingModule, SharedModule],
})
export class ApiQuizModule {}
