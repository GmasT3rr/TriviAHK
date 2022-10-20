import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ModalMisTriviasComponent } from './components/modal-mis-trivias/modal-mis-trivias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavbarComponent, ModalMisTriviasComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [NavbarComponent, ModalMisTriviasComponent]
})
export class SharedModule {}
