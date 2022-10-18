import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trivia } from 'app/interfaces/Trivias.interface';
import { PartidasService } from 'app/services/partidas.service';
import { TriviasService } from 'app/services/trivias.service';
import { SocketService } from 'app/socket/socket.service';

@Component({
  selector: 'app-crear-partida',
  templateUrl: './crear-partida.component.html',
  styleUrls: ['./crear-partida.component.css']
})
export class CrearPartidaComponent implements OnInit {
  constructor(
    private _triviasService: TriviasService,
    private _partidaService: PartidasService,
    private _socketsService: SocketService,
    private router: Router
  ) {}

  public triviasDelUsuario!: Trivia[];

  ngOnInit(): void {
    this._triviasService.getTriviasDelUsuario().subscribe((res: any) => {
      this.triviasDelUsuario = res.body;
    });
  }

  crearPartida(index: number) {
    const idTrivia = this.triviasDelUsuario[index].id;
    // this._partidaService.crearPartida(idTrivia).subscribe((res: any) => {
    //   const partida = res.body;
    //   this._socketsService.unirse(partida._usuarioHost.id, partida.id);
    //   this.router.navigateByUrl(`/main/lobby/${partida.id}`)
    // });
  }
}
