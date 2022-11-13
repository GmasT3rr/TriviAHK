import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoDePregunta'
})
export class TipoDePreguntaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'VOTACION':
        return 'Votación';
      case 'MULTIPLE_CHOICE':
        return 'Multiple choice';
      case 'SINGLE_CHOICE':
        return 'Single choice';

      default:
        break;
    }
    return
  }

}
