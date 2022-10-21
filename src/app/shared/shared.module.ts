import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ModalMisTriviasComponent } from './components/modal-mis-trivias/modal-mis-trivias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ModalBorrarTriviaComponent } from './components/modal-borrar-trivia/modal-borrar-trivia.component';



@NgModule({
  declarations: [NavbarComponent, ModalMisTriviasComponent, ModalBorrarTriviaComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [NavbarComponent, ModalMisTriviasComponent,ModalBorrarTriviaComponent]
})
export class SharedModule {}
