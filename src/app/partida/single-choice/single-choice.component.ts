import { Component, OnInit } from '@angular/core';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { SocketService } from 'app/socket/socket.service';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.css'],
  animations:[
    onLoadAnimation
  ]
})
export class SingleChoiceComponent implements OnInit {

  constructor(private _socketsService: SocketService) { }

  ngOnInit(): void {
    this._socketsService.pregunta.subscribe(pregunta => {
      console.log('componente ', pregunta);
    })
  }

  getColor(indice:any){
      switch (indice) {
        case 0:
          return {
            "background-color": "#FF5C95"
          };
        case 1:
          return {
            "background-color": "#50FFB5"
          };
        default:
          return {
            "background-color": "#FFFFFF"
          };      }
  }

  mostrarSiguientePreg() {
    this._socketsService.mostrarSiguientePregunta();
  }
}
