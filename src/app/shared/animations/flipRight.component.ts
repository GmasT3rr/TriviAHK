import {style, animate, trigger, transition, state } from '@angular/animations';

export const flipRigthAnimation = trigger('flipRigthAnimation', [
  state('active', style({
    transform: 'rotateY(180deg)',
    marginLeft:'10px'
  })),
  state('inactive', style({
    transform: 'rotateY(0)'
  })),
  transition('active => inactive', animate('150ms ease-out')),
  transition('inactive => active', animate('150ms ease-in'))
])
