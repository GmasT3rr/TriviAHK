import {style, animate, trigger, transition, state } from '@angular/animations';

export const flipAnimation = trigger('flipAnimation', [
  state('active', style({
    transform: 'rotateX(180deg)'
  })),
  state('inactive', style({
    transform: 'rotateY(0)'
  })),
  transition('active => inactive', animate('500ms ease-out')),
  transition('inactive => active', animate('500ms ease-in'))
])
