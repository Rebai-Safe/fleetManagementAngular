import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EtatService {

  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }

   getEtats(){
    return this.httpClient.get<any>(this.serverUrl+'etats');
  }

}
