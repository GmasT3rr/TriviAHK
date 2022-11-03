import { Component, OnInit } from '@angular/core';
import { onGrowAnimation } from 'app/shared/animations/grow.component';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-podio',
  templateUrl: './podio.component.html',
  styleUrls: ['./podio.component.css'],
  animations:[
    onGrowAnimation,
    onLoadAnimation
  ]
})
export class PodioComponent implements OnInit {

  faMedal = faMedal

  constructor() { }

  ngOnInit(): void {
  }
  options = {
    /* ... */
  }
}
