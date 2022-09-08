import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasService } from '../../services/partidas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-quiz',
  templateUrl: './crear-quiz.component.html',
  styleUrls: ['./crear-quiz.component.css']
})
export class CrearQuizComponent implements OnInit {


  constructor(private rt: ActivatedRoute, private partidaService:PartidasService) { 
    this.quizesForm = this.createQuizesForm()
  }

  currentID:any
  ngOnInit(): void {
    const path = this.rt.snapshot.pathFromRoot[2].params
    console.log(path);
    this.currentID = path
    console.log(this.currentID.id);

  this.getQuizes()
  }

  public quizes:any[] = []
  getQuizes(){
    this.partidaService.getQuizzes().subscribe((quizes:any)=>{
      this.quizes = quizes
    })
  }

  quizesForm: FormGroup
  createQuizesForm(){
    return new FormGroup({
      descripcion  :new FormControl(''),
      orden  :new FormControl(''),
      tiempo  :new FormControl(''),
      puntos  :new FormControl(''),
    })
  }

    inputDePreguntas:any[]=[1]
    agregarUnaPregunta(){
      this.inputDePreguntas.push(+1)
    }
    eliminarUnaPregunta(){
      this.inputDePreguntas.pop()
    }


    verValorDelForm(){
      console.log("Pregunta actual",this.quizesForm.value);
    }

    public preguntas:any[] = []
    agregarPreguntasAlArray(){
      this.preguntas.push(this.quizesForm.value)
      console.log("Array de preguntas",this.preguntas);

    }
}
