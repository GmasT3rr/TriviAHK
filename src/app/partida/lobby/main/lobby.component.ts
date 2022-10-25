import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faUsers } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'app/services/user.service';
import { SocketService } from 'app/socket/socket.service';

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

  ngOnInit(): void {
    const urlLobby = this.router.url.split('/');
    this.idPartida = Number(urlLobby[urlLobby.length - 1]);
    this._userService.getIdUser().subscribe((res: any) => {
      const idUser = res.body;
      this._socketsService.unirse(idUser, this.idPartida);
    });
    // console.log(idPartida);
  }

  finalizarLobby() {
    //ACA HAY QUE PONER EL METODO DE SOCKETS PARA QUE SE SALGAN TODOS LOS USERS DE LA PARTIDA SI EL HOST SE FUE
    this._socketsService.salirse();
    this.router.navigateByUrl('/main/home');
  }
  salirseLobby() {
    this._socketsService.salirse();
    this.router.navigateByUrl('/main/home');
  }
}
