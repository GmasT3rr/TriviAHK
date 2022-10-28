import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'app/socket/socket.service';
import { PartidasService } from 'app/services/partidas.service';
import { TriviasService } from 'app/services/trivias.service';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { Router } from '@angular/router';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';

@Component({
  selector: 'app-mis-trivias',
  templateUrl: './mis-trivias.component.html',
  styleUrls: ['./mis-trivias.component.css'],
  animations:[
    onLoadAnimation
  ]
})
export class MisTriviasComponent implements OnInit {
  public offset: number;
  public limit: number;
  public quizes: any[] = [];

  public trivias!: Trivia[];

  usuarioID: number = 0;
  partidas: any;
  modalPorAbrir!: string;

  constructor(
    public socketService: SocketService,
    private triviasService: TriviasService,
    private _partidas: PartidasService,
    private router: Router
  ) {
    this.offset = 0;
    this.limit = 4;
  }

   ngOnInit() {
    this.getTrivias()
  }

  public filtrarPor:string = "antiguas"


  async getTrivias(){
    (await this.triviasService.getTriviasDelUsuario()).subscribe((res: any) => {
      switch (this.filtrarPor) {
        case "":
          this.trivias = res.body
          break;
        case "recientes":
          this.trivias  = res.body.sort((a:Trivia,b:Trivia)=>
            new Date(b._fechaCreacion).getTime() - new Date(a._fechaCreacion).getTime()
          )
        break;
        case "antiguas":
          this.trivias  = res.body.sort((a:Trivia,b:Trivia)=>
            new Date(b._fechaCreacion).getTime() + new Date(a._fechaCreacion).getTime()
          )
        break


        default:
          break;
      }
    });
  }

  aplicarFiltro(filtro:string){
    this.filtrarPor = filtro
    this.trivias = []
    this.getTrivias()
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

  irEditarTrivia(id: any) {
    this.router.navigateByUrl(`/main/editar-trivia/${id}`);
  }
  irVerTrivia(id: any) {
    this.router.navigateByUrl(`/main/info-trivia/${id}`);
  }
}
