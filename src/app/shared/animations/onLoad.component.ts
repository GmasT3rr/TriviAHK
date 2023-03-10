import {style, animate, trigger, transition } from '@angular/animations';

   export const onLoadAnimation = trigger("onLoadAnimation", [
      transition(":enter", [
          style({opacity: 0 }),
          animate(
              "500ms",
              style({
                  opacity: 1
              })
          ),
      ]),
      transition(":leave", [
          style({opacity: 1 }),
          animate(
              "500ms",
              style({
                  opacity: 0
              })
          ),
      ]),
  ])
