import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/services/user.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {
  constructor(private rt: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.isAuthenticated();
  }

  async isAuthenticated() {
    const estaAutenticado = await this._userService.isAuthenticated();
    if (estaAutenticado) {
      setTimeout(() => {
        this.rt.navigateByUrl('/main/home');
      }, 500);
    }
  }
}
