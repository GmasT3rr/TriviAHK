import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = true;
  public logo = "assets/logo-temporal.jpeg"
  constructor(private rt: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.isLoggedIn()
  }

  //METODO LOGOUT AUTH0
  logoutAuth() {
    this.userService.logout();
  }

  isLoggedIn(){
    this.userService.isAuthenticated().subscribe((res:any)=>{
      this.loggedIn = res
    })
  }


  //Obtener info de usuario
  public user: any;
  async getUserInfo() {
      this.userService.getUserInfo().subscribe(data => {
        this.user = data;
      });
  }
}
