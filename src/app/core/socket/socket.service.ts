import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opciones } from 'app/trivias/interfaces/Trivias.interface';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _socket?: Socket;
  // public trivia = new Subject<any>();
  public trivia: any;
  public pregunta$ = new Subject<any>();
  private sesiones$ = new Subject<any>();
  public opcionesCorrectas$ = new Subject<any>();
  public sesionId!: number;
  public routerIdPartida$ = new Subject<any>();
  private _resultados$ = new Subject<any[]>();

  public get sesiones() {
    return this.sesiones$ as Observable<any>;
  }

  public get resultados$() {
    return this._resultados$;
  }

  public get socket() {
    return this._socket;
  }

  constructor(private http: HttpClient) {}

  conectar() {
    this._socket = io('http://localhost:3000/juego');
  }

  public iniciarListeners() {
    this.socket?.on('mensaje', (mensajeNuevo: string) => {
      //alert(mensajeNuevo);
    });

    this.socket?.on('partida:status-union', (partida: any) => {
      console.log(partida);
      // esta bien hacer esto
      this.sesionId = partida.id;
      // SI ACA HACES ALGO QUE TIRE UN ERROR, NOSE PQ PERO SE VUELVE A CONECTAR A SOCKET?s
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
    this.socket?.on('partida:salido', (p: any) => {
      console.log(p);
    });

    // Trae la trivia en juego
    this.socket?.on('partida:trivia', t => {
      // this.trivia.next(t);
      this.trivia = t;
    });

    this.socket?.on('partida:iniciada-status', p => {
      // console.log(p);
    });

    this.socket?.on(
      'partida:mostrar-pregunta',
      (obj: { numeroDePregunta: number; segundosEntrePreguntas: number }) => {
        // console.log('hola me dispare');
        this.pregunta$.next(obj);
      }
    );

    this.socket?.on('partida:opciones-correctas', r => {
      this.opcionesCorrectas$.next(r);
    });

    this.socket?.on('partida:respondio', r => {
      console.log(r);
    });

    this.socket?.on('partida:resultados', r => {
      this.resultados$.next(r);
    });

    this.socket?.on('partida:terminada', r => {
      console.log(r);
    });

    this.socket?.on('partida:sesiones-conectadas', r => {
      console.log(r);
      this.sesiones$.next(r);
    });

    this.socket?.on('partida:router', r => {
      // console.log('hola router', r);
      this.routerIdPartida$.next(r);
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

  public responder(opcSeleccionadas: Opciones[]) {
    // const opciones = {
    //   opciones: [
    //     {
    //       id: 123
    //     },
    //     {
    //       id: 122
    //     }
    //   ]
    // };
    let opcsIds: { id: number }[] = [];
    for (const opc of opcSeleccionadas) {
      opcsIds.push({ id: opc.id });
    }
    const opciones = opcsIds;
    // console.log(opciones);

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
    this.socket?.disconnect();
    this.socket?.removeAllListeners();
  }
}
