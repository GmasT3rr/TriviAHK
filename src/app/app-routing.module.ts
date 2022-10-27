import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoadingPageComponent } from './public/loading-page/loading-page.component';
import { LobbyModule } from './partida/lobby.module';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'partida',
    loadChildren: () => import('./partida/lobby.module').then(m => m.LobbyModule),
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
