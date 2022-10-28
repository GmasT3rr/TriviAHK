import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { ToastService } from 'app/services/toast.service';
import { TriviasService } from 'app/services/trivias.service';

@Component({
  selector: 'app-info-trivia',
  templateUrl: './info-trivia.component.html',
  styleUrls: ['./info-trivia.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateX(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ]),
    trigger("showOpciones", [
      transition(":enter", [
          style({opacity: 0 }),
          animate(
              "500ms",
              style({
                  opacity: 1
              })
          ),
      ]),
      transition(":leave", [
          style({opacity: 1 }),
          animate(
              "500ms",
              style({
                  opacity: 0
              })
          ),
      ]),
  ]),
  ]
})
export class InfoTriviaComponent implements OnInit {

  public idTrivia:any
  public trivia!: any;
  public preguntas:any =[]
  public triviaForm!:FormGroup;
  public mostrarPreguntas = false

  toggleFlip(pregunta:any) {
    pregunta.flip = (pregunta.flip== 'inactive') ? 'active' : 'inactive';
  }




  tipoDePregunta = ['VOTACION', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE'];

  constructor(
    private activatedRoute:ActivatedRoute,
    private triviasService:TriviasService,
    private _triviasService: TriviasService,
    private fb: FormBuilder,
    private toastService:ToastService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.getTriviaId();
  }

  async getTriviaId(){
    this.activatedRoute.params.subscribe((params:any) => {
      this.idTrivia = params.id
    })
    ;(await this.triviasService.getTriviasDelUsuario()).subscribe((res: any) => {
      const trivias:any[] = res.body;
      const unaTrivia =  trivias.filter((x:any)=> x.id === +this.idTrivia)
      unaTrivia.forEach(element => {
        this.trivia = element
      });
      this.trivia._preguntas.forEach((element:any) => {
        this.preguntas.push({...element,flip:"inactive"})

      });
      console.log(this.preguntas)

      console.log('Esta trivia',this.trivia)
    });
  }

}
