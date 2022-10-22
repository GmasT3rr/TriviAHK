import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SocketService } from 'app/socket/socket.service';
import { PartidasService } from 'app/services/partidas.service';
import { environment as env } from '../../../environments/environment';
import { TriviasService } from 'app/services/trivias.service';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { ModalMisTriviasComponent } from 'app/shared/components/modal-mis-trivias/modal-mis-trivias.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-trivias',
  templateUrl: './mis-trivias.component.html',
  styleUrls: ['./mis-trivias.component.css']
})
export class MisTriviasComponent implements OnInit {
  public offset: number;
  public limit: number;
  public quizes: any[] = [];

  public trivias!: Trivia[];
  public trivia: any;

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

  async ngOnInit() {
    (await this.triviasService.getTriviasDelUsuario()).subscribe((res: any) => {
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

  irEditarTrivia(id: any) {
    this.router.navigateByUrl(`/main/editar-trivia/${id}`);
  }
}
