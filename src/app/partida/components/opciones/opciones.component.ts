import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { SocketService } from 'app/core/socket/socket.service';
import {
  Opciones,
  Pregunta,
  TipoDePregunta
} from 'app/trivias/interfaces/Trivias.interface';
import { PartidasService } from 'app/trivias/services/partidas.service';
import { pipe, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit, OnDestroy {
  constructor(
      private _socketsService: SocketService,
      private readonly _partidaService: PartidasService) {}

  // form!: FormGroup;
  // formArray!: FormArray;
  opciones: any[] = [];
  @Input('pregunta') preguntaActual!: Pregunta;

  opcionesSeleccionadas: Opciones[] = [];
  @Output() opcSeleccionadasEmit = new EventEmitter<Opciones[]>();
  errorOpcSelec = false;
  puedeResponder = true;
  unsubscribe$ = new Subject<any>();

  ngOnInit(): void {
    this._partidaService.puedeResponder
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(puede => this.puedeResponder = puede);
    this.limpiarOpciones();
  }

  ngOnDestroy(): void {
    this._partidaService.puedeResponder.next(true);
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  limpiarOpciones() {
    this._socketsService.socket?.on('partida:resultados', r => {
      this.opcionesSeleccionadas = [];
    });
    this._socketsService.socket?.on('partida:respondio', r => {
      this.opcionesSeleccionadas = [];
    });
  }

  selectOpc(opc: Opciones) {
    if(this.puedeResponder) {      
      switch (this.preguntaActual.tipoDePregunta) {
        case 'multiple_choice':
          if (this.opcionesSeleccionadas.length >= 2) {
            this.errorOpcSelec = true;
            // alert('llegaste al limite pa');
          }
  
          if (
            opc._fueSeleccionada == false &&
            this.opcionesSeleccionadas.length < this.preguntaActual._opciones.length - 1
          ) {
            this.addOpcion(opc);
            // console.log('sume');
            return;
          }
  
          break;
        case 'single_choice':
          if (this.opcionesSeleccionadas.length >= 1) {
            this.errorOpcSelec = true;
            // alert('llegaste al limite pa');
          }
          if (
            opc._fueSeleccionada == false &&
            this.opcionesSeleccionadas.length < 1
          ) {
            this.addOpcion(opc);
            // console.log('sume');
            return;
          }
  
          break;
        case 'votacion':
          // console.log(this.opcionesSeleccionadas.length);
          // console.log(opc._fueSeleccionada);
          if (this.opcionesSeleccionadas.length >= 1) {
            this.errorOpcSelec = true;
            // alert('llegaste al limite pa');
          }
          if (
            opc._fueSeleccionada == false &&
            this.opcionesSeleccionadas.length < 1
          ) {
            this.addOpcion(opc);
            // console.log('sume');
            return;
          }
  
          break;
      }
  
      if (opc._fueSeleccionada == true) {
        // console.log('remove');
        this.removeOpcion(opc);
        return;
      }
    }
    // if (opc._fueSeleccionada == false) {
    //   this.addOpcion(opc);
    // } else {
    //   this.removeOpcion(opc);
    // }
  }

  addOpcion(opcSelected: Opciones) {
    opcSelected._fueSeleccionada = true;
    this.opcionesSeleccionadas.push(opcSelected);
    let index = this.preguntaActual._opciones.indexOf(opcSelected);
    // console.log('iondex', index);
    this.preguntaActual._opciones[index]._fueSeleccionada = true;
    this.opcSeleccionadasEmit.emit(this.opcionesSeleccionadas);
  }

  removeOpcion(opcSelected: Opciones) {
    opcSelected._fueSeleccionada = false;
    let index = this.preguntaActual._opciones.indexOf(opcSelected);
    let indexSel = this.opcionesSeleccionadas.indexOf(opcSelected);
    // console.log(index);
    this.preguntaActual._opciones[index]._fueSeleccionada = false;
    this.opcionesSeleccionadas.splice(indexSel, 1);
    this.opcSeleccionadasEmit.emit(this.opcionesSeleccionadas);
    // console.log('elimine, asi quedo ', this.opcionesSeleccionadas);
  }

  // addOpcion(opcion: Opciones, index: number) {
  //   let opcionParaArray = this.fb.group({
  //     id: opcion.id
  //     //Ver que onda este tiempo ???
  //     // tiempo: opcion.tiempo
  //   });
  //   if (opcion._fueSeleccionada) {
  //     this.formArray.push(opcionParaArray);
  //   } else {
  //     //TODO
  //     // this.formArray.removeAt(this.formArray.at(opcion));
  //   }
  // }

  getColor(indice: any) {
    switch (indice) {
      case 0:
        return {
          'background-color': '#FF5C95'
        };
      case 1:
        return {
          'background-color': '#50FFB5'
        };
      case 2:
        return {
          'background-color': '#FFEB33'
        };
      case 3:
        return {
          'background-color': '#69E2FF'
        };
      default:
        return {
          'background-color': '#FFFFFF'
        };
    }
  }
}
