import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from 'app/core/socket/socket.service';
import { Trivia } from 'app/trivias/interfaces/Trivias.interface';
import { PartidasService } from 'app/trivias/services/partidas.service';

@Component({
  selector: 'app-modal-mis-trivias',
  templateUrl: './modal-mis-trivias.component.html',
  styleUrls: ['./modal-mis-trivias.component.css']
})
export class ModalMisTriviasComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _partidasService: PartidasService,
    private _socketsService: SocketService,
    private router: Router
  ) {}

  @Input() trivia!: Trivia;
  @Input() modalPorAbrir!: string;
  @ViewChild('btnModalCerrar') btnModalCerrar!: ElementRef;

  tiposDePreguntas: string[] = ['multiple_choice', 'single_choice', 'votacion'];
  esCorrecta: boolean[] = [true, false];

  crearForm: FormGroup = this.fb.group({
    segundosEntrePreguntas: ['', [Validators.required, Validators.min(5)]]
  });

  ngOnInit(): void {}

  crearPartida() {
    // console.log(this.crearForm.value['segundosEntrePreguntas']);
    this._partidasService
      .crearPartida(
        this.trivia.id,
        this.crearForm.value['segundosEntrePreguntas']
      )
      .subscribe((res: any) => {
        const partida = res.body;
        this._socketsService.unirse(partida._usuarioHost.id, partida.id);
        //Clickeamos el btn con data-bs-dismiss="modal" para cerrar el modal
        this.btnModalCerrar.nativeElement.click();
        this.router.navigateByUrl(`/main/lobby/${partida.id}`);
      });
  }
}
