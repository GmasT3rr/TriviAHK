import { LobbyModule } from './lobby/lobby.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingPageComponent } from 'app/public/loading-page/loading-page.component';
import { HomeComponent } from './home/home.component';
import { CrearQuizComponent } from './crear-quiz/crear-quiz.component';
import { CrearPartidaComponent } from './crear-partida/crear-partida.component';
import { MisTriviasComponent } from './mis-trivias/mis-trivias.component';

@NgModule({
  declarations: [
    HomeComponent,
    CrearQuizComponent,
    LoadingPageComponent,
    CrearPartidaComponent,
    MisTriviasComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    LobbyModule,
  ],
})
export class PagesModule {}
