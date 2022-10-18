import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SocketService } from 'app/socket/socket.service';
import { PartidasService } from 'app/services/partidas.service';
import { environment as env } from '../../../environments/environment';
import { TriviasService } from 'app/services/trivias.service';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { ModalMisTriviasComponent } from 'app/shared/components/modal-mis-trivias/modal-mis-trivias.component';
@Component({
  selector: 'app-mis-trivias',
  templateUrl: './mis-trivias.component.html',
  styleUrls: ['./mis-trivias.component.css']
})
export class MisTriviasComponent implements OnInit {
  public offset: number;
  public limit: number;
  public quizes: any[] = [];

  partidas: any;
  public trivias!: Trivia[];
  usuarioID: number = 0;
  public trivia: any;

  modalPorAbrir!: string;

  constructor(
    public socketService: SocketService,
    private triviasService: TriviasService,
    private _partidas: PartidasService
  ) {
    this.offset = 0;
    this.limit = 4;
  }

  ngOnInit(): void {
    this.triviasService.getTriviasDelUsuario().subscribe((res: any) => {
      this.trivias = res.body;
    });
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

  //Metodo para cambiar el input que le pasamos al modal
  //referente si es el modal para editar o jugar la trivia
  openModalMisTrivias(modalPorAbrir: string) {
    if (modalPorAbrir == 'editar') return this.modalPorAbrir = 'editar';
    return this.modalPorAbrir = 'jugar';
  }
}
