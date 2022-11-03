import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'app/core/services/user.service';
import { SocketService } from 'app/core/socket/socket.service';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  animations: [onLoadAnimation]
})
export class LobbyComponent implements OnInit {
  constructor(
    private router: Router,
    private _socketsService: SocketService,
    private _userService: UserService
  ) {}
  @ViewChild('respuestUser') input!: ElementRef<HTMLInputElement>;
  faUsers = faUsers;
  idPartida: number = 0;
  conteoUsuarios: number = 0;
  sesiones$!: Observable<any>;
  sesionId: number = 0;
  preguntaTieneid = false;
  preg!: number;

  ngOnInit(): void {
    this._socketsService.iniciar();
    const urlLobby = this.router.url.split('/');
    this.idPartida = Number(urlLobby[urlLobby.length - 1]);
    // TODO: uid en localstorage
    this._userService.getIdUser().subscribe((res: any) => {
      const idUser = res.body;
      this.unirse(idUser, Number(this.idPartida));
    });

    this._socketsService._routerIdPartida$.subscribe((idPartida: Number) => {
      // console.log(this.trivia);
      const navigationExtras: NavigationExtras = {
        state: { trivia: this._socketsService.trivia }
      };
      // this.router.navigate([`/partida/${idPartida}`], navigationExtras);
      this.router.navigate([`/partida/${idPartida}`]);
    });

    // this._socketsService.socket?.on('partida:iniciada-status', mensaje => {
    //   console.log('partida:iniciada status');
    //   // this._socketsService.mostrarSiguientePregunta();
    //   // momentaneo
    //   // this.router.navigateByUrl('/partida/single-choice');
    // });
    this.sesiones$ = this._socketsService.sesiones;
  }

  unirse(usuarioID: number, partidaID: number) {
    this._socketsService.unirse(usuarioID, partidaID);

    // this._socketsService.socket?.on('partida:trivia', t => {
    //   console.log('trivia del component: ', t); // TODO: preguntarle a eze si se puede hacer esto
    // });
    // this._socketsService.trivia.subscribe((t: any) => {
    //   this.trivia = t;
    // });

    // this._socketsService.pregunta.subscribe(preg => {
    //   this.preguntaTieneid = true;
    //   this.preg = preg;
    //   this.trivia._preguntas[preg];
    // });
  }

  finalizarLobby() {
    //ACA HAY QUE PONER EL METODO DE SOCKETS PARA QUE SE SALGAN TODOS LOS USERS DE LA PARTIDA SI EL HOST SE FUE
    this._socketsService.finalizarPartida();
    this.router.navigateByUrl('/main/home');
  }
  salirseLobby() {
    this._socketsService.salirse();
    this.router.navigateByUrl('/main/home');
  }

  iniciarPartida() {
    this._socketsService.iniciarPartida();
  }
}
