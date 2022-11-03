import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'app/core/socket/socket.service';
import { interval, mapTo, scan, startWith, switchMapTo, takeWhile } from 'rxjs';

@Component({
  selector: 'app-partida-navbar',
  templateUrl: './partida-navbar.component.html',
  styleUrls: ['./partida-navbar.component.css']
})
export class PartidaNavbarComponent implements OnInit {
  constructor(private _socketsService: SocketService, private router: Router) {}

  esLobby: boolean = false;
  esPodio: boolean = false;
  recibimosTiempo = false;
  tiempoPreguntasSeg!: number;

  ngOnInit(): void {
    let ruta = this.router.url.split('/');
    let enLobby = ruta.find((valor: string) => valor == 'lobby');
    if (enLobby == 'lobby') {
      this.esLobby = true;
    }
    let enPodio = ruta.find((valor: string) => valor == 'podio');
    if (enPodio == 'podio') {
      this.esPodio = true;
    }

    this._socketsService._segundosEntrePreguntas$.subscribe((seg: number) => {
      console.log('seg rec', seg);
      this.recibimosTiempo = true;
      this.tiempoPreguntasSeg = seg;
      let countdown = setInterval(() => {
        console.log(this.tiempoPreguntasSeg);
        this.tiempoPreguntasSeg--;
        // console.log(this.tiempoPreguntasSeg);
        if (this.tiempoPreguntasSeg <= 0) clearInterval(countdown);
      }, 1000);
    });
  }
}
