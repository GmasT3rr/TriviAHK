import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { PartidasService } from 'app/services/partidas.service';

@Directive({
  selector: '[esHost]'
})
export class EsHostDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private _partidaService: PartidasService
  ) {}

  // @Input('esHost') idPartida!: number;
  @Input('esHost') inputRecibido!: {
    idPartida: number;
    renderContentUser: boolean;
  };

  @Input('esHostSino') esUsuario!: TemplateRef<any>;

  ngOnInit(): void {
    // console.log(this.idPartida);
    //Agarro endpoint para obtener las partidas creadas del usuario
    this._partidaService.getPartidas().subscribe((res: any) => {
      //Si me devuelve una partida y el id coincide con el id de la partida significa que es el creador
      if (
        res.body.length > 0 &&
        res.body[0].id == this.inputRecibido.idPartida
      ) {
        return this.viewContainer.createEmbeddedView(this.templateRef);
        // return console.log('sos el creador');
      }
      /*
      Esta validación es creada con el fin de no tener que
      si o si tener el ng-template de sino esUsuario
      Si queremos tener ng-template le mandamos renderContentUser
      true
      */
      if (this.inputRecibido.renderContentUser == true) {
        return this.viewContainer.createEmbeddedView(this.esUsuario);
      }
      return;
      // return console.log('sos el player');
    });
  }
}
