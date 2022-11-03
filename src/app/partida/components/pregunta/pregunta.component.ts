import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  constructor() {}
  @Input('pregunta') leyendaPregunta!: string;

  ngOnInit(): void {}
}
