import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[ocultarDespuesDe]'
})
export class OcultarDespuesDeDirective implements OnInit {
  @Input('ocultarDespuesDe') delay!: number;

  @Input('ocultarDespuesDeMostrar')
  templateDespuesDelay!: TemplateRef<any> | null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    // console.log('hola dir');
    // console.log('delay', this.delay);
    // console.log('temple ', this.templateDespuesDelay);
    this.viewContainer.createEmbeddedView(this.templateRef);
    setTimeout(() => {
      this.viewContainer.clear();
      if (this.templateDespuesDelay) {
        this.viewContainer.createEmbeddedView(this.templateDespuesDelay);
      }
    }, this.delay);
  }
}
