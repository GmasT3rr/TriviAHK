import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket?: Socket;
  public _trivia: any;
  public _pregunta = new Subject<any>();
  private _sesiones = new Subject<any>();
  public _terminaTiempo = new Subject<any>();
  public sesionId!: number;

  public get sesiones() {
    return this._sesiones as Observable<any>;
  }
  public get pregunta(){
    return this._pregunta as Observable<any>;
  }
  public get terminaTiempo(){
    return this._terminaTiempo as Observable<any>;
  }

  constructor() {
    // this.iniciar();
  }

  public iniciar() {
    this.socket = io('http://localhost:3000/juego');

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
      this._trivia.next(t);
    });

    this.socket.on('partida:iniciada-status', p => {
      console.log(p);
    });

    this.socket.on('partida:mostrar-pregunta', r => {
      this._pregunta.next(r);
    });

    this.socket.on('partida:termina-tiempo', r => {
      this._terminaTiempo.next(r);
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
      this._sesiones.next(r);
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
          id: 3
        },
        {
          id: 4
        }
      ],
      tiempoEnSegundos: 20
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
}
