import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { TriviasService } from 'app/services/trivias.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyGuard implements CanActivate {
  constructor(
    private _triviasService: TriviasService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // console.log(state.url);
    const urlLobby: string[] = state.url.split('/');
    // console.log(urlLobby[urlLobby.length - 1]);
    const idLobbyNumber = Number(urlLobby[urlLobby.length - 1]);
    return this._triviasService.obtenerSesionDelUsuario().then(res => {
      // console.log(res);
      if (res == idLobbyNumber) return true;
      console.log('canACtivate');
      this.router.navigateByUrl('/main/home');
      return false;
    });
  }
}
