import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { PartidasService } from 'app/trivias/services/partidas.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyGuard implements CanActivate {
  constructor(
    private _partidasService: PartidasService,
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
    const urlLobby = state.url.split('/');
    //Expresión Regex para ver si son todos números
    let sampleRegEx: RegExp = /^[0-9]*$/;
    //Si lo que va a hacer el idTrivia es erroneo Ejemplo:(asdasd)
    //retorna a main/home
    if (sampleRegEx.test(urlLobby[urlLobby.length - 1]) == false) {
      this.router.navigateByUrl('/main/home');
      return false;
    }
    const idLobbyNumber = Number(urlLobby[urlLobby.length - 1]);
    return this._partidasService
      .obtenerPartida(idLobbyNumber)
      .then((res: any) => {
        // console.log(res);
        // if (res.id == idLobbyNumber && res._estaAbierta == 1 && res._esActiva != 0) return true;
        if (
          res.id == idLobbyNumber &&
          res._estaAbierta == true
          // && res._esActiva != true
        )
          return true;
        // console.log('canACtivate');
        this.router.navigateByUrl('/main/home');
        return false;
      })
      .catch(error => {
        // console.log(error);
        //Si tenemos algun error del server nos manda al main/home
        this.router.navigateByUrl('/main/home');
        return false;
      });
  }
}
