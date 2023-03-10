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
import { PartidasService } from 'app/trivias/services/partidas.service';
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
    private activatedRoute: ActivatedRoute,
    private readonly _partidaService: PartidasService
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
  opcionesRespondidas: Opciones[] = [];
  opcionesCorrectas: any[] = [];
  resultados$ = this._socketsService.resultados$;
  yaRespondiste = false;
  opcYCant: {
    id: number | undefined;
    descripcion: string | undefined;
    cantidad: number;
  }[] = [];

  getIdPartida() {
    this.activatedRoute.paramMap.subscribe((x: any) => {
      this.idPartida = x.params.id;
    });
  }

  //Prueba bug que si del lobby toco btn iniciar ya tiene la trivia
  //y no va a hacer el trivia.subscribe
  triviaEnviadaLobby!: Trivia;
  inicioPartida: boolean = false;

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
        this.opcYCant = [];
        // console.log('preguntas',pregunta);
        // console.log('numero preguntas',pregunta.numeroDePregunta);
        // console.log('preg[numPreg]',this.preguntas[pregunta.numeroDePregunta]);

        this._socketsService.resultados$.next([]);
        // TODO: si no respondes luego de haber respondido en la pregunta anterior, te salta como si hubieses respondido la anterior
        this.opcionesRespondidas = [];
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
        }
      });

    this._socketsService.respondiste$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respondiste: string) => {
        this.yaRespondiste = true;
      });

    this._socketsService.opcMasSeleccionadaVot$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((opcSeleccionadas: { id: number; cantidad: number }[]) => {
        // console.log('opcs', opcSeleccionadas);
        this.opcYCant = [];
        for (const opc of opcSeleccionadas) {
          const pregunta = this.preguntaActual._opciones.find(
            opcionPreg => opcionPreg.id == opc.id
          );
          this.opcYCant.push({
            id: pregunta?.id,
            descripcion: pregunta?._descripcion,
            cantidad: opc.cantidad
          });
          // console.log(
          //   'pregunta ',
          //   this.preguntaActual._opciones.find(
          //     opcionPreg => opcionPreg.id == opc.id
          //   ),
          //   'cant ',
          //   opc.cantidad
          // );
        }
        console.log('cant opc vot, ', this.opcYCant);
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
    this.opcionesSeleccionadas = opc;
  }

  responder() {
    this._socketsService.responder(
      this.opcionesSeleccionadas,
      this.preguntaActual.id
    );
    this.opcionesRespondidas = this.opcionesSeleccionadas;
    this._partidaService.puedeResponder.next(false);
  }
}
