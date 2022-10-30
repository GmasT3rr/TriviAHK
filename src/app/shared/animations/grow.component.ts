import { style, animate, trigger, transition } from '@angular/animations';

export const onGrowAnimation = trigger('onGrowAnimation', [
  transition(':enter', [
    style({
      height: '0', overflow: 'hidden' }),
    animate(
      "{{time}}", style({ height: '*' })),
  ]),
]);

