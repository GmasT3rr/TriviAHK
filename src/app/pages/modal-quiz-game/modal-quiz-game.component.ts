import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GetIdServiceService } from '../../services/get-id-service.service';

@Component({
  selector: 'app-modal-quiz-game',
  templateUrl: './modal-quiz-game.component.html',
  styleUrls: ['./modal-quiz-game.component.css']
})
export class ModalQuizGameComponent implements OnInit {
  inputId: string = '';
  form!: FormGroup;

  constructor(private router: Router, private idService: GetIdServiceService) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = new FormGroup({
      input: new FormControl('')
    });
  }

  goToQuizz() {
    this.inputId = this.form.value.input;
    this.idService.shareId.emit(this.inputId);
    setTimeout(() => {
      this.router.navigateByUrl('/main/play');
    }, 1000);
  }
}
