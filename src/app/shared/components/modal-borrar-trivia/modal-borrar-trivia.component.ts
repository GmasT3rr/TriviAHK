import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'app/core/services/toast.service';
import { TriviasService } from 'app/trivias/services/trivias.service';

@Component({
  selector: 'app-modal-borrar-trivia',
  templateUrl: './modal-borrar-trivia.component.html',
  styleUrls: ['./modal-borrar-trivia.component.css']
})
export class ModalBorrarTriviaComponent implements OnInit {
  private idTrivia: any;

  constructor(
    private _triviasService: TriviasService,
    private _toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIdTrivia();
  }

  getIdTrivia() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.idTrivia = params.id;
    });
  }

  async borrarTrivia() {
    (
      await this._triviasService.eliminarTriviaPermanente(this.idTrivia)
    ).subscribe({
      next: (res: any) => {
        this._toastService.showSuccess(res.body, 'Exito');
        this.router.navigateByUrl('/main/mis-trivias');
      },
      error: (err: any) => {
        //De todos modos deberia ser imposible intentar borrar con un id incorrecto
        //pero aun asi lo pongo
        this._toastService.showError(err.body, 'Error');
      }
    });
  }
}
