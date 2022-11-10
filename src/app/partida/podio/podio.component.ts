import { SocketService } from 'app/core/socket/socket.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { onGrowAnimation } from 'app/shared/animations/grow.component';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { faDoorOpen, faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-podio',
  templateUrl: './podio.component.html',
  styleUrls: ['./podio.component.css'],
  animations: [onGrowAnimation, onLoadAnimation]
})
export class PodioComponent implements OnInit, OnDestroy {
  @Input()
  partidaResultadosFinales!: any[];

  faMedal = faMedal;
  faDoor = faDoorOpen;

  constructor(private readonly _socketService: SocketService) {}

  ngOnInit(): void {
    // console.log(this.partidaResultadosFinales);
    // this.ordenarPuntaje();
  }

  ngOnDestroy(): void {
    this._socketService.finalizarPartida();
    this._socketService.desconectar();
  }

  // ordenarPuntaje() {
  //   this.partidaResultadosFinales = this.partidaResultadosFinales.sort(
  //     (a: any, b: any) => {
  //       return b.puntaje - a.puntaje;
  //     }
  //   );
  // }

  options = {
    /* ... */
  };
}
