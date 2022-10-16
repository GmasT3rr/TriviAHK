import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { LobbyComponent } from './pages/lobby/main/lobby.component';
import { LandingComponent } from './public/landing/landing.component';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'landing',
    component: LandingComponent
  },

  { path: 'lobby',component:LobbyComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
