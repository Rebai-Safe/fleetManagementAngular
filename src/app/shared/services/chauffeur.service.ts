import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chauffeur } from 'src/app/models/chauffeur';
import { AffectationChauffeur } from 'src/app/models/affectation-chauffeur';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }


  getChauffeurs(){
    return this.httpClient.get<any>(this.serverUrl+'chauffeurs');
                            
  } 

  getExpiredLicence(){
    return this.httpClient.get<any>(this.serverUrl+'permisExpirees');
  }

  getNbChauffeurs(){
    return this.httpClient.get<any>(this.serverUrl+'chauffeursCount');
  }

  getDispoChauffeur(date:Date){
    return this.httpClient.get<any>(this.serverUrl+'chauffeursDispo/'+date);
                            
  }


   addChauffeur(chauffeur:Chauffeur): Observable<Object> {
    return this.httpClient.post(this.serverUrl+'chauffeur', chauffeur);
  }

   updateChauffeur(chauffeur:Chauffeur): Observable<Object> {
    return this.httpClient.put(this.serverUrl+'chauffeur',chauffeur);
  }

  deleteChauffeur(id: number): Observable<any> {
    return this.httpClient.delete(this.serverUrl+'chauffeurs/'+id, { responseType: 'text' });
  }





}
