import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {


  constructor(private rt: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.isAuthenticated();
  }

  async isAuthenticated() {
    const estaAutenticado = await this.userService.isAuthenticated();
    if (estaAutenticado) {
      this.rt.navigateByUrl('/main/home');
    }
  }

}
