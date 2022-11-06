import { trigger, transition, animate, style,query,stagger } from "@angular/animations";


export const onRankingAnimation = trigger('onRankingAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('1000ms', animate('1000ms ease-in', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    query(':leave', animate('200ms', style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);
