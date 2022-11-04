import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { Router } from '@angular/router';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { Trivia } from 'app/trivias/interfaces/Trivias.interface';
import { SocketService } from 'app/core/socket/socket.service';
import { PartidasService } from 'app/trivias/services/partidas.service';
import { TriviasService } from 'app/trivias/services/trivias.service';
import { ToastService } from 'app/core/services/toast.service';
import { UserService } from 'app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [onLoadAnimation]
})
export class HomeComponent implements OnInit, OnDestroy {
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
    private toastService: ToastService,
    private router: Router,
    private userService:UserService
  ) {
    this.offset = 0;
    this.limit = 4;
  }

  async ngOnInit() {
    (await this.triviasService.getTriviasDelUsuario()).subscribe((res: any) => {
      // console.log(res.body);
      this.trivias = res.body;
    });
    this.userService.getIdUser().subscribe((res:any)=>{
      localStorage.setItem('idUser',res.body)
    })
  }
  ngOnDestroy() {}

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

  // NO LO BORREN QUE SIRVE DE RECUERDO XD
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
  irVerTrivia(id: any) {
    this.router.navigateByUrl(`/main/info-trivia/${id}`);
  }

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
