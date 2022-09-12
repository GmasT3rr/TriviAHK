import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
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

  private currentID: any;
  public quizes: any[] = [];
  referenciaAPreguntas = Array<ComponentRef<QuizFormComponent>>();
  child_unique_key: number = 0;

  constructor(
    private rt: ActivatedRoute,
    private partidaService: PartidasService,
    public componentFactoryResolver: ComponentFactoryResolver
  ) {}

  // agregarPreguntaForm(form: any) {
  //   this.preguntas.push(form);
  //   console.log('FORMULARIO ENTRANTE "PARENT(CREAR-QUIZ)"', form);
  // }
  // verPreguntas() {
  //   console.log('Array de preguntas', this.preguntas);
  // }

  ngOnInit(): void {
    const path = this.rt.snapshot.pathFromRoot[2].params;
    console.log(path);
    this.currentID = path;
    console.log(this.currentID.id);
    this.getQuizes();
  }

  getQuizes() {
    this.partidaService.getQuizzes().subscribe((quizes: any) => {
      this.quizes = quizes;
    });
  }
  component: any;
  componentFactory: any;

  createComponent() {
    //crea creador de componente
    this.componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(QuizFormComponent);
    //El container crea el componente con el creador
    this.component = this.container.createComponent(this.componentFactory);

    let childComponent = this.component.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;
    // Pushear el componente al array
    this.referenciaAPreguntas.push(this.component);
  }

  remove(key: number) {
    if (this.container.length < 1) return;

    let componentRef = this.referenciaAPreguntas.filter(
      x => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.container.indexOf(componentRef as any);

    // removing component from container
    this.container.remove(vcrIndex);

    // removing component from the list
    this.referenciaAPreguntas = this.referenciaAPreguntas.filter(
      x => x.instance.unique_key !== key
    );
  }

  guardarQuizz() {
    let todasLasPreguntas: any = [];
    this.referenciaAPreguntas.forEach(c => {
      todasLasPreguntas.push(c.instance.getValores());
    });
    console.log(todasLasPreguntas);
  }
}
