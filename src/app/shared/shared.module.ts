import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalMisTriviasComponent } from './components/modal-mis-trivias/modal-mis-trivias.component';
import { ModalComponent } from './components/modal/modal.component';
import { EsHostDirective } from './directives/es-host.directive';
import { ModalBorrarTriviaComponent } from './components/modal-borrar-trivia/modal-borrar-trivia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    ModalMisTriviasComponent,
    ModalComponent,
    EsHostDirective,
    ModalBorrarTriviaComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [
    NavbarComponent,
    ModalMisTriviasComponent,
    ModalComponent,
    EsHostDirective,
    ModalBorrarTriviaComponent
  ]
})
export class SharedModule {}
