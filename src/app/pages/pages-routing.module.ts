import { LobbyComponent } from './lobby/main/lobby.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrearQuizComponent } from './crear-quiz/crear-quiz.component';
import { LoadingPageComponent } from 'app/public/loading-page/loading-page.component';
import { MisTriviasComponent } from './mis-trivias/mis-trivias.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loading', component: LoadingPageComponent },
  { path: 'lobby', component: LobbyComponent },
  {path:'crear', component: CrearQuizComponent},
  {path:'mis-trivias', component: MisTriviasComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
