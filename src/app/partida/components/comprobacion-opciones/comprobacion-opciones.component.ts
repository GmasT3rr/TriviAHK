import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'app/core/socket/socket.service';
import { OpcionesCorrectas } from 'app/trivias/interfaces/Resultado.interface';
import { Opciones } from 'app/trivias/interfaces/Trivias.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-comprobacion-opciones',
  templateUrl: './comprobacion-opciones.component.html',
  styleUrls: ['./comprobacion-opciones.component.css']
})
export class ComprobacionOpcionesComponent implements OnInit, OnDestroy {
  constructor(
    private _socketsService: SocketService,
    private activatedRoute: ActivatedRoute
  ) {}

  @Input('opcionesSeleccionadas') opcionesSeleccionadas!: Opciones[] | null;
  @Input('opcionesCorrectas') opcionesCorrectas!: OpcionesCorrectas[];
  @Input('tipoDePregunta') tipoDePregunta!: string;
  unsubscribe$ = new Subject<any>();
  tuvisteErrores = false;
  idPartida!: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((x: any) => {
      this.idPartida = x.params.id;
    });
    // this._socketsService.opcionesCorrectas$
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(opcionesCorrectas => {
    //     console.log('opciones cor', opcionesCorrectas);
    //     console.log('opciones rec', this.opcionesSeleccionadas);
    //   });

    if (this.opcionesSeleccionadas) {
      if (this.tipoDePregunta != 'votacion') {
        let cantOpcCorrectasAcertadas = 0;
        let cantOpcCorrectasDePreg = 0;
        for (const opcCorrecta of this.opcionesCorrectas) {
          const idOpcCorrecta = opcCorrecta.id;
          cantOpcCorrectasDePreg++;
          for (const opcSelec of this.opcionesSeleccionadas) {
            const idOpcSelec = opcSelec.id;
            if (idOpcCorrecta == idOpcSelec) {
              cantOpcCorrectasAcertadas++;
            }
          }
        }
        // console.log('cant opc acer', cantOpcCorrectasAcertadas);
        // console.log('cant opc sec', cantOpcCorrectasDePreg);
        if (cantOpcCorrectasAcertadas != cantOpcCorrectasDePreg) {
          this.tuvisteErrores = true;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
