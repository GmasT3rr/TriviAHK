import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ModalMisTriviasComponent } from './components/modal-mis-trivias/modal-mis-trivias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [NavbarComponent, ModalMisTriviasComponent, ModalComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [NavbarComponent, ModalMisTriviasComponent, ModalComponent]
})
export class SharedModule {}
