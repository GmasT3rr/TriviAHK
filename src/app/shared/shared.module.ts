import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalMisTriviasComponent } from './components/modal-mis-trivias/modal-mis-trivias.component';
import { ModalComponent } from './components/modal/modal.component';
import { EsHostDirective } from './directives/es-host.directive';
import { ModalBorrarTriviaComponent } from './components/modal-borrar-trivia/modal-borrar-trivia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { OcultarDespuesDeDirective } from './directives/ocultar-despues-de.directive';
import { TipoDePreguntaPipe } from './pipes/tipo-de-pregunta.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    ModalMisTriviasComponent,
    ModalComponent,
    EsHostDirective,
    ModalBorrarTriviaComponent,
    FooterComponent,
    OcultarDespuesDeDirective,
    TipoDePreguntaPipe
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
    ModalMisTriviasComponent,
    ModalComponent,
    EsHostDirective,
    OcultarDespuesDeDirective,
    ModalBorrarTriviaComponent,
    FooterComponent,
    TipoDePreguntaPipe
  ]
})
export class SharedModule {}
