import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrearQuizComponent } from './crear-quiz/crear-quiz.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'crear', component: CrearQuizComponent },
  { path: 'play', component: QuizGameComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
