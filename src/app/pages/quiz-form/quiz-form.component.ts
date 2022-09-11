import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {
  @Output() preguntaForm = new EventEmitter<any>();

  quizesForm: FormGroup;

  constructor() {
    this.quizesForm = this.createQuizesForm();
  }

  ngOnInit(): void {
    // this.quizesForm.valueChanges.subscribe(() =>
    //   this.preguntaForm.emit(this.quizesForm.value)
    // );
  }

  sendPreguntaForm() {
    this.preguntaForm.emit(this.quizesForm.value);
    console.log('DATOS ENVIADOS "CHILD(QUIZ-FORM)"', this.quizesForm.value);
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
