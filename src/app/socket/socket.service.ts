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
    this.socket = io("http://localhost:3000");

    this.socket.on("mensaje", (mensajeNuevo: string) => {
      alert(mensajeNuevo);
    });

    this.socket.emit('trivia:unir', {user_id: 5, trivia_id: 1, partida: 85784});
  }
}
