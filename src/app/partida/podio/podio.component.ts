import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { onGrowAnimation } from 'app/shared/animations/grow.component';
import { onLoadAnimation } from 'app/shared/animations/onLoad.component';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { UsuariosPuntuacion } from 'app/trivias/interfaces/Resultado.interface';

@Component({
  selector: 'app-podio',
  templateUrl: './podio.component.html',
  styleUrls: ['./podio.component.css'],
  animations: [onGrowAnimation, onLoadAnimation]
})
export class PodioComponent implements OnInit {
  @Input()
  partidaResultadosFinales!: any[];

  faMedal = faMedal;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.partidaResultadosFinales);
    this.ordenarPuntaje();
  }

  ordenarPuntaje() {
    this.partidaResultadosFinales = this.partidaResultadosFinales.sort(
      (a: any, b: any) => {
        return b.puntaje - a.puntaje;
      }
    );
  }

  options = {
    /* ... */
  };
}
