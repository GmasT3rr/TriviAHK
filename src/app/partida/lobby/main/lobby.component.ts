import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'app/services/user.service';
import { SocketService } from 'app/socket/socket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  constructor(
    private router: Router,
    private _socketsService: SocketService,
    private _userService: UserService
  ) {}
  faUsers = faUsers;
  idPartida: number = 0;
  conteoUsuarios: number = 0
  trivia: any;
  sesiones$!: Observable<any>
  sesionId: number = 0

  ngOnInit(): void {
    this._socketsService.iniciar();
    const urlLobby = this.router.url.split('/');
    this.idPartida = Number(urlLobby[urlLobby.length - 1]);
    // TODO: uid en localstorage
    this._userService.getIdUser().subscribe((res: any) => {
      const idUser = res.body;
      this.unirse(idUser, Number(this.idPartida));
    });

    this._socketsService.socket?.on('partida:iniciada-status', mensaje => {
      console.log('partida:iniciada status');
      this._socketsService.mostrarSiguientePregunta();
      // momentaneo
      this.router.navigateByUrl('/partida/single-choice');
    })
    this.sesiones$ = this._socketsService.sesiones;
  }

  unirse(usuarioID: number, partidaID: number) {
    this._socketsService.unirse(usuarioID, partidaID);

    this._socketsService.socket?.on('partida:trivia', t => {
      console.log('trivia del component: ', t); // TODO: preguntarle a eze si se puede hacer esto
    })
    this._socketsService._trivia.subscribe((t:any) => {
      this.trivia = t;
    });

    this._socketsService.pregunta.subscribe(preg => {
      this.trivia[preg];
    })
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
