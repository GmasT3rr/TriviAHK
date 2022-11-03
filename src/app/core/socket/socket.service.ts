import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // public socket?: Socket;
  // public trivia = new Subject<any>();
  public trivia: any;
  public pregunta$ = new Subject<any>();
  private _sesiones$ = new Subject<any>();
  public terminaTiempo$ = new Subject<any>();
  public sesionId!: number;
  public _routerIdPartida$ = new Subject<any>();
  public _segundosEntrePreguntas$ = new Subject<any>();

  public get sesiones() {
    return this._sesiones$ as Observable<any>;
  }

  constructor(private http:HttpClient) {
    // this.iniciar();
  }

  socket = io('http://localhost:3000/juego');

  public iniciar() {
    this.socket.on('mensaje', (mensajeNuevo: string) => {
      //alert(mensajeNuevo);
    });

    this.socket.on('partida:status-union', (partida: any) => {
      console.log(partida);
      // esta bien hacer esto
      this.sesionId = partida.id;
      // SI ACA HACES ALGO QUE TIRE UN ERROR, NOSE PQ PERO SE VUELVE A CONECTAR A SOCKETs
    });

    //     "error": false,
    //     "result": {
    //         "_usuario": {
    //             "id": 1,
    //             "_nombre": "Facundo",
    //             "_apellido": "Calbo",
    //             "_email": "facundo@mail.com",
    //             "_JWT": "0"
    //         },
    //         "_partida": {
    //             "id": 1,
    //             "_countSesiones": -1,
    //             "_sesionesConectadas": [
    //                 null
    //             ],
    //             "_usuarioHost": null
    //         },
    //         "id": 26
    //     },
    //     "status": 200
    this.socket.on('partida:salido', (p: any) => {
      console.log(p);
    });

    // Trae la trivia en juego
    this.socket.on('partida:trivia', t => {
      // this.trivia.next(t);
      this.trivia = t;
    });

    this.socket.on('partida:iniciada-status', p => {
      // console.log(p);
    });

    this.socket.on(
      'partida:mostrar-pregunta',
      (obj: { numeroDePregunta: number; segundosEntrePreguntas: number }) => {
        // console.log(
        //   'num preg',
        //   obj.numeroDePregunta,
        //   'seg',
        //   obj.segundosEntrePreguntas
        // );
        console.log('hola me dispare');
        this.pregunta$.next(obj.numeroDePregunta);
        this._segundosEntrePreguntas$.next(obj.segundosEntrePreguntas);
      }
    );

    this.socket.on('partida:termina-tiempo', r => {
      this.terminaTiempo$.next(r);
    });

    this.socket.on('partida:respondio', r => {
      console.log(r);
    });

    this.socket.on('partida:resultados', r => {
      console.log(r);
    });

    this.socket.on('partida:terminada', r => {
      console.log(r);
    });

    this.socket.on('partida:sesiones-conectadas', r => {
      console.log(r);
      this._sesiones$.next(r);
    });

    this.socket.on('partida:router', r => {
      // console.log('hola router', r);
      this._routerIdPartida$.next(r);
    });
  }

  public iniciarPartida() {
    this.socket?.emit('partida:iniciar');
  }

  // como disparar el evento sin que
  public unirse(usuarioID: number, partidaID: number) {
    this.socket!.emit('partida:unir', { usuarioID, partidaID });
  }

  public salirse(idSesion: number = this.sesionId) {
    const sesionID = { sesionID: idSesion };
    this.socket!.emit('partida:salir', sesionID);
    this.socket!.once('partida:status-salida', (p: any) => {
      console.log(p);
    });
    // this.socket?.off('partida:status-salida');

    // "error": false,
    // "result": {
    //     "msg": "Has salido de la sesion"
    // },
    // "status": 200
  }

  public mostrarSiguientePregunta() {
    this.socket!.emit('partida:siguiente-pregunta');
  }

  public responder() {
    const opciones = {
      opciones: [
        {
          id: 123
        },
        {
          id: 122
        }
      ]
    };

    this.socket!.emit('partida:responder', opciones);
    // const respuestas = {
    //   opcion: [1]
    // }
    // this.socket!.emit('partida:responder', respuestas);
    // this.socket!.once('partida:status-respuesta', (p: any) => {
    //   console.log(p);
    // })
  }

  public mostrarResultados() {}

  public finalizarPartida() {
    this.socket?.emit('partida:finalizar');
  }

  public desconectar() {
    this.socket.disconnect();
  }

}
