import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartidasService } from 'app/services/partidas.service';
import { UserService } from 'app/services/user.service';
import { SocketService } from 'app/socket/socket.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _partidasSevice: PartidasService,
    private _socketsService: SocketService,
    private _userService: UserService,
    private router: Router
  ) {}
  @Input('modalPorAbrir') modalPorAbrir!: string;
  @ViewChild('btnModalCerrar') btnModalCerrar!: ElementRef;

  ingresarPartidaForm = this.fb.group({
    codigo: [, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {}

  ingresarPartida() {
    this._userService.getIdUser().subscribe((res: any) => {
      const idUser = res.body;
      this._partidasSevice.getPartidas().subscribe((res: any) => {
        //Si no tiene partidas el usuario
        if (res.body.length == 0) {
          this._socketsService.unirse(
            idUser,
            this.ingresarPartidaForm.value['codigo']
          );
          this.btnModalCerrar.nativeElement.click();
          this.router.navigateByUrl(
            `/main/lobby/${this.ingresarPartidaForm.value['codigo']}`
          );
        }
        //Si la partida que encontro 
        if (res.body[0].id == this.ingresarPartidaForm.value['codigo']) {
          this.btnModalCerrar.nativeElement.click();
          this.router.navigateByUrl(
            `/main/lobby/${this.ingresarPartidaForm.value['codigo']}`
          );
        }
      });
    });
  }
}
