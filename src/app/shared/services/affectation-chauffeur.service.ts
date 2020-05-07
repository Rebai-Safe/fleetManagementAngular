import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AffectationChauffeur } from 'src/app/models/affectation-chauffeur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffectationChauffeurService {
  serverUrl = 'http://localhost:8888/';
  
  constructor(private httpClient: HttpClient) { }


  getAffectations(){ 
    return this.httpClient.get<any>(this.serverUrl+'affectations');
                            
  }

  addAffetation(affectation:AffectationChauffeur): Observable<Object> {
    return this.httpClient.post(this.serverUrl+'affectation', affectation);
  }

  updateAffetation(affectation:AffectationChauffeur): Observable<Object> {
    return this.httpClient.put(this.serverUrl+'affectation',affectation);
  }

  deleteAffetation(id: number): Observable<any> {
    return this.httpClient.delete(this.serverUrl+'affectation/'+id, { responseType: 'text' });
  }


  

}
