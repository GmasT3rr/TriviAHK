import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { flipAnimation } from 'app/shared/animations/flip.component';
import { Trivia } from 'app/trivias/interfaces/Trivias.interface';
import { SocketService } from 'app/core/socket/socket.service';
import { TriviasService } from 'app/trivias/services/trivias.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mis-trivias',
  templateUrl: './mis-trivias.component.html',
  styleUrls: ['./mis-trivias.component.css'],
  animations: [onLoadAnimation, flipAnimation]
})
export class MisTriviasComponent implements OnInit {
  public offset: number;
  public limit: number;
  public quizes: any[] = [];
  public trivias!: Trivia[];
  public rotateOrdenar = 'inactive';
  public filtrarPor: string = '';

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  usuarioID: number = 0;
  partidas: any;
  modalPorAbrir!: string;
  idTriviaModal!: number;

  constructor(
    public _socketService: SocketService,
    private _triviasService: TriviasService,
    private router: Router
  ) {
    this.offset = 0;
    this.limit = 4;
  }

  ngOnInit() {
    this.getTrivias();
  }

  async getTrivias() {
    (await this._triviasService.getTriviasDelUsuario()).subscribe(
      (res: any) => {
        switch (this.filtrarPor) {
          case '':
            this.trivias = res.body;
            break;
          case 'recientes':
            this.trivias = res.body.sort(
              (a: Trivia, b: Trivia) =>
                new Date(b._fechaCreacion).getTime() -
                new Date(a._fechaCreacion).getTime()
            );
            break;
          case 'antiguas':
            this.trivias = res.body.sort(
              (a: Trivia, b: Trivia) =>
                new Date(b._fechaCreacion).getTime() +
                new Date(a._fechaCreacion).getTime()
            );
            break;
          default:
            break;
        }
      }
    );
  }

  toggleFlip() {
    this.rotateOrdenar =
      this.rotateOrdenar == 'inactive' ? 'active' : 'inactive';
    console.log(this.rotateOrdenar);
  }

  aplicarFiltro(filtro: string) {
    this.filtrarPor = filtro;
    this.trivias = [];
    this.getTrivias();
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
  asignarIdTriviaParaModal(idTrivia: number) {
    this.idTriviaModal = idTrivia;
    this.modalPorAbrir = 'iniciarPartida';
  }
}
