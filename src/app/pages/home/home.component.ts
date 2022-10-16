import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SocketService } from 'app/socket/socket.service';
import { PartidasService } from 'app/services/partidas.service';
import { environment as env } from '../../../environments/environment';
import { TriviasService } from 'app/services/trivias.service';
import { Trivia } from 'app/interfaces/Trivias.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public offset: number;
  public limit: number;
  public quizes: any[] = [];

  partidas: any;
  public trivias!: Trivia[];
  usuarioID: number = 0;
  public trivia: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public socketService: SocketService,
    private partidaService: PartidasService,
    private triviasService: TriviasService
  ) {
    this.offset = 0;
    this.limit = 4;
  }

  // Crear un servicio el cual va a tener la responsabilidad de llamar a nuestro back (partidas.service)
  // Inyectar en partida.service el objeto http
  // Creamos los metodos para poder llamar al los endpoints del back
  // Inyectar este servicio en este componente (home.commponent)
  // En el ngOnInit deberiamos llamar al servicio y traernos todas las partidas
  // En la maqueta deberiamos mostrar todas las partidas obtenidas desde el back

  // private getPartidas(){
  //     this.partidaService.getPartidas().subscribe((partidas:any)=>
  //     {this.quizes = partidas}
  //     )
  //   }

  ngOnInit(): void {
    // this.partidaService.getQuizzes().subscribe((quizes: any) => {
    //   this.quizes = quizes;
    // });
    this.triviasService.getTrivias().subscribe((res: any) => {
      // console.log(res.body);
      this.trivias = res.body;
    });
    // this.getPartidas()

    //Metodo para obtener info del login
    // this.authService.idTokenClaims$.subscribe((claims) => console.log(claims));
  }

  nextQuiz() {
    if (this.offset >= this.trivias.length - 4) {
      null;
    } else {
      this.offset += 4;
      this.limit += 4;
    }
  }
  prevQuiz() {
    if (this.offset <= 0) {
    } else {
      this.offset -= 4;
      this.limit -= 4;
    }
  }

  public getColor(index: number): string {
    switch (index) {
      case 0:
        return '#FF5C95';
      case 1:
        return '#50FFB5';
      case 2:
        return '#FFEB33';
      case 3:
        return '#69E2FF';
      default:
        return '#FCFCFC';
    }
    // switch (index) {
    //   case 0:
    //     return '#FFB1B5';
    //   case 1:
    //     return '#4A51C9';
    //   case 2:
    //     return '#FD999B';
    //   case 3:
    //     return '#7161EF';
    //   default:
    //     return '#FCFCFC';
    // }
  }

  //SOCKETS

  iniciarPartida() {
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
}
