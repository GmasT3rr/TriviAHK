import { SocketService } from './../../socket/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  partidas: any;
  usuarioID: number = 0;
  trivia: any;

  constructor(
    public socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.cargarEjemplo();
  }

  private cargarEjemplo(){
    this.partidas = [];
    this.partidas.push({id: "1", cantSesiones: "15", cantPreguntas: "10", promedioAciertos: "78"});
    this.partidas.push({id: "2", cantSesiones: "17", cantPreguntas: "5", promedioAciertos: "90"});
    this.partidas.push({id: "3", cantSesiones: "10", cantPreguntas: "15", promedioAciertos: "12"});
  }

  iniciarPartida(){
    this.socketService.iniciarPartida();
  }

  public unirse(usuarioID: string) {
    this.socketService.unirse(usuarioID);
    this.trivia = this.socketService.trivia;
  }

  salirse() {
    this.socketService.salirse();
  }

  mostrarSiguientePregunta() {
    this.socketService.mostrarSiguientePregunta();
  }

  responder() {
    this.socketService.responder();
  }

  finalizar() {
    this.socketService.finalizarPartida();
  }

}
