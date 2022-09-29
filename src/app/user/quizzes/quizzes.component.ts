import { Component, OnInit } from '@angular/core';
import { PartidasService } from 'app/services/partidas.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  public offset: number;
  public limit: number;
  public quizes: any[] = [];
  constructor(
    private userService: UserService,
    private partidaService: PartidasService
  ) {
    this.offset = 0;
    this.limit = 4;
  }

  ngOnInit(): void {
    this.getQuizes();
    this.getUserInfo();
  }

  getQuizes() {
    this.partidaService.getQuizzes().subscribe((data: any) => {
      this.quizes = data;
    });
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

  //Obtener informacion del usuario
  public user: any;
  private getUserInfo() {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    });
  }

  get sortMostRecently() {
    return this.quizes.sort((a, b) => {
      return <any>new Date(b.CREATE_TS) - <any>new Date(a.CREATE_TS);
    });
  }
  get sortLeastRecently() {
    return this.quizes.sort((a, b) => {
      return <any>new Date(a.CREATE_TS) - <any>new Date(b.CREATE_TS);
    });
  }

  get sortMoreAnswered() {
    return this.quizes.sort((a, b) => {
      if (a.ratio < b.ratio) return 1;
      else if (a.ratio > b.ratio) return -1;
      else return 0;
    });
  }
}
