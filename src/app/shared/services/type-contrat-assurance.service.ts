import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TypeContratAssuranceService {

  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }

   getTypeContratAssurance(){
    return this.httpClient.get<any>(this.serverUrl+'typesContratAssurance');
  }

}
