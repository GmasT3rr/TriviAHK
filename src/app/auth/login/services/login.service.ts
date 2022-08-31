import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private sv = "http://localhost:3000/users"
  
  getUsers():Observable<any[]>{
    return this.http.get<any>(this.sv)
  }
}
