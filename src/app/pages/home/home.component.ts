import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { PartidasService } from 'src/app/services/partidas.service';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public offset:number
  public limit:number
  public quizes:any[] = []

  constructor(private authService: AuthService, private http: HttpClient, private partidaService:PartidasService) {
    this.offset = 0
    this.limit = 4
  }




  // Crear un servicio el cual va a tener la responsabilidad de llamar a nuestro back (partidas.service)
  // Inyectar en partida.service el objeto http
  // Creamos los metodos para poder llamar al los endpoints del back
  // Inyectar este servicio en este componente (home.commponent)
  // En el ngOnInit deberiamos llamar al servicio y traernos todas las partidas
  // En la maqueta deberiamos mostrar todas las partidas obtenidas desde el back


// private getPartidas(){
//     this.partidaService.getPartidas().subscribe((partidas:any)=>
//     {this.quizes = partidas}
//     )
//   }

 ngOnInit(): void {
  this.partidaService.getQuizzes().subscribe((quizes:any)=>{
    this.quizes = quizes
  })

  // this.getPartidas()


  //Metodo para obtener info del login
  // this.authService.idTokenClaims$.subscribe((claims) => console.log(claims));
  //TODO
  /*
  Access to XMLHttpRequest at 'http://localhost:3000/trivias' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  */
   this.http.get(`${env.dev.serverUrl}/trivias`).subscribe(result => console.log('api ',result));
 }


 nextQuiz(){
   if(this.offset >= this.quizes.length-4){
      null;
   }else{
     this.offset +=4;
     this.limit +=4;
   }
 }
 prevQuiz(){
   if(this.offset <=0){
  }else{
   this.offset -=4;
   this.limit -=4;
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
