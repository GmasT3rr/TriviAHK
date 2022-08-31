import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}
  loginForm: FormGroup;

  constructor(private rt:Router, private svc:LoginService,private auth: AuthService) {
    this.loginForm = this.createFormGroup();
   }

   ngOnInit(): void {
    this.getUsers()
   }

   login(){
    this.auth.loginWithRedirect()
   }

   //METODO SIGNUP AUTH0
   signup(){
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
   }

 //Creacion de formato del formulario de "login"
 createFormGroup(){
   return new FormGroup({
     email  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.email)]),
     password  :new FormControl('',[Validators.required,Validators.minLength(5)]),
   })
 }

 //Traer todos los usuarios para visualizarlos
 getUsers(){
   this.svc.getUsers().subscribe((u)=>console.log("USUARIOS: ",u)
   )
 }

 //Comprueba primero los campos del "login" y luego las credenciales del usuario
 //Formato correcto de email y contraseña, usuario existente y autorizado
 checkCredentals(){
  let valid = this.loginForm.status
  console.log(this.loginForm.value);
  if(valid === "VALID"){
    console.log("Formulario VALIDO")
    this.rt.navigateByUrl('/home')
  }else{
    console.log("Formulario INVALIDO")
  }

}
//  checkCredentals(){
//    let valid = this.loginForm.status
//    if(valid === "VALID"){
//      this.svc.getUsers().subscribe(res=>{
//        const user:any[] = res.find((a:any)=>{
//          return a.email === this.loginForm.value.email &&
//          a.password === this.loginForm.value.password &&
//          a.autorizado === true
//        });
//        if(user){
//          this.loginForm.reset()
//          Swal.fire({
//            title: 'Login exitoso',
//            timer: 1500,
//            icon: 'success',
//          }).then(function(){
//            window.location.href = "http://localhost:4200/home"
//          }).catch(function(err:any){
//            console.log(err)
//          })
//        }else{
//          Swal.fire({
//            text: 'Este usuario no existe o no esta autorizado',
//            icon: 'error',
//            confirmButtonText: 'Ok'
//          })
//        }
//      })
//    }else{
//      Swal.fire({
//        text: 'Los campos no son validos',
//        icon: 'error',
//        confirmButtonText: 'Ok'
//      })
//    }
//  }


 //Sirve para ver los datos ingresados del forms al clikear en el boton "Ingresar"
 showData(){
   console.log(this.loginForm.value)
 }



  get emailInvalido(){return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched }
  get passwordInvalido(){return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched }

}
