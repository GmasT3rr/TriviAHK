import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LobbyComponent } from './lobby/lobby.component';




@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    LobbyComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
