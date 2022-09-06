import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public show:boolean = true

  constructor(private rt:ActivatedRoute,private userService:UserService) {

  }

  ngOnInit(): void {
    const path = this.rt.snapshot.pathFromRoot[1].routeConfig?.path
    console.log(path);
    if(path === 'user'){
      this.show = false
    }
  }

  //METODO LOGOUT AUTH0
  logoutAuth(){
    this.userService.logout();
  }

}
