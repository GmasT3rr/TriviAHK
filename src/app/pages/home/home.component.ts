import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SocketService } from 'app/socket/socket.service';
import { PartidasService } from 'app/services/partidas.service';
import { environment as env } from '../../../environments/environment';
import { TriviasService } from 'app/services/trivias.service';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { ToastService } from 'app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 0;
  public quizes: any[] = [];
  public trivias!: Trivia[];
  usuarioID: number = 0;
  public trivia: any;



  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public socketService: SocketService,
    private _partidaService: PartidasService,
    private triviasService: TriviasService,
    private toastService:ToastService
  ) {
    this.offset = 0;
    this.limit = 4;
  }

  async ngOnInit() {
    (await this.triviasService.getTriviasDelUsuario()).subscribe((res: any) => {
      // console.log(res.body);
      this.trivias = res.body;
    });
  }

  nextQuiz() {
    // || this.limit === 8
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

  // public getColor(index: number): string {
  //    switch (index) {
  //      case 0:
  //        return '#FFB1B5';
  //      case 1:
  //        return '#4A51C9';
  //      case 2:
  //        return '#FD999B';
  //      case 3:
  //        return '#7161EF';
  //      default:
  //        return '#FCFCFC';
  //    }
  // }

  //SOCKETS

  iniciarPartida() {
    this.socketService.iniciarPartida();
  }

  public unirse(usuarioID: string, partidaID: string) {
    this.socketService.unirse(Number(usuarioID), Number(partidaID));
    this.trivia = this.socketService.trivia;
  }

  salirse() {
    this.socketService.salirse();
  }

  mostrarSiguientePregunta() {
    this.socketService.mostrarSiguientePregunta();
  }



}