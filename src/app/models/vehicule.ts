import { TypeContratAssurance } from './type-contrat-assurance';
import { CompagnieAssurance } from './compagnie-assurance';
import { Etat } from './etat';
import { TypeCarburant } from './type-carburant';
import { TypeBoiteVitesse } from './type-boite-vitesse';
import { Modele } from './modele';

export class Vehicule{


  

    
   ///---***---
    idVehicule :number;
	  immatriculation:String;  
	  dateMiseCirculation:Date;
    dateAcquisition:Date;
    coutAcquisition:number;
    kilometrageActuel:number;
    numeroMoteur:number;
    numeroChassis:number;
    puissance:number;
    poid:number;
    
    
    //---join columns----
    
      idTypeContratAssurance:TypeContratAssurance;
      idEtat: Etat;
      idTypecarburant:TypeCarburant;
      idTypeBoite:TypeBoiteVitesse;
      idModele:Modele;
      idAssurance:CompagnieAssurance;
   
   
    constructor(){
        
    }
}