import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-trivia',
  templateUrl: './tarjeta-trivia.component.html',
  styleUrls: ['./tarjeta-trivia.component.css']
})
export class TarjetaTriviaComponent implements OnInit {

  color: any;
  @Input() partida: any;

  constructor() { }

  ngOnInit(): void {
    this.cargarEjemplo();
  }

  private cargarEjemplo(){
    //this.partida = {id: "1", cantSesiones: "15", cantPreguntas: "10", promedioAciertos: "78"};
    this.color = "amarillo";
  }

}
