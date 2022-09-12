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

  }

  // como disparar el evento sin que 
  public unirse() {
    this.socket!.emit('partida:unir', {usuarioID: 1, partidaID: 1});
    this.socket!.once('partida:status-union', (partida: any) => {
      console.log(partida);
      // esta bien hacer esto
    });
    this.socket!.on('partida:unido', (mensaje:any) => {
      console.log(mensaje);
    });
  }

  public salirse() {
    this.socket!.emit('partida:salir', {sesionID: 18});
    this.socket!.once('partida:status-salida', (p: any) => {
      console.log(p);
    })
    // this.socket?.off('partida:status-salida');
    this.socket!.on('partida:salido', (p: any) => {
      console.log(p);
    })
  }
}
