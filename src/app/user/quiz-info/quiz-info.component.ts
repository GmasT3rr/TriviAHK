import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasService } from 'src/app/services/partidas.service';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.css']
})
export class QuizInfoComponent implements OnInit {
  currentID: any;
  quizz: any;
  preguntas: any[] = [];
  vinculadas: any[] = [];
  quizes: [] = [];

  constructor(
    private rt: ActivatedRoute,
    private partidaService: PartidasService
  ) {}

  ngOnInit(): void {
    this.getIdQuiz();
    this.getQuiz(this.currentID);
    this.getPreguntas(this.currentID);
    this.getQuizzesVinculadas(this.currentID);
  }

  getIdQuiz() {
    const id = this.rt.snapshot.paramMap.get('id');
    console.log(id);
    this.currentID = id;
  }

  async getQuiz(id: any) {
    (await this.partidaService.getOneQuiz(id)).subscribe((quiz: any) => {
      this.quizz = quiz;
      // console.log('QUIZZ INFO', this.quizz);
    });
  }

  async getPreguntas(id: any) {
    (await this.partidaService.getOneQuiz(id)).subscribe((quiz: any) => {
      quiz.preguntas.forEach((pregunta: any) => {
        this.preguntas.push(pregunta);
        // console.log('FOR EACH de QUIZZ.PREGUNTAS', pregunta);
      });
    });
  }

  async getQuizzesVinculadas(id: any) {
    (await this.partidaService.getOneQuiz(id)).subscribe((quiz: any) => {
      quiz.vinculadas.forEach(async (quiz: any) => {
        (await this.partidaService.getOneQuiz(quiz.id)).subscribe(
          (quizVinculada: any) => {
            this.vinculadas.push(quizVinculada);
          }
        );
      });
    });
  }
}
