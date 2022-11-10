import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPageComponent } from 'app/shared/components/loading-page/loading-page.component';
import { CrearPartidaComponent } from './pages/crear-partida/crear-partida.component';
import { CrearTriviaComponent } from './pages/crear-trivia/crear-trivia.component';
import { EditarTriviaComponent } from './pages/editar-trivia/editar-trivia.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoTriviaComponent } from './pages/info-trivia/info-trivia.component';
import { MisPartidasComponent } from './pages/mis-partidas/mis-partidas.component';
import { MisTriviasComponent } from './pages/mis-trivias/mis-trivias.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loading', component: LoadingPageComponent },
  { path: 'editar-trivia/:id', component: EditarTriviaComponent },
  { path: 'crear-trivia', component: CrearTriviaComponent },
  { path: 'crearPartida', component: CrearPartidaComponent },
  { path: 'mis-trivias', component: MisTriviasComponent },
  { path: 'mis-partidas', component: MisPartidasComponent },
  { path: 'info-trivia/:id', component: InfoTriviaComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TriviasRoutingModule {}
