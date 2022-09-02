import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  
  editForm!:FormGroup
  constructor() { 
  }

  
  ngOnInit(): void {
    this.editForm = this.createFormGroup()
  }

  createFormGroup(){
    return new FormGroup({
      oldPassword  :new FormControl('',[Validators.required]),
      newPassword  :new FormControl('',[Validators.required]),
      newPasswordRepeat :new FormControl('',[Validators.required])
    })
  }

  ngSubmit(){
    console.log(this.editForm.value)
  }

}
