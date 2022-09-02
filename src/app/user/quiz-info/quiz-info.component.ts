import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.css']
})
export class QuizInfoComponent implements OnInit {

  constructor(private rt: ActivatedRoute) { }

  currentID:any
  ngOnInit(): void {
    const path = this.rt.snapshot.pathFromRoot[2].params
    console.log(path);
    this.currentID = path
    console.log(this.currentID.id);
  }
  
  public quizes:any[] = [{
    "id": "1",
    "title": "Cuestionario numero 1",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "preguntasInfo": [
      "Pregunta 1",
      "Pregunta 2",
      "Pregunta 3",
      "Pregunta 4",

    ],
    "participantes": "25",
    "ratio": "80%"
},
{
    "id": "2",
    "title": "Cuestionario numero 2",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "preguntasInfo": [
      "Pregunta 1",
      "Pregunta 2",
      "Pregunta 3",
      "Pregunta 4",

    ],
    "participantes": "25",
    "ratio": "80%"
},
{
    "id": "3",
    "title": "Cuestionario numero 3",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "preguntasInfo": [
      "Pregunta 1",
      "Pregunta 2",
      "Pregunta 3",
      "Pregunta 4",

    ],
    "participantes": "25",
    "ratio": "80%"
},
{
    "id": "4",
    "title": "Cuestionario numero 4",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "preguntasInfo": [
      "Pregunta 1",
      "Pregunta 2",
      "Pregunta 3",
      "Pregunta 4",

    ],
    "participantes": "25",
    "ratio": "80%"
},
{
  "id": "5",
  "title": "Cuestionario numero 5",
  "description": "Esta es una bree descripcion del ceustionario",
  "preguntas": "10",
  "preguntasInfo": [
    "Pregunta 1",
    "Pregunta 2",
    "Pregunta 3",
    "Pregunta 4",

  ],
  "participantes": "25",
  "ratio": "80%"
},
{
  "id": "6",
  "title": "Cuestionario numero 6",
  "description": "Esta es una bree descripcion del ceustionario",
  "preguntas": "10",
  "preguntasInfo": [
    "Pregunta 1",
    "Pregunta 2",
    "Pregunta 3",
    "Pregunta 4",

  ],
  "participantes": "25",
  "ratio": "80%"
},
{
  "id": "7",
  "title": "Cuestionario numero 7",
  "description": "Esta es una bree descripcion del ceustionario",
  "preguntas": "10",
  "preguntasInfo": [
    "Pregunta 1",
    "Pregunta 2",
    "Pregunta 3",
    "Pregunta 4",

  ],
  "participantes": "25",
  "ratio": "80%"
},
{
  "id": "8",
  "title": "Cuestionario numero 8",
  "description": "Esta es una bree descripcion del ceustionario",
  "preguntas": "10",
  "preguntasInfo": [
    "Pregunta 1",
    "Pregunta 2",
    "Pregunta 3",
    "Pregunta 4",

  ],
  "participantes": "25",
  "ratio": "80%"
},
{
    "id": "9",
    "title": "Cuestionario numero 9",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "preguntasInfo": [
      "Pregunta 1",
      "Pregunta 2",
      "Pregunta 3",
      "Pregunta 4",

    ],
    "participantes": "25",
    "ratio": "80%"
}]
}
