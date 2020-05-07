import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TypeCarburantService {

  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }

   getTypeCarburants(){
    return this.httpClient.get<any>(this.serverUrl+'typesCarburant');
  }

}
