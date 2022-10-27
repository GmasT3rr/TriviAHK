import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'app/services/toast.service';
import { TriviasService } from 'app/services/trivias.service';

@Component({
  selector: 'app-modal-borrar-trivia',
  templateUrl: './modal-borrar-trivia.component.html',
  styleUrls: ['./modal-borrar-trivia.component.css']
})
export class ModalBorrarTriviaComponent implements OnInit {

  private idTrivia:any

  constructor(
    private triviasService:TriviasService,
    private toastService:ToastService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getIdTrivia()
  }

  getIdTrivia(){
    this.activatedRoute.params.subscribe((params:any) => {
      this.idTrivia = params.id
    })
  }

  async borrarTrivia(){
    (await this.triviasService.eliminarTriviaPermanente(this.idTrivia)).subscribe({
      next:((res:any)=>{
        this.toastService.showSuccess(res.body,'Exito')
        this.router.navigateByUrl('/main/mis-trivias')
      }),
      error:((err)=>{
        //De todos modos deberia ser imposible intentar borrar con un id incorrecto
        //pero aun asi lo pongo
        this.toastService.showError(err.body,'Error')
      })
    })

  }

}
