import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { CrearQuizComponent } from './crear-quiz/crear-quiz.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { ModalQuizGameComponent } from './modal-quiz-game/modal-quiz-game.component';
import { QuizFinishedComponent } from './quiz-finished/quiz-finished.component';




@NgModule({
  declarations: [
    HomeComponent,
    CrearQuizComponent,
    QuizFormComponent,
    QuizGameComponent,
    ModalQuizGameComponent,
    QuizFinishedComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
