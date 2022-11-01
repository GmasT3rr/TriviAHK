import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private http: HttpClient
  ) {}

  login() {
    this.authService.loginWithRedirect();
  }

  signup() {
    this.authService.loginWithRedirect({ screen_hint: 'signup' });
  }

  logout() {
    this.authService.logout({ returnTo: this.doc.location.origin });
  }
  getUserInfo() {
    return this.authService.idTokenClaims$;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated$;
  }

  getIdUser() {
    const res = this.http.get(`${env.dev.serverUrl}/usuario/obtenerId`);
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }
}
