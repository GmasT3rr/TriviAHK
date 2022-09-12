import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrearQuizComponent } from '../crear-quiz/crear-quiz.component';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {
  quizesForm: FormGroup;

  public unique_key!: number;
  public parentRef!: CrearQuizComponent;

  constructor() {
    this.quizesForm = this.createQuizesForm();
  }

  ngOnInit(): void {}

  getValores() {
    return this.quizesForm.value;
  }

  eliminarComponente() {
    console.log(this.unique_key);
    this.parentRef.remove(this.unique_key);
  }

  createQuizesForm() {
    return new FormGroup({
      descripcion: new FormControl(''),
      orden: new FormControl(''),
      tiempo: new FormControl(''),
      puntos: new FormControl('')
    });
  }
}
