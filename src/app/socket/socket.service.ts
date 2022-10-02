import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket?: Socket;

  constructor() {
    this.iniciar();
  }

  public iniciar() {
    this.socket = io("http://localhost:3000/juego");

    this.socket.on("mensaje", (mensajeNuevo: string) => {
      // alert(mensajeNuevo);
    });

  }

  sesion = 0;

  // como disparar el evento sin que
  public unirse() {
    this.socket!.emit('partida:unir', {usuarioID: 1, partidaID: 1});
    this.socket!.once('partida:status-union', (partida: any) => {
      console.log(partida);
      // esta bien hacer esto
      this.sesion = partida.id;
      // SI ACA HACES ALGO QUE TIRE UN ERROR, NOSE PQ PERO SE VUELVE A CONECTAR A SOCKETS
    });
    this.socket!.on('partida:unido', (mensaje:any) => {
      console.log(mensaje);
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
    this.socket?.on('partida:trivia', (t) => {
      console.log(t);
    })
  }

  public salirse() {
    const sesionID = {sesionID: this.sesion || 33}
    this.socket!.emit('partida:salir', sesionID);
    this.socket!.once('partida:status-salida', (p: any) => {
      console.log(p);
    })
    // this.socket?.off('partida:status-salida');
    this.socket!.on('partida:salido', (p: any) => {
      console.log(p);
    })
    // "error": false,
    // "result": {
    //     "msg": "Has salido de la sesion"
    // },
    // "status": 200
  }

  public responder(){
    // const respuestas = {
    //   opcion: [1]
    // }
    // this.socket!.emit('partida:responder', respuestas);
    // this.socket!.once('partida:status-respuesta', (p: any) => {
    //   console.log(p);
    // })
  }

  public iniciarPartida(){

  }

  public mostrarPregunta(){

  }

  public mostrarResultados() {

  }
}
