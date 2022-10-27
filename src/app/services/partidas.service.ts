import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  constructor(private http: HttpClient) {}

  crearPartida(idTrivia: number, segundosEntrePreguntas: number) {
    const res = this.http.post(
      `${env.dev.serverUrl}/partida/crear/${idTrivia}`,
      { segundosEntrePreguntas }
    );
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }
  //Partidas creadas por el usuario
  getPartidas() {
    const res = this.http.get(
      `${env.dev.serverUrl}/partida/obtenerPartidas/usuario`
    );
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  obtenerPartida(idPartida: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${env.dev.serverUrl}/partida/${idPartida}`)
        .toPromise()
        .then((res: any) => {
          // console.log(res.body[0].id);
          resolve(res.body);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
