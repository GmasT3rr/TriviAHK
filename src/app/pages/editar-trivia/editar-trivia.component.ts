import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { TriviasService } from 'app/services/trivias.service';

@Component({
  selector: 'app-editar-trivia',
  templateUrl: './editar-trivia.component.html',
  styleUrls: ['./editar-trivia.component.css']
})
export class EditarTriviaComponent implements OnInit {

  private idTrivia:any
  public triviaForm!: FormGroup;
  public trivia!: any;
  public editarTriviaForm!:FormGroup;
  public mostrarPreguntas = false



  tipoDePregunta = ['VOTACION', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE'];
  esCorrecta = ['true', 'false'];

  constructor(
    private activatedRoute:ActivatedRoute,
    private triviasService:TriviasService,
    private _triviasService: TriviasService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getTriviaId();
    this.createTriviaForm();
    this.createEditarTriviaForm()
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

  // Formulario para EDITAR la trivia con preguntas y opciones
  createEditarTriviaForm(){
    this.editarTriviaForm = this.fb.group({
      nombreEditar: [, [Validators.required]],
      descripcionEditar: [, [Validators.required]],
      preguntasEditar: this.fb.array([])
    });
  }
  preguntasEditar(): FormArray {
    return this.editarTriviaForm.get('preguntasEditar') as FormArray;
  }

  newPreguntaEditar(): FormGroup {
    return this.fb.group({
      leyendaEditar: ['', [Validators.required]],
      tipoDePreguntaEditar: ['', [Validators.required]],
      opcionesEditar: this.fb.array([])
    });
  }

  opcionesEditar(indexPreg: number): FormArray {
    return this.preguntasEditar().at(indexPreg).get('opcionesEditar') as FormArray;
  }

  newOpcionEditar(): FormGroup {
    return this.fb.group({
      descripcionEditar: [, [Validators.required]],
      esCorrectaEditar: [, [Validators.required]]
    });
  }

 // Metodos para manipular las preg y opciones dentro del fromulario dinamico

 verPreguntasEditar() {
  for(let i=0; i<this.trivia._preguntas.length; i++){
    this.preguntasEditar().push(this.newPreguntaEditar());
    console.log(i)
  }
  this.mostrarPreguntas = true

}

ocultarPreguntasEditar() {
    this.preguntasEditar().clear();
    this.mostrarPreguntas = false

  }
agregarOpcionEditar(indexPreg: number) {
  this.opciones(indexPreg).push(this.newOpcion());
  // console.log(this.opciones(indexPreg));
}

eliminarOpcionEditar(indexPreg: number, indexOpc: number) {
  this.opciones(indexPreg).removeAt(indexOpc);
}



  // Formulario para CREAR nueva trivia con preguntas y opciones
  createTriviaForm(){
    this.triviaForm = this.fb.group({
      nombre: [, [Validators.required]],
      descripcion: [, [Validators.required]],
      preguntas: this.fb.array([])
    });
  }

  preguntas(): FormArray {
    return this.triviaForm.get('preguntas') as FormArray;
  }

  newPregunta(): FormGroup {
    return this.fb.group({
      leyenda: ['', [Validators.required]],
      tipoDePregunta: ['', [Validators.required]],
      opciones: this.fb.array([])
    });
  }

  opciones(indexPreg: number): FormArray {
    return this.preguntas().at(indexPreg).get('opciones') as FormArray;
  }

  newOpcion(): FormGroup {
    return this.fb.group({
      descripcion: [, [Validators.required]],
      esCorrecta: [, [Validators.required]]
    });
  }


  // Metodos para manipular las preg y opciones dentro del fromulario dinamico

  agregarPregunta() {
    this.preguntas().push(this.newPregunta());
  }

  eliminarPregunta(indexPreg: number) {
    this.preguntas().removeAt(indexPreg);
  }
  agregarOpcion(indexPreg: number) {
    this.opciones(indexPreg).push(this.newOpcion());
    // console.log(this.opciones(indexPreg));
  }

  eliminarOpcion(indexPreg: number, indexOpc: number) {
    this.opciones(indexPreg).removeAt(indexOpc);
  }



  editarTrivia() {
    // this._triviasService
    //   .crearTriviaConPreguntasOpciones(this.triviaForm.value)
    //   .subscribe(console.log);
    console.log(this.editarTriviaForm.value)
  }
}
