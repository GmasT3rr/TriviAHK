import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartidasService } from 'app/services/partidas.service';
import { ToastService } from 'app/services/toast.service';
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
    private toastService: ToastService,
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
      return this._partidasSevice
        .obtenerPartida(this.ingresarPartidaForm.value['codigo'])
        .then((res: any) => {
          //Si coincide el id de la partida con alguna partida existente
          if (res.id == this.ingresarPartidaForm.value['codigo']) {
            this._partidasSevice.getPartidas().subscribe((res: any) => {
              //Si no tiene ninguna partida el usuario
              if (res.body.length == 0) {
                this._socketsService.unirse(
                  idUser,
                  this.ingresarPartidaForm.value['codigo']
                );
                this.toastService.showSuccess(
                  'Te has unido a la partida correctamente',
                  'Felicidades'
                );
                this.btnModalCerrar.nativeElement.click();
                this.router.navigateByUrl(
                  `/main/lobby/${this.ingresarPartidaForm.value['codigo']}`
                );
              }
              //Si ya esta unido en alguna
              this.btnModalCerrar.nativeElement.click();
              this.router.navigateByUrl(
                `/main/lobby/${this.ingresarPartidaForm.value['codigo']}`
              );
            });
            return
          } return this.toastService.showError('No se encontró ninguna partida con ese id', 'Error');
        })
        .catch((error: any) => {
          // console.log(error.error.body);
          //Si tenemos algun error del server nos manda al main/home
          this.toastService.showError(error.error.body, 'Error');
        });
    });
  }
}
