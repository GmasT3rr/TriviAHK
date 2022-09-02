import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  editForm!:FormGroup
  constructor() { 
  }

  
  ngOnInit(): void {
    this.editForm = this.createFormGroup()

  }

  createFormGroup(){
    return new FormGroup({
      nombre  :new FormControl('',[Validators.required]),
      usuario  :new FormControl('',[Validators.required]),
      email  :new FormControl('',[Validators.required]),
      sexo  :new FormControl('',[Validators.required]),
      cuenta  :new FormControl('',[Validators.required]),
      carrera  :new FormControl('',[Validators.required]),
    })
  }

  ngSubmit(){
    console.log(this.editForm.value)
  }
}
