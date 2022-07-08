import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  partidas: any;


  constructor() { }

  ngOnInit(): void {
    this.cargarEjemplo();
  }

  private cargarEjemplo(){
    this.partidas = [];
    this.partidas.push({id: "1", cantSesiones: "15", cantPreguntas: "10", promedioAciertos: "78"});
    this.partidas.push({id: "2", cantSesiones: "17", cantPreguntas: "5", promedioAciertos: "90"});
    this.partidas.push({id: "3", cantSesiones: "10", cantPreguntas: "15", promedioAciertos: "12"});
  }

}
