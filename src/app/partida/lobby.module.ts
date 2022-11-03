import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { UserCardComponent } from './lobby/user-card/user-card.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { PartidaNavbarComponent } from './components/partida-navbar/partida-navbar.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { TodasLasRutasComponent } from './todas-las-rutas/todas-las-rutas.component';
import { PodioComponent } from './podio/podio.component';
import { LobbyComponent } from './lobby/main/lobby.component';
import { PartidaComponent } from './components/partida/partida.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { OpcionesComponent } from './components/opciones/opciones.component';
// Necesitamos angular 14+ para usar esto
// import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [
    UserCardComponent,
    SingleChoiceComponent,
    PartidaNavbarComponent,
    MultipleChoiceComponent,
    TodasLasRutasComponent,
    PodioComponent,
    LobbyComponent,
    PartidaComponent,
    PreguntaComponent,
    OpcionesComponent
  ],
  imports: [CommonModule, FontAwesomeModule, SharedModule, LobbyRoutingModule]
})
export class LobbyModule {}
