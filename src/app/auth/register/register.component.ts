import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private rt:Router) { 
    this.registerForm = this.createFormGroup()
  }

  ngOnInit(): void {
  }

  expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    dni: /^\d{8,8}$/, // 7 a 14 numeros.
    numero: /^\d{7,14}$/, // 7 a 14 numeros.
}


registerForm: FormGroup;
  createFormGroup(){
    return new FormGroup({
      nombre  :new FormControl('', [Validators.required,Validators.pattern(this.expresiones.nombre)]),
      apellido  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.nombre)]),
      usuario  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      password  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      // dni  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.dni)]),
      email  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.email)]),
      telefono  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.numero)]),
      localidad  :new FormControl('',[Validators.minLength(5)]),
  
    })
  }


  register(){
    let valid = this.registerForm.status
    console.log(this.registerForm.value);
    if(valid === "VALID"){
      console.log("Formulario VALIDO")
      this.rt.navigateByUrl('/auth')

    }else{
      console.log("Formulario INVALIDO")
    }

  }

  get nombreInvalido(){return this.registerForm.get('nombre')?.invalid && this.registerForm.get('nombre')?.touched }
  get apellidoInvalido(){return this.registerForm.get('apellido')?.invalid && this.registerForm.get('apellido')?.touched }
  get usuarioInvalido(){return this.registerForm.get('usuario')?.invalid && this.registerForm.get('usuario')?.touched }
  get passwordInvalido(){return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched }
  get dniInvalido(){return this.registerForm.get('dni')?.invalid && this.registerForm.get('dni')?.touched }
  get emailInvalido(){return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched }
  get telefonoInvalido(){return this.registerForm.get('telefono')?.invalid && this.registerForm.get('telefono')?.touched }
  get localidadInvalido(){return this.registerForm.get('localidad')?.invalid && this.registerForm.get('localidad')?.touched }

}
