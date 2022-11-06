import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import {
  Opciones,
  Pregunta,
  TipoDePregunta
} from 'app/trivias/interfaces/Trivias.interface';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  constructor() {}
  // form!: FormGroup;
  // formArray!: FormArray;
  opciones: any[] = [];
  @Input('pregunta') preguntaActual!: Pregunta;

  @Input() opcion?: any;
  opcionesSeleccionadas: Opciones[] = [];
  errorOpcSelec = false;

  ngOnInit(): void {
    // console.log(this.preguntaActual._opciones);
    // this.form = this.formGroupDir.control;
    // this.formArray = this.form.get('opciones') as FormArray;
    // this.preguntaActual = {
    //   id: 1,
    //   tipoDePregunta: 'multiple_choice' as TipoDePregunta,
    //   _leyenda: 'pregunta 1',
    //   _opciones: [
    //     {
    //       _descripcion: 'opc 1',
    //       _esCorrecta: false,
    //       _fueSeleccionada: false,
    //       id: 800
    //     },
    //     {
    //       _descripcion: 'opc 2',
    //       _esCorrecta: false,
    //       _fueSeleccionada: false,
    //       id: 801
    //     },
    //     {
    //       _descripcion: 'opc 3',
    //       _esCorrecta: false,
    //       _fueSeleccionada: false,
    //       id: 802
    //     }
    //   ]
    // };
    // console.log(this.preguntaActual);
  }

  selectOpc(opc: Opciones) {
    switch (this.preguntaActual.tipoDePregunta) {
      case 'multiple_choice':
        if (this.opcionesSeleccionadas.length >= 2) {
          this.errorOpcSelec = true;
          // alert('llegaste al limite pa');
        }

        if (
          opc._fueSeleccionada == false &&
          this.opcionesSeleccionadas.length < 2
        ) {
          this.addOpcion(opc);
          console.log('sume');
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
          console.log('sume');
          return;
        }

        break;
      case 'votacion':
        console.log(this.opcionesSeleccionadas.length);
        console.log(opc._fueSeleccionada);
        if (this.opcionesSeleccionadas.length >= 1) {
          this.errorOpcSelec = true;
          // alert('llegaste al limite pa');
        }
        if (
          opc._fueSeleccionada == false &&
          this.opcionesSeleccionadas.length < 1
        ) {
          this.addOpcion(opc);
          console.log('sume');
          return;
        }

        break;
    }

    if (opc._fueSeleccionada == true) {
      console.log('remove');
      return this.removeOpcion(opc);
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
  }

  removeOpcion(opcSelected: Opciones) {
    opcSelected._fueSeleccionada = false;
    let index = this.preguntaActual._opciones.indexOf(opcSelected);
    let indexSel = this.opcionesSeleccionadas.indexOf(opcSelected);
    // console.log(index);
    this.preguntaActual._opciones[index]._fueSeleccionada = false;
    this.opcionesSeleccionadas.splice(indexSel, 1);
    // console.log('elimine, asi quedo ', this.opcionesSeleccionadas);
  }

  // addOpcion(opcion: Opciones, index: number) {
  //   let opcionParaArray = this.fb.group({
  //     id: opcion.id
  //     //Ver que onda este tiempo ¿?
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
