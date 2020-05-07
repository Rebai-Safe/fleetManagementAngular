import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TypeBoiteVitesseService {

  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }

   getTypeBoitesVitesses(){
    return this.httpClient.get<any>(this.serverUrl+'typesBoite');
  }

}
