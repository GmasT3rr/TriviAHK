import { Component, Input, OnInit } from '@angular/core';
import { Pregunta } from 'app/trivias/interfaces/Trivias.interface';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  constructor() {}

  @Input('pregunta') preguntaActual!: Pregunta;

  ngOnInit(): void {
    // console.log(typeof this.preguntaActual.tipoDePregunta);
  }

  getColor(indice: any) {
    switch (indice) {
      case 0:
        return {
          'background-color': '#FF5C95'
        };
      case 1:
        return {
          'background-color': '#50FFB5'
        };
      case 2:
        return {
          'background-color': '#FFEB33'
        };
      case 3:
        return {
          'background-color': '#69E2FF'
        };
      default:
        return {
          'background-color': '#FFFFFF'
        };
    }
  }
}
