import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  constructor(private router: Router) {}
  faUsers = faUsers;
  idPartida: number = 0;

  ngOnInit(): void {
    const urlLobby = this.router.url.split('/');
    this.idPartida = Number(urlLobby[urlLobby.length - 1]);
    // console.log(idPartida);
  }
}
