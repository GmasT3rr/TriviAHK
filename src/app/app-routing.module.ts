import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoadingPageComponent } from './shared/components/loading-page/loading-page.component';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./trivias/trivias.module').then(m => m.TriviasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'partida',
    loadChildren: () =>
      import('./partida/lobby.module').then(m => m.LobbyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'loading',
    component: LoadingPageComponent
  },
  { path: '**', pathMatch: 'full', redirectTo: 'loading' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
