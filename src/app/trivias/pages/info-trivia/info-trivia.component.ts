import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { flipAnimation } from 'app/shared/animations/flip.component';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { TriviasService } from 'app/trivias/services/trivias.service';

@Component({
  selector: 'app-info-trivia',
  templateUrl: './info-trivia.component.html',
  styleUrls: ['./info-trivia.component.css'],
  animations: [flipAnimation, onLoadAnimation]
})
export class InfoTriviaComponent implements OnInit {
  public idTrivia: any;
  public trivia!: any;
  public preguntas: any = [];
  public triviaForm!: FormGroup;
  public mostrarPreguntas = false;

  toggleFlip(pregunta: any) {
    pregunta.flip = pregunta.flip == 'inactive' ? 'active' : 'inactive';
  }

  tipoDePregunta = ['VOTACION', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _triviasService: TriviasService
  ) {}

  ngOnInit(): void {
    this.getTriviaId();
  }

  async getTriviaId() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.idTrivia = params.id;
    });
    (await this._triviasService.getTriviasDelUsuario()).subscribe(
      (res: any) => {
        const trivias: any[] = res.body;
        const unaTrivia = trivias.filter((x: any) => x.id === +this.idTrivia);
        unaTrivia.forEach(element => {
          this.trivia = element;
        });
        this.trivia._preguntas.forEach((element: any) => {
          this.preguntas.push({ ...element, flip: 'inactive' });
        });
        console.log(this.preguntas);

        console.log('Esta trivia', this.trivia);
      }
    );
  }
}
