import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, of, tap, throwError } from 'rxjs';
import { environment as env } from '../../../environments/environment';

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

  async getTriviasDelUsuario() {
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

  async crearTriviaConPreguntasOpciones(bodyTrivias: string) {
    const res = this.http.post(
      `${env.dev.serverUrl}/trivias/conPreguntas`,
      bodyTrivias
    );
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        // console.log(err.error);
        return throwError(() => err.error);
      })
    );
  }

  obtenerPartidaDelUsuario() {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${env.dev.serverUrl}/partida/obtenerPartidas/usuario`)
        .toPromise()
        .then((res: any) => {
          resolve(res.body[0].id);
        });
    });
  }

  async actualizarTrivia(bodyTrivias: string, id: any) {
    //Lo que hace en realidad es borrar la trivia anterior y crear una nueva
    const res = this.http.put(
      `${env.dev.serverUrl}/trivias/editarTriviaCompleta/${id}`,
      bodyTrivias
    );
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        // console.log(err.error);
        return throwError(() => err.error);
      })
    );
  }

  async eliminarTriviaPermanente(id: any) {
    const res = this.http.delete(
      `${env.dev.serverUrl}/trivias/eliminarPermanente/${id}`
    );
    return res.pipe(
      tap(res => {
        of(res);
      }),
      catchError(err => {
        // console.log(err.error);
        return throwError(() => err.error);
      })
    );
  }

  obtenerSesionDelUsuario() {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${env.dev.serverUrl}/partida/obtenerPartidas/usuario`)
        .toPromise()
        .then((res: any) => {
          // console.log(res.body[0].id);
          resolve(res.body[0].id);
        });
    });
  }
}
