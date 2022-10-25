import { LobbyComponent } from './lobby/main/lobby.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrearQuizComponent } from './crear-quiz/crear-quiz.component';
import { LoadingPageComponent } from 'app/public/loading-page/loading-page.component';
import { CrearPartidaComponent } from './crear-partida/crear-partida.component';
import { MisTriviasComponent } from './mis-trivias/mis-trivias.component';
import { LobbyGuard } from 'app/guards/lobby.guard';
import { EditarTriviaComponent } from './editar-trivia/editar-trivia.component';
import { InfoTriviaComponent } from './info-trivia/info-trivia.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loading', component: LoadingPageComponent },
  { path: 'editar-trivia/:id', component: EditarTriviaComponent },

  {
    path: 'lobby/:id',
    component: LobbyComponent,
    canActivate: [LobbyGuard]
  },
  { path: 'crear-trivia', component: CrearQuizComponent },
  { path: 'crearPartida', component: CrearPartidaComponent },
  { path: 'mis-trivias', component: MisTriviasComponent },
  { path: 'info-trivia/:id', component: InfoTriviaComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
