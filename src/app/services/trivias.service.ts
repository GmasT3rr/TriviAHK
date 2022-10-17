import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriviasService {
  constructor(private http: HttpClient) {}

  getTrivias() {
    const res = this.http.get(`${env.dev.serverUrl}/trivias`);
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  getTriviasDelUsuario() {
    const res = this.http.get(`${env.dev.serverUrl}/trivias/usuario`);
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  crearTriviaConPreguntasOpciones(bodyTrivias: string) {
    const res = this.http.post(
      `${env.dev.serverUrl}/trivias/conPreguntas`,
      bodyTrivias
    );
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        console.log(err.error);
        return throwError(() => err);
      })
    );
  }
}
