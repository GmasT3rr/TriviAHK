import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  public x:number 
  public y:number 
  public quizes:any[] = []
  constructor(private userService:UserService) { 
    this.x = 0;
    this.y = 4;
    this.quizes =   [{
      "id": "1",
      "title": "Cuestionario numero 1",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "22%",
      CREATE_TS: "2018-08-15 17:17:30.0",
  },
  {
      "id": "2",
      "title": "Cuestionario numero 2",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "37%"
  },
  {
      "id": "3",
      "title": "Cuestionario numero 3",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "40%",
      CREATE_TS: "2018-08-15 17:17:30.1",

  },
  {
      "id": "4",
      "title": "Cuestionario numero 4",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "15%",
      CREATE_TS: "2018-08-15 17:17:30.2",

  },
  {
    "id": "5",
    "title": "Cuestionario numero 5",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "participantes": "25",
    "ratio": "80%",
    CREATE_TS: "2018-08-15 17:17:30.3",

  },
  {
    "id": "6",
    "title": "Cuestionario numero 6",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "participantes": "25",
    "ratio": "66%",
    CREATE_TS: "2018-08-15 17:17:30.5",

  },
  {
    "id": "7",
    "title": "Cuestionario numero 7",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "participantes": "25",
    "ratio": "59%",
    CREATE_TS: "2018-08-15 17:17:30.6",

  },
  {
    "id": "8",
    "title": "Cuestionario numero 8",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "participantes": "25",
    "ratio": "75%",
    CREATE_TS: "2018-08-15 17:17:31.0",

  },
  {
      "id": "9",
      "title": "Cuestionario numero 9",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "99%",
      CREATE_TS: "2018-08-15 17:17:35.0",

  }]
  }

  ngOnInit(): void {
    this.getUserInfo()

  }


nextQuiz(){
  if(this.x >= this.quizes.length-4){
     null;
  }else{
    this.x +=4;
    this.y +=4;
    
  }
}
prevQuiz(){
  if(this.x <=0){
 }else{
  this.x -=4;
  this.y -=4;
 }
}

public getColor(index :number) : string {
  switch( index) { 
    case 0 : return "#1A0537"
    case 1 : return "#A36CD9"
    case 2 : return "#FF3078"
    case 3 : return "#671073"
    default: return "#abc"
  }
}

//Obtener informacion del usuario
public user:any
private getUserInfo(){
  this.userService.getUserInfo().subscribe((data) => {
  this.user = data
})
}

 get sortMostRecently() {
   return this.quizes.sort((a, b) => {
     return <any>new Date(b.CREATE_TS) - <any>new Date(a.CREATE_TS);
   });
 }
 get sortLeastRecently() {
   return this.quizes.sort((a, b) => {
     return  <any>new Date(a.CREATE_TS) - <any>new Date(b.CREATE_TS) ;
   });
 }

 get sortMoreAnswered() {
  return this.quizes.sort((a, b) => {
    if(a.ratio < b.ratio) return 1;
    else if (a.ratio > b.ratio) return -1
    else return 0

  });
}


}
