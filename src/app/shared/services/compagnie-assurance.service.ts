import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompagnieAssuranceService {

  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }

   getCompagnies(){
    return this.httpClient.get<any>(this.serverUrl+'compagnies');
  }

}
