import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'app/core/services/toast.service';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { TriviasService } from 'app/trivias/services/trivias.service';
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { flipRigthAnimation } from 'app/shared/animations/flipRight.component';
@Component({
  selector: 'app-crear-trivia',
  templateUrl: './crear-trivia.component.html',
  styleUrls: ['./crear-trivia.component.css'],
  animations: [
    onLoadAnimation,
    flipRigthAnimation
  ]
})
export class CrearTriviaComponent implements OnInit {

  constructor(
    private toastService: ToastService,
    private fb: FormBuilder,
    private router: Router,
    private _triviasService: TriviasService
  ) {}
  faClipboardQuestion=faClipboardQuestion
   tipoDePregunta = ['VOTACION', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE'];
  //tipoDePregunta = ['Votación', 'Multiple choice', 'Single choice'];


  triviaForm!: FormGroup;



  ngOnInit(): void {
    this.triviaForm = this.fb.group({
      nombre: [, [Validators.required, Validators.maxLength(25)]],
      descripcion: [, [Validators.required]],
      preguntas: this.fb.array([])
    });
    this.agregarPregunta();
  }

  flip={status:'inactive'}
  toggleFlip() {
    this.flip.status = this.flip.status == 'inactive' ? 'active' : 'inactive';
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
      descripcion: ['', [Validators.required]],
      esCorrecta: [, [Validators.required]]
    });
  }

  agregarOpcion(indexPreg: number) {
    if (this.opciones(indexPreg).length === 6) {
      this.toastService.showError('El maximo es de 6 opciones', 'Eror');
    } else {
      this.opciones(indexPreg).push(this.newOpcion());
    }
    // console.log(this.opciones(indexPreg));
  }

  eliminarOpcion(indexPreg: number, indexOpc: number) {
    this.opciones(indexPreg).removeAt(indexOpc);
  }

  async crearTrivia() {
    (
      await this._triviasService.crearTriviaConPreguntasOpciones(
        this.triviaForm.value
      )
    ).subscribe({
      next: () => {
        console.log;
        const title = 'Trivia creada con exito';
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
        // console.log('err en toasterror ->',errorToast)
      }
    });
  }
}
