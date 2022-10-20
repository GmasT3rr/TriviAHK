import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'app/services/toast.service';
import { TriviasService } from 'app/services/trivias.service';

@Component({
  selector: 'app-crear-quiz',
  templateUrl: './crear-quiz.component.html',
  styleUrls: ['./crear-quiz.component.css']
})
export class CrearQuizComponent implements OnInit {

  private toastMsg:string = ''
  private toastTitle:string = ''



  constructor(
    private toastService: ToastService,
    private fb: FormBuilder,
    private router:Router,
    private _triviasService:TriviasService
  ) {}

  tipoDePregunta = ['VOTACION', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE'];
  esCorrecta = ['true', 'false'];

  triviaForm!: FormGroup;

  ngOnInit(): void {
    this.triviaForm = this.fb.group({
      nombre: [, [Validators.required]],
      descripcion: [, [Validators.required]],
      preguntas: this.fb.array([])
    });
    this.agregarPregunta()
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
    if(this.opciones(indexPreg).length === 6){
      this.toastService.showError('El maximo es de 6 opciones','Eror')
    }else{
      this.opciones(indexPreg).push(this.newOpcion());
    }
    // console.log(this.opciones(indexPreg));
  }

  eliminarOpcion(indexPreg: number, indexOpc: number) {
    this.opciones(indexPreg).removeAt(indexOpc);
  }

  crearTrivia() {
    this._triviasService
      .crearTriviaConPreguntasOpciones(this.triviaForm.value)
      .subscribe(console.log);
    this.showToast()
  }

  showToast(){
    this.toastTitle = 'Trivia creada con exito'
    this.toastMsg = 'Puede verla en su perfil'
    this.toastService.showSuccess(this.toastMsg,this.toastTitle)
    this.router.navigateByUrl('/main/mis-trivias')
  }

}
