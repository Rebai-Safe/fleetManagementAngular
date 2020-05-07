import { Chauffeur } from './chauffeur';
import { Vehicule } from './vehicule';

export class AffectationChauffeur{
  
    id_affectation: number ;
    dateDebut : Date;
    dateFin: Date;
    idChauffeur: Chauffeur;
    idVehicule: Vehicule;
 
    constructor(){

    }
}