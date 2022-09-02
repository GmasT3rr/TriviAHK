import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public x:number
  public y:number
  public quizes:any[] = []

  constructor(private authService: AuthService, private http: HttpClient) {
    this.x = 0
    this.y = 4
    this.quizes =[{
      "id": "1",
      "title": "Cuestionario numero 1",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "80%"
   },
   {
      "id": "2",
      "title": "Cuestionario numero 2",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "80%"
   },
   {
      "id": "3",
      "title": "Cuestionario numero 3",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "80%"
   },
   {
      "id": "4",
      "title": "Cuestionario numero 4",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "80%"
   },
   {
    "id": "5",
    "title": "Cuestionario numero 5",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "participantes": "25",
    "ratio": "80%"
   },
   {
    "id": "6",
    "title": "Cuestionario numero 6",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "participantes": "25",
    "ratio": "80%"
   },
   {
    "id": "7",
    "title": "Cuestionario numero 7",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "participantes": "25",
    "ratio": "80%"
   },
   {
    "id": "8",
    "title": "Cuestionario numero 8",
    "description": "Esta es una bree descripcion del ceustionario",
    "preguntas": "10",
    "participantes": "25",
    "ratio": "80%"
   },
   {
      "id": "9",
      "title": "Cuestionario numero 9",
      "description": "Esta es una bree descripcion del ceustionario",
      "preguntas": "10",
      "participantes": "25",
      "ratio": "80%"
   }]
  }


 ngOnInit(): void {
  //Metodo para obtener info del login
  this.authService.idTokenClaims$.subscribe((claims) => console.log(claims));
  //TODO
  /*
  Access to XMLHttpRequest at 'http://localhost:3000/trivias' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  */
  this.http.get(`${env.dev.serverUrl}/trivias`).subscribe(result => console.log('api ',result));
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
}
