import { Component, Input, OnInit } from '@angular/core';
import { onRankingAnimation } from 'app/shared/animations/ranking.component';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  animations:[
    onRankingAnimation
  ]
})
export class RankingComponent implements OnInit {

  @Input() partidaResultadosPrevios: any;

  ordenarPuntaje(){
    this.partidaResultadosPrevios  = this.partidaResultadosPrevios.sort((a:any,b:any) =>{
      return b.puntajeTotal - a.puntajeTotal
    })
  }

  public faRankingStar = faRankingStar

  constructor() { }

  ngOnInit(): void {
    this.ordenarPuntaje()
    // console.log('RANKING ordenado',this.partidaResultadosPrevios);
  }

   public getBgColor(index: number): string {
    switch (index) {
      case 0:
        return '#FFC633'
      case 1:
        return '#BFC0C0'
      case 2:
        return '#CD7F32'
      default:
        return 'rgba(212, 213, 216, .3)'
    }
    // if(index % 2 == 0){
    //   return "#FCFCFC"
    // } else return '#FD999B';

   }
   public getColor(index: number): string {
    if(index % 2 == 0){
      return "#000000"
    } else return '#FCFCFC';
   }

}
