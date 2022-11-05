import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { filter } from 'rxjs/operators';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = true;
  public user: any;
  public logo = 'assets/logo-temporal.jpeg';
  public estaEnPartida = true;
  public faLogout = faArrowRightFromBracket;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.isLoggedIn();
    this.usuarioEstáEnPartida();
  }

  usuarioEstáEnPartida() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((x: any) => {
        const inGame = x.url.includes('/partida');
        if (inGame) {
          // console.log('ingame')
          this.estaEnPartida = true;
        } else {
          // console.log('not in game')
          this.estaEnPartida = false;
        }
      });
  }

  //METODO LOGOUT AUTH0
  logoutAuth() {
    this.userService.logout();
  }

  isLoggedIn() {
    this.userService.isAuthenticated().subscribe((res: any) => {
      this.loggedIn = res;
    });
  }

  //Obtener info de usuario
  async getUserInfo() {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    });
  }
}
