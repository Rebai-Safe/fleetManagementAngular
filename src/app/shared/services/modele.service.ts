import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }

   getModeles(){
    return this.httpClient.get<any>(this.serverUrl+'modeles');
  }

  getModelesBymarques(id:number){
    return this.httpClient.get<any>(this.serverUrl+'modeles/'+id);
  }
}
