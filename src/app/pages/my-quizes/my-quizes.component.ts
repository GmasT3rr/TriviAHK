import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SocketService } from 'app/socket/socket.service';
import { PartidasService } from 'app/services/partidas.service';
import { environment as env } from '../../../environments/environment';
import { TriviasService } from 'app/services/trivias.service';
import { Trivia } from 'app/interfaces/Trivias.interface';
@Component({
  selector: 'app-my-quizes',
  templateUrl: './my-quizes.component.html',
  styleUrls: ['./my-quizes.component.css']
})
export class MyQuizesComponent implements OnInit {
  public offset: number;
  public limit: number;
  public quizes: any[] = [];

  partidas: any;
  public trivias!: Trivia[];
  usuarioID: number = 0;
  public trivia: any;

  constructor(
    public socketService: SocketService,
    private triviasService: TriviasService
  ) {
    this.offset = 0;
    this.limit = 4;
  }

  ngOnInit(): void {
;
    this.triviasService.getUserTrivias().subscribe((res: any) => {
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

}
