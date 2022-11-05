import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'app/core/socket/socket.service';
import { PartidasService } from 'app/trivias/services/partidas.service';
import { interval, mapTo, scan, startWith, Subject, switchMapTo, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-partida-navbar',
  templateUrl: './partida-navbar.component.html',
  styleUrls: ['./partida-navbar.component.css']
})
export class PartidaNavbarComponent implements OnInit, OnDestroy {
  constructor(
    private _socketsService: SocketService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private _partidaService:PartidasService) {}

  esLobby: boolean = false;
  esPodio: boolean = false;
  recibimosTiempo = false;
  tiempoPreguntasSeg = 0;
  unsubscribe$ = new Subject<any>();

  ngOnInit(): void {
    this.getIdPartida()
    let ruta = this.router.url.split('/');
    let enLobby = ruta.find((valor: string) => valor == 'lobby');
    if (enLobby == 'lobby') {
      this.esLobby = true;
    }
    let enPodio = ruta.find((valor: string) => valor == 'podio');
    if (enPodio == 'podio') {
      this.esPodio = true;
    }

    this._socketsService.pregunta$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(pregunta => {
        this.tiempoPreguntasSeg = pregunta.segundosEntrePreguntas
        let countdown = setInterval(() => {
        this.tiempoPreguntasSeg--;;
          if (this.tiempoPreguntasSeg <= 0) clearInterval(countdown);
        }, 1000);
      })

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  paramsId:any
  getIdPartida(){
    this.activatedRoute.paramMap
      .subscribe((x:any) => {
        this.paramsId = x.params.id;
      }
    );
  }

  async salirYBorrarPartida(){
    this._partidaService.borrarPartida(this.paramsId)
    this.router.navigateByUrl('/main/home')
    console.log('partida borrada?',this.paramsId);
  }
}
