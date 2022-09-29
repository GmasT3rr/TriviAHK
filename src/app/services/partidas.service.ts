import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  private server = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  // getPartidas(){
  //   return this.http.get(`${env.dev.serverUrl}/partidas`);
  // }

  //Get partidas con json-server

  getQuizzes(): any {
    return this.http.get(`${this.server}quizzes`);
  }

  getOneQuiz(id: any) {
    return this.http.get(`${this.server}quizzes/${id}`);
  }
}
