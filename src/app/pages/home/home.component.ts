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

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private socketService: SocketService,
    private partidaService: PartidasService,
    private triviasService: TriviasService
  ) {
    this.offset = 0;
    this.limit = 4;
    this.quizes = [
      {
        id: '1',
        title: 'Cuestionario numero 1',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      },
      {
        id: '2',
        title: 'Cuestionario numero 2',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      },
      {
        id: '3',
        title: 'Cuestionario numero 3',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      },
      {
        id: '4',
        title: 'Cuestionario numero 4',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      },
      {
        id: '5',
        title: 'Cuestionario numero 5',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      },
      {
        id: '6',
        title: 'Cuestionario numero 6',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      },
      {
        id: '7',
        title: 'Cuestionario numero 7',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      },
      {
        id: '8',
        title: 'Cuestionario numero 8',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      },
      {
        id: '9',
        title: 'Cuestionario numero 9',
        description: 'Esta es una bree descripcion del ceustionario',
        preguntas: '10',
        participantes: '25',
        ratio: '80%'
      }
    ];
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
    this.cargarEjemplo;
    this.partidaService.getQuizzes().subscribe((quizes: any) => {
      this.quizes = quizes;
    });
    this.triviasService.getTrivias().subscribe((res: any) => {
      // console.log(res.body);
      this.trivias = res.body;
    });
    // this.getPartidas()

    //Metodo para obtener info del login
    // this.authService.idTokenClaims$.subscribe((claims) => console.log(claims));
  }

  nextQuiz() {
    if (this.offset >= this.quizes.length - 4) {
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
        return '#1A0537';
      case 1:
        return '#A36CD9';
      case 2:
        return '#FF3078';
      case 3:
        return '#671073';
      default:
        return '#abc';
    }
  }

  //SOCKETS
  private cargarEjemplo() {
    this.partidas = [];
    this.partidas.push({
      id: '1',
      cantSesiones: '15',
      cantPreguntas: '10',
      promedioAciertos: '78'
    });
    this.partidas.push({
      id: '2',
      cantSesiones: '17',
      cantPreguntas: '5',
      promedioAciertos: '90'
    });
    this.partidas.push({
      id: '3',
      cantSesiones: '10',
      cantPreguntas: '15',
      promedioAciertos: '12'
    });
  }

  public unirse() {
    this.socketService.unirse();
  }

  salirse() {
    this.socketService.salirse();
  }
}
