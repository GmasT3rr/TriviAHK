import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { LobbyGuard } from './guards/lobby.guard';
import { LobbyComponent } from './pages/lobby/main/lobby.component';
import { LoadingPageComponent } from './public/loading-page/loading-page.component';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
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
