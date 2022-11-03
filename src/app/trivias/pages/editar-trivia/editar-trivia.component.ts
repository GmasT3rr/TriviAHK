import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'app/core/services/toast.service';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { TriviasService } from 'app/trivias/services/trivias.service';

@Component({
  selector: 'app-editar-trivia',
  templateUrl: './editar-trivia.component.html',
  styleUrls: ['./editar-trivia.component.css'],
  animations: [onLoadAnimation]
})
export class EditarTriviaComponent implements OnInit {
  private idTrivia: any;
  public trivia!: any;
  public triviaForm!: FormGroup;
  public mostrarPreguntas = false;

  tipoDePregunta = ['VOTACION', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _triviasService: TriviasService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTriviaId();
    this.createEditarTriviaForm();
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
        this.setInfoDeTrivia();
        // this.setOpcionesDeLasPreguntas()
        console.log('Esta trivia', this.trivia);
      }
    );
  }

  // Formulario para EDITAR la trivia con preguntas y opciones
  createEditarTriviaForm() {
    this.triviaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      preguntas: this.fb.array([])
    });
  }
  setInfoDeTrivia() {
    this.triviaForm.patchValue({
      nombre: this.trivia._nombre,
      descripcion: this.trivia._descripcion
    });
    this.trivia._preguntas.forEach((e: any, index: any) => {
      this.preguntas().push(
        this.preguntasDeLaTrivia(e._leyenda, e.tipoDePregunta, false)
      );
      // console.log(index)
      const arrayOpciones = e._opciones;
      arrayOpciones.forEach((opc: any) => {
        this.opciones(index).push(
          this.opcionesDeLaTrivia(opc._descripcion, opc._esCorrecta)
        );
      });
    });
  }

  preguntasDeLaTrivia(
    leyenda: string,
    tipo: string,
    visible: boolean
  ): FormGroup {
    return this.fb.group({
      leyenda: [leyenda, [Validators.required]],
      tipoDePregunta: [tipo, [Validators.required]],
      // visible: [visible],
      opciones: this.fb.array([])
    });
  }
  opcionesDeLaTrivia(descripcion: string, esCorrecta: string): FormGroup {
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

  // cambiarVisibilidad(pregunta:any){
  //   pregunta.value.visible = !pregunta.value.visible;
  // }

  async editarTrivia() {
    (
      await this._triviasService.actualizarTrivia(
        this.triviaForm.value,
        this.idTrivia
      )
    ).subscribe({
      next: () => {
        const title = 'Trivia editada con exito';
        const msg = 'Puede verla en su perfil';
        this.toastService.showSuccess(msg, title);
        this.router.navigateByUrl('main/mis-trivias');
      },
      error: (err: any) => {
        let arrayErrores: any[] = [];
        let errorToast: any = '';
        if (err.body.errors) {
          err.body.errors.forEach((e: any) => {
            arrayErrores.push(e.msg);
          });
          errorToast = arrayErrores.join(' y ');
        } else {
          errorToast = err.body;
        }
        if (err.body.code) {
          switch (err.body.code) {
            case 'ER_WARN_DATA_TRUNCATED':
              errorToast = 'Debe completar todos los datos';
              break;
            default:
              break;
          }
          // errorToast = err.body.code
        }
        this.toastService.showError(errorToast, 'Error');
        console.log('err en toasterror ->', errorToast);
      }
    });
  }
}
