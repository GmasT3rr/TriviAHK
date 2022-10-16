import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public show: boolean = true;
  public logo = "assets/logo-temporal.jpeg"
  constructor(private rt: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.checkRoute();
  }

  //METODO LOGOUT AUTH0
  logoutAuth() {
    this.userService.logout();
  }

  //Verfificar en que ruta esta el usuario para mostrar su imagen o no
  private checkRoute() {
    const path = this.rt.snapshot.pathFromRoot[1]?.routeConfig?.path;
    console.log(path);
    if (path === 'user') {
      this.show = false;
    }
  }

  //Obtener info de usuario
  public user: any;
  async getUserInfo() {
      this.userService.getUserInfo().subscribe(data => {
        this.user = data;
      });
  }
}
