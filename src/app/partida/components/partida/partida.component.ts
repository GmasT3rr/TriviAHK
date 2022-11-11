import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/core/services/user.service';
import { SocketService } from 'app/core/socket/socket.service';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import {
  Resultado,
  UsuariosPuntuacion
} from 'app/trivias/interfaces/Resultado.interface';
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
  opcionesCorrectas: any[] = [];
  resultados$ = this._socketsService.resultados$;
  yaRespondiste = false;

  getIdPartida() {
    this.activatedRoute.paramMap.subscribe((x: any) => {
      this.idPartida = x.params.id;
    });
  }

  //Prueba bug que si del lobby toco btn iniciar ya tiene la trivia
  //y no va a hacer el trivia.subscribe
  triviaEnviadaLobby!: Trivia;
  inicioPartida: boolean = false;

  partidaResultadosFinales: UsuariosPuntuacion[] = [];

  ngOnInit(): void {
    // console.log('buenas');
    this.getIdPartida();
    this.mostrarSiguientePreg();
    if (
      !this._socketsService.socket?.connected ||
      !this._socketsService.socket
    ) {
      this._socketsService.conectar();
      this._socketsService.iniciarListeners();

      const idUser = Number(localStorage.getItem('idUser'));
      this._socketsService.unirse(idUser, Number(this.idPartida));
    }
    this.inicioPartida = true;

    this.preguntas = this._socketsService.trivia._preguntas;

    this._socketsService.pregunta$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((pregunta: any) => {
        // console.log('preguntas',pregunta);
        // console.log('numero preguntas',pregunta.numeroDePregunta);
        // console.log('preg[numPreg]',this.preguntas[pregunta.numeroDePregunta]);

        this._socketsService.resultados$.next([]);
        this.posicionPregSockets = pregunta.numeroDePregunta + 1;
        // this.posicionPregSockets = pregunta.numeroDePregunta ;

        this.preguntaActual = this.preguntas[pregunta.numeroDePregunta];
        this.tiempoPreguntasSeg = pregunta.segundosEntrePreguntas;
      });

    this._socketsService.opcionesCorrectas$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(opcionesCorrectas => {
        this.opcionesCorrectas = opcionesCorrectas;
        this.habilitarBtnPregunta = true;
        this.yaRespondiste = false;
        // console.log(opciones);
        if (this.preguntas.length == this.posicionPregSockets) {
          // console.log('hola llegue al fin');
          this.habilitarBtnPregunta = false;
          this.finDePartida = true;
          this._socketsService.resultados$.subscribe(
            (resultados: Resultado[]) => {
              console.log(resultados);
              for (const resultado of resultados) {
                const puntaje = {
                  nombre: resultado.usuario.nombre,
                  puntaje: resultado.puntajeTotal
                };

                this.partidaResultadosFinales.push(puntaje);
                this.partidaResultadosFinales =
                  this.partidaResultadosFinales.sort(
                    (a: UsuariosPuntuacion, b: UsuariosPuntuacion) => {
                      return b.puntaje - a.puntaje;
                    }
                  );

                console.log(this.partidaResultadosFinales);
              }
            }
          );
        }
      });

    this._socketsService.respondiste$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respondiste: string) => {
        this.yaRespondiste = true;
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
