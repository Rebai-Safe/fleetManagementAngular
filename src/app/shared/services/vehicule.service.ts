import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from 'src/app/models/vehicule';
import { AffectationChauffeur } from 'src/app/models/affectation-chauffeur';
import { AnimationQueryMetadata } from '@angular/animations';



@Injectable({
  providedIn: 'root'
})

//this service is used to make restful api call
export class VehiculeService {
  
  serverUrl = 'http://localhost:8888/';

  constructor(private httpClient: HttpClient) { }

   getVehicules(){
    return this.httpClient.get<any>(this.serverUrl+'vehicules');
                            
  }
  


  getDispoVehicules(affectation : AffectationChauffeur ){
    return this.httpClient.post<any>(this.serverUrl+'vehiculesDispo',affectation);
  }

  getNbVehicules(){
    return this.httpClient.get<any>(this.serverUrl+'vehiculesCount');
  }


  getVehiculesByBrand(){
    return this.httpClient.get<any>(this.serverUrl+'vehiculesByBrand');
  }

  getBrokenVehicules(){
    return this.httpClient.get<any>(this.serverUrl+'vehiculesBroken');
  }

  getGlobalCost(){
    return this.httpClient.get<any>(this.serverUrl+'globalCost');
  }
   addVehicule(vehicule: Vehicule): Observable<Object> {
    return this.httpClient.post(this.serverUrl+'vehicules', vehicule);
  }

   updateVehicule(vehicule: Vehicule): Observable<Object> {
    return this.httpClient.put(this.serverUrl+'vehicules',vehicule);
  }

  deleteVehicule(id: number): Observable<any> {
    return this.httpClient.delete(this.serverUrl+'vehicules/'+id, { responseType: 'text' });
  }


 

}
