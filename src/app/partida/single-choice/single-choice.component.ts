import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.css']
})
export class SingleChoiceComponent implements OnInit {

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
        default:
          return {
            "background-color": "#FFFFFF"
          };      }
  }
}
