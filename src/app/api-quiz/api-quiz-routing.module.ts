import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizGameComponent } from './quiz-game/quiz-game.component';

const routes: Routes = [
  { path: '', redirectTo: 'quiz-game', pathMatch: 'full' },
  { path: 'quiz-game', component: QuizGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiQuizRoutingModule {}
