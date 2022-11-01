import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'app/core/services/toast.service';
import { UserService } from 'app/core/services/user.service';
import { SocketService } from 'app/core/socket/socket.service';
import { PartidasService } from 'app/trivias/services/partidas.service';

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
  @Input('idTrivia') idTrivia!: number;
  @ViewChild('btnModalCerrar') btnModalCerrar!: ElementRef;

  ingresarPartidaForm = this.fb.group({
    codigo: [, [Validators.required, Validators.min(1)]]
  });

  ingresarTiempoEntrePartida = this.fb.group({
    tiempo: [, [Validators.required, Validators.min(5)]]
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
                // this._socketsService.unirse(
                //   idUser,
                //   this.ingresarPartidaForm.value['codigo']
                // );
                this.toastService.showSuccess(
                  'Te has unido a la partida correctamente',
                  'Felicidades'
                );
                this.btnModalCerrar.nativeElement.click();
                this.router.navigateByUrl(
                  `/partida/lobby/${this.ingresarPartidaForm.value['codigo']}`
                );
              }
              // this._socketsService.unirse(
              //   idUser,
              //   this.ingresarPartidaForm.value['codigo']
              // );
              //Si ya esta unido en alguna
              this.btnModalCerrar.nativeElement.click();
              this.router.navigateByUrl(
                `/partida/lobby/${this.ingresarPartidaForm.value['codigo']}`
              );
            });
            return;
          }
          this.ingresarPartidaForm.reset();
          this.btnModalCerrar.nativeElement.click();
          return this.toastService.showError(
            'No se encontró ninguna partida con ese id',
            'Error'
          );
        })
        .catch((error: any) => {
          // console.log(error.error.body);
          //Si tenemos algun error del server nos manda al main/home
          this.ingresarPartidaForm.reset();
          this.btnModalCerrar.nativeElement.click();
          this.toastService.showError(error.error.body, 'Error');
        });
    });
  }

  crearPartida() {
    this._partidasSevice
      .crearPartida(
        this.idTrivia,
        Number(this.ingresarTiempoEntrePartida.value['tiempo'])
      )
      .subscribe({
        next: (res: any) => {
          const partida = res.body;
          this._socketsService.unirse(partida._usuarioHost.id, partida.id);

          //Clickeamos el btn con data-bs-dismiss="modal" para cerrar el modal
          this.btnModalCerrar.nativeElement.click();
          this.router.navigateByUrl(`/partida/lobby/${partida.id}`);
          this.toastService.showSuccess(
            `Unido a la partida ${partida.id}`,
            'Felicidades'
          );
        },
        error: (err: any) => {
          // console.log(err);
          this.ingresarTiempoEntrePartida.reset();
          this.btnModalCerrar.nativeElement.click();
          this.toastService.showError(err.error.body, 'Error');
        }
      });
  }
}
