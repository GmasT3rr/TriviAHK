import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService:AuthService,@Inject(DOCUMENT) private doc: Document,) { }

  login(){
    this.authService.loginWithRedirect()
   }
  
  signup(){
     this.authService.loginWithRedirect({ screen_hint: 'signup' });
  }
    
  logout(){
    this.authService.logout({ returnTo: this.doc.location.origin });
  }
  getUserInfo(){
    return  this.authService.idTokenClaims$;
  }

  isAuthenticated(){
    return this.authService.isAuthenticated$
  }
  
}
