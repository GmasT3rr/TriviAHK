import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/core/services/user.service';
import { SocketService } from 'app/core/socket/socket.service';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { Pregunta, Trivia } from 'app/trivias/interfaces/Trivias.interface';
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
    private activatedRoute:ActivatedRoute
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
  idPartida:any
  finDePartida=false
  tiempoFinalizo:boolean = false
  tiempoPreguntasSeg:any

  getIdPartida(){
    this.activatedRoute.paramMap
      .subscribe((x:any) => {
        this.idPartida = x.params.id;
      }
    );
  }

  //Prueba bug que si del lobby toco btn iniciar ya tiene la trivia
  //y no va a hacer el trivia.subscribe
  triviaEnviadaLobby!: Trivia;
  inicioPartida:boolean=false
  partidaResultadosPrevios=[{
    nombre:'Rama',
    puntaje:'1200'
  },{
    nombre:'Messi',
    puntaje:'3300'
  },{
    nombre:'Alguien',
    puntaje:'750'
  }]
  partidaResultadosFinales=[{
    nombre:'Rama',
    puntaje:'3000'
  },{
    nombre:'Messi',
    puntaje:'5000'
  },{
    nombre:'Alguien',
    puntaje:'2000'
  }]

  ngOnInit(): void {
    this.getIdPartida()
    this.mostrarSiguientePreg()
    this.inicioPartida = true

    this.preguntas = this._socketsService.trivia._preguntas;

    this._socketsService.pregunta$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((pregunta: any) => {
      this.posicionPregSockets = pregunta.numeroDePregunta + 1;
      this.preguntaActual = this.preguntas[pregunta.numeroDePregunta];
      this.tiempoPreguntasSeg = pregunta.segundosEntrePreguntas;
      this.tengoTriviaYOpciones = true;
    });

    this._socketsService.terminaTiempo$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.habilitarBtnPregunta = true;
      if(this.preguntas.length == this.posicionPregSockets) {
        console.log('final');
      }
    });

    this._socketsService.resultados$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(resultados => {
      console.log('results: ', resultados);
    });
  }

  mostrarSiguientePreg() {
    this._socketsService.mostrarSiguientePregunta();
    this.habilitarBtnPregunta = false;
  }

  ngOnDestroy(): void {
    console.log('ondestroy');
   this._socketsService.desconectar();
   this.unsubscribe$.next(true);
   this.unsubscribe$.unsubscribe();
  }
}
