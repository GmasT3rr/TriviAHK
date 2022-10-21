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
      alert(mensajeNuevo);
    });

    this.socket.on('partida:status-union', (partida: any) => {
      console.log(partida);
      // esta bien hacer esto
      this.sesion = partida.id;
      // SI ACA HACES ALGO QUE TIRE UN ERROR, NOSE PQ PERO SE VUELVE A CONECTAR A SOCKETs
    });
    this.socket.on('partida:unido', (mensaje:any) => {
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
    this.socket.on('partida:salido', (p: any) => {
      console.log(p);
    })
    this.socket.on('partida:trivia', (t) => {
      console.log(t);
      this.trivia = t;
    })

    this.socket.on('partida:iniciada-status', p => {
      console.log(p);
    })

    this.socket.on('partida:mostrar-pregunta', r => {
      console.log(r);
    })

    this.socket.on('partida:termina-tiempo', r => {
      console.log(r);
    })

    this.socket.on('partida:respondio', r => {
      console.log(r);
    })

    this.socket.on('partida:resultados', r => {
      console.log(r);
    })

    this.socket.on('partida:terminada', r => {
      console.log(r);
    })
  }

  public iniciarPartida() {
    this.socket?.emit('partida:iniciar');
  }

  sesion = 0;
  trivia: any;
  // como disparar el evento sin que 
  public unirse(usuarioID: string) {
    this.socket!.emit('partida:unir', {usuarioID, partidaID: 1});
    
  }

  public salirse() {
    const sesionID = {sesionID: this.sesion || 104}
    this.socket!.emit('partida:salir', sesionID);
    this.socket!.once('partida:status-salida', (p: any) => {
      console.log(p);
    })
    // this.socket?.off('partida:status-salida');

    // "error": false,
    // "result": {
    //     "msg": "Has salido de la sesion"
    // },
    // "status": 200
  }

  public mostrarSiguientePregunta(){
    this.socket!.emit('partida:siguiente-pregunta')
  }

  public responder(){
    const opciones = {
      opciones: [
        {
          id: 3,
        },
        {
          id: 4,
        }
      ],
      tiempoEnSegundos: 20,
    }
    this.socket!.emit('partida:responder', opciones)
    // const respuestas = {
    //   opcion: [1]
    // }
    // this.socket!.emit('partida:responder', respuestas);
    // this.socket!.once('partida:status-respuesta', (p: any) => {
    //   console.log(p);
    // })
  }

  public mostrarResultados() {

  }

  public finalizarPartida() {
    this.socket?.emit('partida:finalizar');
  }
}
