import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public show:boolean = true

  constructor(private rt:ActivatedRoute, public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,) {

  }

  ngOnInit(): void {
    const path = this.rt.snapshot.pathFromRoot[1].routeConfig?.path
    console.log(path);
    if(path === 'user'){
      this.show = false
    }
  }

  //METODO LOGOUT AUTH0
  logout(){
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
