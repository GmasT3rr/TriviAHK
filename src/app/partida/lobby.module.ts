import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LobbyComponent } from './lobby/main/lobby.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { UserCardComponent } from './lobby/user-card/user-card.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { PartidaNavbarComponent } from './components/partida-navbar/partida-navbar.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';

@NgModule({
  declarations: [UserCardComponent, LobbyComponent,SingleChoiceComponent, PartidaNavbarComponent, MultipleChoiceComponent],
  imports: [CommonModule, FontAwesomeModule, SharedModule,LobbyRoutingModule],
})
export class LobbyModule {}
