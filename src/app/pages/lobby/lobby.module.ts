import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LobbyComponent } from './main/lobby.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [UserCardComponent, LobbyComponent],
  imports: [CommonModule, FontAwesomeModule],
})
export class LobbyModule {}
