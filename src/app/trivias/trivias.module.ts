import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriviasRoutingModule } from './trivias-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CrearTriviaComponent } from './pages/crear-trivia/crear-trivia.component';
import { CrearPartidaComponent } from './pages/crear-partida/crear-partida.component';
import { MisTriviasComponent } from './pages/mis-trivias/mis-trivias.component';
import { EditarTriviaComponent } from './pages/editar-trivia/editar-trivia.component';
import { InfoTriviaComponent } from './pages/info-trivia/info-trivia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ButtonHomeComponent } from './components/button-home/button-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomeComponent,
    CrearTriviaComponent,
    CrearPartidaComponent,
    MisTriviasComponent,
    EditarTriviaComponent,
    InfoTriviaComponent,
    ButtonHomeComponent
  ],
  imports: [
    CommonModule,
    TriviasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class TriviasModule {}
