import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }

   getMarques(){
    return this.httpClient.get<any>(this.serverUrl+'marques');
  }

}
