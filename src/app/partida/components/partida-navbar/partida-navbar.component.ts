import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partida-navbar',
  templateUrl: './partida-navbar.component.html',
  styleUrls: ['./partida-navbar.component.css']
})
export class PartidaNavbarComponent implements OnInit {
  constructor(private router: Router) {}

  esLobby: boolean = false;

  ngOnInit(): void {
    let ruta = this.router.url.split('/');
    let res = ruta.find((valor: string) => valor == 'lobby');
    if (res == 'lobby') {
      this.esLobby = true;
    }
    // console.log(res);
  }
}
