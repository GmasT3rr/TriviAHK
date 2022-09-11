import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasService } from '../../services/partidas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';

@Component({
  selector: 'app-crear-quiz',
  templateUrl: './crear-quiz.component.html',
  styleUrls: ['./crear-quiz.component.css']
})
export class CrearQuizComponent implements OnInit {
  @ViewChild('infoDePreguntas', { read: ViewContainerRef })
  container!: ViewContainerRef;

  public preguntas: any[] = [];
  public quizes: any[] = [];
  currentID: any;
  referenciaAPreguntas: any[] = [];
  // quizesForm: FormGroup;

  constructor(
    private rt: ActivatedRoute,
    private partidaService: PartidasService,
    public componentFactoryResolver: ComponentFactoryResolver
  ) {
    // this.quizesForm = this.createQuizesForm();
  }

  agregarPreguntaForm(form: any) {
    this.preguntas.push(form);
    console.log('FORMULARIO ENTRANTE "PARENT(CREAR-QUIZ)"', form);
  }
  verPreguntas() {
    console.log('Array de preguntas', this.preguntas);
  }

  ngOnInit(): void {
    const path = this.rt.snapshot.pathFromRoot[2].params;
    console.log(path);
    this.currentID = path;
    console.log(this.currentID.id);
    this.getQuizes();
  }

  component: any;
  componentFactory: any;

  agregarPreg() {
    //crea creador de componente
    this.componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(QuizFormComponent);
    //El container crea el componente con el creador
    this.component = this.container.createComponent(this.componentFactory);
    // Pushear el componente al array
    this.referenciaAPreguntas.push(this.component);
  }

  getQuizes() {
    this.partidaService.getQuizzes().subscribe((quizes: any) => {
      this.quizes = quizes;
    });
  }

  // createQuizesForm() {
  //   return new FormGroup({
  //     descripcion: new FormControl(''),
  //     orden: new FormControl(''),
  //     tiempo: new FormControl(''),
  //     puntos: new FormControl('')
  //   });
  // }

  // inputDePreguntas:any[]=[1]
  // agregarUnaPregunta(){
  //   this.inputDePreguntas.push(+1)
  // }
  // eliminarUnaPregunta(){
  //   this.inputDePreguntas.pop()
  // }

  // verValorDelForm() {
  //   console.log('Pregunta actual', this.quizesForm.value);
  // }

  // agregarPreguntasAlArray() {
  //   this.preguntas.push(this.quizesForm.value);
  //   console.log('Array de preguntas', this.preguntas);
  // }
}
