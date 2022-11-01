import { Component, OnInit } from '@angular/core';
import { GetIdServiceService } from '../../services/get-id-service.service';
import { PartidasService } from '../services/partidas.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css']
})
export class QuizGameComponent implements OnInit {
  public quizId!: string;
  public currentQuiz: any;
  public paginationId: number = 0;
  public tiempo: any;
  private arrayPoints: any[] = [];
  public viewResult: boolean = false;
  private points: number = 0;

  constructor(
    private partidaService: PartidasService,
    private idService: GetIdServiceService
  ) {}

  ngOnInit(): void {
    this.getQuizId();
  }

  getQuizId() {
    this.idService.shareId.subscribe((data: any) => {
      this.quizId = data;
      console.log('Id to search quiz', this.quizId);
    });
  }

  // getQuizes() {
  //     let quizArray: any[] = [];
  //     this.partidaService.getQuizzes().subscribe((quizes: any) => {
  //       quizes.forEach((quiz: any) => {
  //         quizArray.push(quiz);
  //       });
  //       this.currentQuiz = quizArray.find(x => x.id === this.quizId);
  //       console.log('Este quiz', this.currentQuiz);
  //     });
  // }
  nextQuestion() {
    if (this.paginationId >= this.currentQuiz.preguntas.length - 1)
      this.viewResult = true;
    else this.paginationId++;
  }
  prevQuestion() {
    if (this.paginationId <= 0) return;
    else this.paginationId--;
  }

  checkAnswer(isCorrect: boolean, points: number, indice: number) {
    // console.log({ isCorrect, indice, points });
    this.arrayPoints.push(points);
    // console.log(this.arrayPoints);
    this.points = this.arrayPoints
      .map(x => x)
      .reduce((prev, curr) => prev + +curr, 0);
    // console.log(this.points);
  }

  viewResults() {
    this.viewResult = true;
  }
}
