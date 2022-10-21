import { Component, OnInit } from '@angular/core';
import { faCoffee, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  faUsers = faUsers;
  constructor() {}

  ngOnInit(): void {}
}
