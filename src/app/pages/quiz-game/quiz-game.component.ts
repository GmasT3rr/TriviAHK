import { Component, OnInit } from '@angular/core';
import { PartidasService } from 'src/app/services/partidas.service';
import { GetIdServiceService } from '../../services/get-id-service.service';

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
    this.startTimer();
    this.getQuizId();
    this.searchQuizById();
    // this.getQuizes();
  }

  getQuizId() {
    this.idService.shareId.subscribe((data: any) => {
      this.quizId = data;
      console.log('Id to search quiz', this.quizId);
    });
  }

  async searchQuizById() {
    (await this.partidaService.getOneQuiz('1')).subscribe(data => {
      this.currentQuiz = data;
      console.log('Current Quiz', this.currentQuiz);
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
  startTimer() {
    this.partidaService.counter = 0;
    this.tiempo = this.partidaService;
    this.partidaService.timer = setInterval(() => {
      this.partidaService.counter++;
    }, 1000);
  }
}
