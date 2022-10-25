import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { ToastService } from 'app/services/toast.service';
import { TriviasService } from 'app/services/trivias.service';

@Component({
  selector: 'app-info-trivia',
  templateUrl: './info-trivia.component.html',
  styleUrls: ['./info-trivia.component.css']
})
export class InfoTriviaComponent implements OnInit {

  public idTrivia:any
  public trivia!: any;
  public triviaForm!:FormGroup;
  public mostrarPreguntas = false



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
      console.log('Esta trivia',this.trivia)
    });
  }
}
