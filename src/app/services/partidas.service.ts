import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  constructor(private http: HttpClient) {
  }

  getPartidas(){
    return this.http.get(`${env.dev.serverUrl}/partidas`);
    
  }
}
