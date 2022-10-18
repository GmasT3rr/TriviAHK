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
      {segundosEntrePreguntas}
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
}
