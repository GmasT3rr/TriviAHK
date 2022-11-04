import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/core/services/user.service';
import { SocketService } from 'app/core/socket/socket.service';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { Pregunta, Trivia } from 'app/trivias/interfaces/Trivias.interface';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
  animations: [onLoadAnimation]
})
export class PartidaComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private _socketsService: SocketService,
    private _userService: UserService,
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
    //Sin el timeout no funciona por algun motivo
    setTimeout(() => {
      this.mostrarSiguientePreg()
      this.inicioPartida = true
    }, 500);
    //TODO Ver el tema este
    // this._socketsService.iniciar();
    // const urlLobby = this.router.url.split('/');
    // this.idPartida = Number(urlLobby[urlLobby.length - 1]);
    // this._userService.getIdUser().subscribe((res: any) => {
    //   const idUser = res.body;
    //   this._socketsService.unirse(idUser, Number(this.idPartida));

    // this._socketsService.mostrarSiguientePregunta()
    // });

    // this._socketsService.pregunta.subscribe(console.log);

    // // this._socketsService.unirse(1, 30);
    // this._socketsService.trivia.subscribe((trivia: Trivia) => {
    //   console.log('trivia del ngOnInit');
    //   this.preguntas = trivia._preguntas;
    // });
    // console.log(this._socketsService.trivia._preguntas);
    this.preguntas = this._socketsService.trivia._preguntas;

    //SI existe entonces
    // if (this.triviaEnviadaLobby) {
    //   console.log('trivia enviada del lobby');
    //   this.preguntas = this.triviaEnviadaLobby._preguntas;
    // }
    this._socketsService.pregunta$.subscribe((posicionPreg: number) => {
      // + 1 porque arranca en 0 la pregunta
      this.posicionPregSockets = posicionPreg + 1;
      this.preguntaActual = this.preguntas[posicionPreg];
      this.tengoTriviaYOpciones = true;
    });

    this._socketsService.terminaTiempo$.subscribe(() => {
      //Mientras no haya llegado al final del array preguntas
      //habilitamos preg
      if (this.preguntas.length > this.posicionPregSockets) {
        this.habilitarBtnPregunta = true;
      } else {
        this.habilitarBtnPregunta = false
        this.finDePartida=true
      };
    });
    // this._socketsService.socket?.on('partida:trivia', t => {
    //   console.log('trivia del component: ', t); // TODO: preguntarle a eze si se puede hacer esto
    // });
  }

  tiempoFinalizo:boolean = false
  tiempoPreguntasSeg:any


  mostrarSiguientePreg() {
    console.log(this.preguntas.length);
    console.log(this.posicionPregSockets + 1);
    //Valido che llegue al final del preguntas
    //Sino
    if (this.preguntas.length >= this.posicionPregSockets + 1) {
      this._socketsService.mostrarSiguientePregunta();
      this.habilitarBtnPregunta = false;
    }
  }

  ngOnDestroy(): void {
  //  this._socketsService.desconectar();
  }
}
