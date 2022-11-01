import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriviasRoutingModule } from './trivias-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CrearQuizComponent } from './pages/crear-quiz/crear-quiz.component';
import { CrearPartidaComponent } from './pages/crear-partida/crear-partida.component';
import { MisTriviasComponent } from './pages/mis-trivias/mis-trivias.component';
import { EditarTriviaComponent } from './pages/editar-trivia/editar-trivia.component';
import { InfoTriviaComponent } from './pages/info-trivia/info-trivia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    CrearQuizComponent,
    CrearPartidaComponent,
    MisTriviasComponent,
    EditarTriviaComponent,
    InfoTriviaComponent
  ],
  imports: [
    CommonModule,
    TriviasRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TriviasModule {}
