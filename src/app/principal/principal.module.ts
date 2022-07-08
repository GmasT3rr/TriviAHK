import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { TarjetaTriviaComponent } from './tarjeta-trivia/tarjeta-trivia.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    TarjetaTriviaComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
  ],
  exports: [
    TarjetaTriviaComponent
  ],
})
export class PrincipalModule { }
