import { Component, OnInit } from '@angular/core';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Partida } from 'app/trivias/interfaces/Partida.interface';
import { PartidasService } from 'app/trivias/services/partidas.service';
@Component({
  selector: 'app-mis-partidas',
  templateUrl: './mis-partidas.component.html',
  styleUrls: ['./mis-partidas.component.css']
})
export class MisPartidasComponent implements OnInit {
  constructor(private _partidasService: PartidasService) {}
  faGamepad = faGamepad;
  partidaActual: any;
  sinPartidas = true;
  tenesPartidasJugadas!: boolean;
  historialPartidas: Partida[] = [];
  ngOnInit(): void {
    // this._partidasService.getPartidas().subscribe((res: any) => {
    //   console.log(res.body[0]);
    //   if ((res.body.length = 0)) {
    //     return (this.sinPartidas = true);
    //   }
    //   this.partidaActual = res.body[0];
    //   console.log(this.partidaActual);
    //   this.sinPartidas = false;
    //   return;
    // });
    this._partidasService.getPartidas().subscribe({
      next: (res: any) => {
        // console.log(res);
        if (!res.body) {
          return (this.sinPartidas = true);
        }
        this.partidaActual = res.body;
        // console.log(partida);
        // this.idPartida = res.body.id;
        // this.segEntrePreg = res.body[0]._segundosEntrePreguntas;
        // this.idTrivia = res.body[0]._trivia.id;
        // this.triviaNombre = res.body[0]._trivia._nombre;
        // this.triviaDesc = res.body[0]._trivia._descripcion;
        this.sinPartidas = false;
        return;
      }
    });

    this._partidasService.obtenerHistorial().subscribe({
      next: (res: any) => {
        if (res.body == 'El usuario no tiene partidas jugadas') {
          return (this.tenesPartidasJugadas = false);
        }
        this.tenesPartidasJugadas = true;
        this.historialPartidas = res.body;
        return;
      }
    });
  }
}
