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

  public uniqueId!: number;
  public parentRef!: CrearQuizComponent;

  constructor() {
    this.quizesForm = this.createQuizesForm();
  }

  ngOnInit(): void {
    this.quizesForm.get('id')?.setValue(this.uniqueId);
  }

  getValores() {
    return this.quizesForm.value;
  }

  eliminarComponente() {
    console.log('ID a eliminar', this.uniqueId);
    this.parentRef.removeComponent(this.uniqueId);
  }

  createQuizesForm() {
    return new FormGroup({
      descripcion: new FormControl(''),
      orden: new FormControl(''),
      tiempo: new FormControl(''),
      puntos: new FormControl(''),
      id: new FormControl('')
    });
  }
}
