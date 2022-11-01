import { Component, OnInit } from '@angular/core';
import { GetIdServiceService } from '../../services/get-id-service.service';

@Component({
  selector: 'app-quiz-finished',
  templateUrl: './quiz-finished.component.html',
  styleUrls: ['./quiz-finished.component.css']
})
export class QuizFinishedComponent implements OnInit {
  public points: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getPoints();
    console.log('finished cmp');
  }

  getPoints() {}
}
