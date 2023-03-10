import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyGuard } from 'app/core/guards/lobby.guard';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { PartidaComponent } from './components/partida/partida.component';
import { LobbyComponent } from './lobby/main/lobby.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { PodioComponent } from './podio/podio.component';
import { RankingComponent } from './ranking/ranking.component';
import { SingleChoiceComponent } from './single-choice/single-choice.component';

const routes: Routes = [
  // {
  //   path: 'lobby/:id',
  //   component: LobbyComponent,
  //   canActivate: [LobbyGuard]
  // },
  {
    path: 'ranking',
    component: RankingComponent
  },
  {
    path: 'lobby/:id',
    component: LobbyComponent,
    canActivate: [LobbyGuard]
  },
  //ELIMINAR ES A MODO DE TEST
  {
    path: 'opciones',
    component: OpcionesComponent
  },
  {
    path: 'single-choice',
    component: SingleChoiceComponent
  },
  {
    path: 'multiple-choice',
    component: MultipleChoiceComponent
  },
  {
    path: 'podio',
    component: PodioComponent
  },
  {
    path: ':id',
    component: PartidaComponent,
    pathMatch: 'full'
  },
  { path: '**', pathMatch: 'full', redirectTo: 'todas-las-rutas' }

  // { path: '**', pathMatch: 'full', redirectTo: 'lobby' }
  // { path: '**', pathMatch: 'full', redirectTo: 'lobby/:id' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule {}
