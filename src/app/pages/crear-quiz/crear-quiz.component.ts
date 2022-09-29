import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PartidasService } from '../../services/partidas.service';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-crear-quiz',
  templateUrl: './crear-quiz.component.html',
  styleUrls: ['./crear-quiz.component.css']
})
export class CrearQuizComponent implements OnInit {
  @ViewChild('referenciaAPreguntas', { read: ViewContainerRef })
  VCR!: ViewContainerRef;

  referenciaAPreguntas = Array<ComponentRef<QuizFormComponent>>();
  childUniqueId: number = 0;
  public quizes: any[] = [];
  public descForm!: FormGroup;

  constructor(
    private partidaService: PartidasService,
    private CFR: ComponentFactoryResolver
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getQuizes();
  }

  getQuizes() {
    this.partidaService.getQuizzes().subscribe((quizes: any) => {
      this.quizes = quizes;
    });
  }

  createForm() {
    this.descForm = new FormGroup({
      descripcion: new FormControl('')
    });
  }

  createComponent() {
    const component: any = this.VCR.createComponent(QuizFormComponent);

    let childComponent = component.instance;
    childComponent.uniqueId = ++this.childUniqueId;
    childComponent.parentRef = this;

    // Pushear el componente al array
    this.referenciaAPreguntas.push(component);
  }

  removeComponent(key: number) {
    if (this.VCR.length < 1) return;

    let componentRef = this.referenciaAPreguntas.filter(
      x => x.instance.uniqueId == key
    )[0];

    let vcrIndex: number = this.VCR.indexOf(componentRef.hostView);

    // removing component from container
    this.VCR.remove(vcrIndex);

    // removing component from the list
    this.referenciaAPreguntas = this.referenciaAPreguntas.filter(
      x => x.instance.uniqueId !== key
    );
  }

  guardarQuizz() {
    let todasLasPreguntas: any[] = [];
    this.referenciaAPreguntas.forEach(c => {
      todasLasPreguntas.push(c.instance.getValores());
    });
    const preguntasYDescripcion = todasLasPreguntas.concat(this.descForm.value);
    console.log('preguntasYDescripcion', preguntasYDescripcion);
  }
}
