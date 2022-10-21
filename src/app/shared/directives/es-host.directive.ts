import { Directive } from '@angular/core';

@Directive({
  selector: '[appEsHost]'
})
export class EsHostDirective {

  constructor() { console.log('hola');}

}
