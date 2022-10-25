import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyGuard } from 'app/guards/lobby.guard';
import { LobbyComponent } from './lobby/main/lobby.component';
import { SingleChoiceComponent } from './single-choice/single-choice.component';


const routes: Routes = [

  // {
  //   path: 'lobby/:id',
  //   component: LobbyComponent,
  //   canActivate: [LobbyGuard]
  // },
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'single-choice',
    component: SingleChoiceComponent,
  },

  { path: '**', pathMatch: 'full', redirectTo: 'lobby' }
  // { path: '**', pathMatch: 'full', redirectTo: 'lobby/:id' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule {}
