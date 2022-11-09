import { Component, Input, OnInit } from '@angular/core';
import { Pregunta } from 'app/trivias/interfaces/Trivias.interface';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  constructor() {}
  @Input('pregunta') pregunta!: Pregunta;

  ngOnInit(): void {}
}
