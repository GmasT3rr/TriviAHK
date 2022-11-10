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
    if(!this._socketsService.socket?.connected || !this._socketsService.socket) {
      this._socketsService.conectar();
      this._socketsService.iniciarListeners();
      const urlLobby = this.router.url.split('/');
      this.idPartida = Number(urlLobby[urlLobby.length - 1]);
      const idUser = Number(localStorage.getItem('idUser'));
      this.unirse(idUser, Number(this.idPartida));
    }
    this._socketsService.routerIdPartida$.subscribe((idPartida: Number) => {
      this.router.navigate([`/partida/${idPartida}`]);
    });
    this.sesiones$ = this._socketsService.sesiones;
  }

  unirse(usuarioID: number, partidaID: number) {
    this._socketsService.unirse(usuarioID, partidaID);
  }

  finalizarLobby() {
    //ACA HAY QUE PONER EL METODO DE SOCKETS PARA QUE SE SALGAN TODOS LOS USERS DE LA PARTIDA SI EL HOST SE FUE
    this._socketsService.finalizarPartida();
    this._socketsService.desconectar();
    this.router.navigateByUrl('/main/home');
    console.log(this._socketsService);
  }
  salirseLobby() {
    this._socketsService.salirse();
    this.router.navigateByUrl('/main/home');
  }
  iniciarPartida() {
    this._socketsService.iniciarPartida();
  }
}
