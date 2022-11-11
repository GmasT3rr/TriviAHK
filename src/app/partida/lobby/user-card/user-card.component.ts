import { Component, Input, OnInit } from '@angular/core';
import { faPoo, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() sesion: any;

  faUser = faUser;
  faUserCard = faPoo;
  constructor() {}

  ngOnInit(): void {}
}
