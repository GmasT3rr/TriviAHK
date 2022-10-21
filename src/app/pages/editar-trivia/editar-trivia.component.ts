import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { ToastService } from 'app/services/toast.service';
import { TriviasService } from 'app/services/trivias.service';

@Component({
  selector: 'app-editar-trivia',
  templateUrl: './editar-trivia.component.html',
  styleUrls: ['./editar-trivia.component.css']
})
export class EditarTriviaComponent implements OnInit {

  private idTrivia:any
  public trivia!: any;
  public triviaForm!:FormGroup;
  public mostrarPreguntas = false



  tipoDePregunta = ['VOTACION', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE'];
  esCorrecta = ['true', 'false'];

  constructor(
    private activatedRoute:ActivatedRoute,
    private triviasService:TriviasService,
    private _triviasService: TriviasService,
    private fb: FormBuilder,
    private toastService:ToastService
  ) {

  }

  ngOnInit(): void {
    this.getTriviaId();
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
      this.setInfoDeTrivia()
      // this.setOpcionesDeLasPreguntas()
      console.log('Esta trivia',this.trivia)

    });
  }

  // Formulario para EDITAR la trivia con preguntas y opciones
  createEditarTriviaForm(){
    this.triviaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      preguntas: this.fb.array([])
    });
  }
  setInfoDeTrivia(){
    this.triviaForm.patchValue({
      nombre:this.trivia._nombre,
      descripcion:this.trivia._descripcion
    })
    this.trivia._preguntas.forEach((e:any,index:any) => {
      this.preguntas().push(this.preguntasDeLaTrivia(e._leyenda,e.tipoDePregunta,false));
      // console.log(index)
      const arrayOpciones = e._opciones
      arrayOpciones.forEach((opc:any) => {
        this.opciones(index).push(this.opcionesDeLaTrivia(opc._descripcion,opc._esCorrecta));
      });
    });
    console.log(this.preguntas().getRawValue())
  }

  preguntasDeLaTrivia(leyenda:string,tipo:string,visible:boolean): FormGroup {
      return this.fb.group({
        leyenda: [leyenda, [Validators.required]],
        tipoDePregunta: [tipo, [Validators.required]],
        visible: [visible],
        opciones: this.fb.array([])
      });
  }
  opcionesDeLaTrivia(descripcion:string,esCorrecta:string): FormGroup {
    return this.fb.group({
      descripcion: [descripcion, [Validators.required]],
      esCorrecta: [esCorrecta, [Validators.required]]
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




  agregarPregunta() {
    this.preguntas().push(this.newPregunta());
    console.log(this.preguntas().getRawValue())

  }

  eliminarPregunta(indexPreg: number) {
    this.preguntas().removeAt(indexPreg);
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

  agregarOpcion(indexPreg: number) {
    this.opciones(indexPreg).push(this.newOpcion());
    // console.log(this.opciones(indexPreg));
  }

  eliminarOpcion(indexPreg: number, indexOpc: number) {
    this.opciones(indexPreg).removeAt(indexOpc);
  }


  cambiarVisibilidad(pregunta:any){
    pregunta.value.visible = !pregunta.value.visible;
  }

  editarTrivia() {
    // this._triviasService
    //   .crearTriviaConPreguntasOpciones(this.triviaForm.value)
    //   .subscribe(console.log);
    console.log(this.triviaForm.value)
    this.toastService.showSuccess('','Trivia creada con exito')
  }
}
