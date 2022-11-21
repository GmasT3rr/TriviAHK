import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-bar',
  templateUrl: './vote-bar.component.html',
  styleUrls: ['./vote-bar.component.css']
})
export class VoteBarComponent implements OnInit {
  // @Input()  opcYCant:any = '' || [
  //   {
  //     id:1,
  //     descripcion:'Descripcion uno',
  //     cantidad:15
  //   },
  //   {
  //     id:2,
  //     descripcion:'Descripcion dos',
  //     cantidad:4
  //   },
  //   {
  //     id:3,
  //     descripcion:'Descripcion tres',
  //     cantidad:11
  //   }
  // ]
  @Input()  opcYCant:any

  totalDeVotos:any
  porcentajes:any=[]


  constructor() { }


  ngOnInit(): void {
    this.calcularTotalDeVotos()
  }


  calcularTotalDeVotos(){
    const arrayDeVotos:any =[]
    this.opcYCant.forEach((opc:any) => {
      arrayDeVotos.push(opc.cantidad)
    });
    this.totalDeVotos = arrayDeVotos.reduce((a:any,b:any)=> a+b,0)
    arrayDeVotos.forEach((cant:any) => {
      const porcentaje = cant / this.totalDeVotos * 100
      this.porcentajes.push(porcentaje+'')
    });
  }

  calcularPorcentaje(cantidadVotos:any){
    const porcentaje = cantidadVotos / this.totalDeVotos * 100
    return `${porcentaje}%`
  }

}
