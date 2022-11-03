import { Component, OnInit } from '@angular/core';
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
  public faRankingStar = faRankingStar
  public users = [1,2,3,4,5,6,7,8]

  constructor() { }

  ngOnInit(): void {
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
