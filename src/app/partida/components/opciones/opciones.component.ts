import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { Opciones, Pregunta } from 'app/trivias/interfaces/Trivias.interface';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private formGroupDir: FormGroupDirective
  ) {}
  form!: FormGroup;
  formArray!: FormArray;
  opciones: any[] = [];
  @Input('pregunta') preguntaActual!: Pregunta;

  ngOnInit(): void {
    console.log(this.preguntaActual._opciones);
    this.form = this.formGroupDir.control;
    this.formArray = this.form.get('opciones') as FormArray;
  }

  addOpcion(opcion: Opciones, index: number) {
    let opcionParaArray = this.fb.group({
      id: opcion.id
      //Ver que onda este tiempo ¿?
      // tiempo: opcion.tiempo
    });
    if (opcion._fueSeleccionada) {
      this.formArray.push(opcionParaArray);
    } else {
      //TODO
      // this.formArray.removeAt(this.formArray.at(opcion));
    }
  }

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
