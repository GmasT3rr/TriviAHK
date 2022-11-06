import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/core/services/user.service';
import { SocketService } from 'app/core/socket/socket.service';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import {
  Opciones,
  Pregunta,
  Trivia
} from 'app/trivias/interfaces/Trivias.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
  animations: [onLoadAnimation]
})
export class PartidaComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<any>();

  constructor(
    private router: Router,
    private _socketsService: SocketService,
    private _userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { trivia: Trivia };
    if (state) {
      this.triviaEnviadaLobby = state.trivia;
    }
  }

  preguntas: Pregunta[] = [];
  posicionPregSockets: number = 0;
  preguntaActual!: Pregunta;
  tengoTriviaYOpciones = false;
  habilitarBtnPregunta = true;
  idPartida: any;
  finDePartida = false;
  tiempoFinalizo: boolean = false;
  tiempoPreguntasSeg: any;
  opcionesSeleccionadas: Opciones[] = [];
  resultados$ = this._socketsService.resultados$

  /*
  {
    [
      {id:1},
      {id:2}
    ]
  }
  */

  verOpcion(preguntaActual: any) {
    console.log({ preguntaActual, selecccionado: true });
  }

  getIdPartida() {
    this.activatedRoute.paramMap.subscribe((x: any) => {
      this.idPartida = x.params.id;
    });
  }

  //Prueba bug que si del lobby toco btn iniciar ya tiene la trivia
  //y no va a hacer el trivia.subscribe
  triviaEnviadaLobby!: Trivia;
  inicioPartida: boolean = false;
  partidaResultadosPrevios = [
    {
      nombre: 'Rama',
      puntaje: '1200'
    },
    {
      nombre: 'Messi',
      puntaje: '3300'
    },
    {
      nombre: 'Alguien',
      puntaje: '750'
    }
  ];
  partidaResultadosFinales = [
    {
      nombre: 'Rama',
      puntaje: '3000'
    },
    {
      nombre: 'Messi',
      puntaje: '5000'
    },
    {
      nombre: 'Alguien',
      puntaje: '2000'
    }
  ];

  ngOnInit(): void {
    this.getIdPartida();
    if (
      !this._socketsService.socket?.connected ||
      !this._socketsService.socket
    ) {
      this._socketsService.conectar();
      this._socketsService.iniciarListeners();

      const idUser = Number(localStorage.getItem('idUser'));
      this._socketsService.unirse(idUser, Number(this.idPartida));
    }
    this.mostrarSiguientePreg();
    this.inicioPartida = true;

    this.preguntas = this._socketsService.trivia._preguntas;

    this._socketsService.pregunta$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((pregunta: any) => {
        this._socketsService.resultados$.next([]);
        this.posicionPregSockets = pregunta.numeroDePregunta + 1;
        this.preguntaActual = this.preguntas[pregunta.numeroDePregunta];
        this.tiempoPreguntasSeg = pregunta.segundosEntrePreguntas;
      });

    this._socketsService.opcionesCorrectas$
      .pipe(takeUntil(this.unsubscribe$)    )
      .subscribe((opciones) => {
        this.habilitarBtnPregunta = true;
        console.log(opciones);
        if (this.preguntas.length == this.posicionPregSockets) {
           this.habilitarBtnPregunta = false;
           this.finDePartida = true
        }
      });
  }

  mostrarSiguientePreg() {
    this._socketsService.mostrarSiguientePregunta();
    this.habilitarBtnPregunta = false;
  }

  ngOnDestroy(): void {
    this._socketsService.desconectar();
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  obtenerOpcSelectDeChild(opc: Opciones[]) {
    console.log('opciones obtenidas del child', opc); 
    this.opcionesSeleccionadas = opc;
  }

  responder() {
    this._socketsService.responder(this.opcionesSeleccionadas);
  }
}
