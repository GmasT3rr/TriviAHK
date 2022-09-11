import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { CrearQuizComponent } from './crear-quiz/crear-quiz.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';




@NgModule({
  declarations: [
    HomeComponent,
    CrearQuizComponent,
    QuizFormComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
