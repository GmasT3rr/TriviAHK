import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      case 2:
        return {
          "background-color": "#FFEB33"
        };
      case 3:
        return {
          "background-color": "#69E2FF"
        };
      default:
        return {
          "background-color": "#FFFFFF"
        };      }
}


}
