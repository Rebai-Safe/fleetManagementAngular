import { Component, OnInit, NgZone } from '@angular/core';
import { Vehicule } from 'src/app/models/vehicule';
import { Etat } from 'src/app/models/etat';
import { CompagnieAssurance } from 'src/app/models/compagnie-assurance';
import { Marque } from 'src/app/models/marque';
import { Modele } from 'src/app/models/modele';
import { TypeBoiteVitesse } from 'src/app/models/type-boite-vitesse';
import { TypeCarburant } from 'src/app/models/type-carburant';
import { TypeContratAssurance } from 'src/app/models/type-contrat-assurance';
import { VehiculeService } from 'src/app/shared/services/vehicule.service';
import { EtatService } from 'src/app/shared/services/etat.service';
import { CompagnieAssuranceService } from 'src/app/shared/services/compagnie-assurance.service';
import { MarqueService } from 'src/app/shared/services/marque.service';
import { ModeleService } from 'src/app/shared/services/modele.service';
import { TypeBoiteVitesseService } from 'src/app/shared/services/type-boite-vitesse.service';
import { TypeCarburantService } from 'src/app/shared/services/type-carburant.service';
import { TypeContratAssuranceService } from 'src/app/shared/services/type-contrat-assurance.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'src/app/shared/components/confirm-box/confirm-box.component';

@Component({
  selector: 'app-edit-vehicule',
  templateUrl: './edit-vehicule.component.html',
  styleUrls: ['./edit-vehicule.component.css']
})
export class EditVehiculeComponent implements OnInit {

  marque : Marque;
 vehicule:Vehicule;




//arrays to store dataFlow from the api call and diplay it in html page later//
 //--start declarartion --//
 etatsVehicule: Array<Etat>;
 compagniesAssurance :Array<CompagnieAssurance>;
 marquesVehicule:Array<Marque>;
 modelesVehicule:Array<Modele>;
 typesBoite:Array<TypeBoiteVitesse>;
 typescarburant:Array<TypeCarburant>;
 typesContratAssurance:Array<TypeContratAssurance>;
 //--end declarartion --//


 

//service injections
  constructor(public dialog: MatDialog,private zone:NgZone,private vehiculeService:VehiculeService, private etatService:EtatService,
    private compagnieAssuranceService:CompagnieAssuranceService,private marqueService:MarqueService,private modeleService:ModeleService,
    private typeBoiteService:TypeBoiteVitesseService,private typeCarburantService:TypeCarburantService,private typeContratService:TypeContratAssuranceService,
    private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.vehicule=window.history.state.data;



     //---appel au differentes services pour l'obtention des données---//
    //--obtenir la liste des etats
    this.etatService.getEtats().subscribe(dataFlow => this.etatsVehicule=dataFlow);
    //--obtenir la liste des compagnies
    this.compagnieAssuranceService.getCompagnies().subscribe(data => this.compagniesAssurance=data);
     //--obtenir la liste des marques
     this.marqueService.getMarques().subscribe(data => this.marquesVehicule=data );
    
    
     //--obtenir la liste des types boites vitesse
     this.typeBoiteService.getTypeBoitesVitesses().subscribe(data => this.typesBoite=data);
     //--obtenir la liste des types carburants
     this.typeCarburantService.getTypeCarburants().subscribe(data => this.typescarburant=data);
     //--obtenir la liste des types contrat d'assurance
     this.typeContratService.getTypeContratAssurance().subscribe(data=> this.typesContratAssurance=data );
  }

 
   //--asign the selected etat to idEtat field of vehicule Object
   selectEtat(etat:Etat){
    this.vehicule.idEtat=etat;
     
  }

  //--asign the selected 
  selectCompagnie(compagnie:CompagnieAssurance){
    this.vehicule.idAssurance=compagnie;
    
  }
    //--asign the selected 
    selectModele(modele:Modele){
      this.vehicule.idModele=modele;
      this.vehicule.idModele.idMarque=this.marque;
      }

  //--asign the selected 
  selectBoiteVitesse(boiteVitesse:TypeBoiteVitesse){
    this.vehicule.idTypeBoite=boiteVitesse;
    
}
 
//--asign the selected 
 selectCarburant(typeCarburant:TypeCarburant){
  this.vehicule.idTypecarburant=typeCarburant;
  
}


//--asign the selected 
selectContrat(typeContrat:TypeContratAssurance){
  this.vehicule.idTypeContratAssurance=typeContrat;
  
}

//get modeles of a marque
getModeles(marqueVehicule:Marque){
  
  //--obtenir la liste des modeles adequat
   this.modeleService.getModelesBymarques(marqueVehicule.idMarque).subscribe(data => this.modelesVehicule=data );

}




//add method

save() {
  //invoquer le service pour l'ajout
  this.vehiculeService.updateVehicule(this.vehicule).
  subscribe(data => {
       //Alert
       this.toastr.success("Modifié avec succées","");
       //goto list
       this.router.navigate(['/vehicules']);
 }
  
  , error => console.log(error));
  
}


annuler(): void {
  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    width: '350px',
    data: "Annuler l'opération ?"
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
       //si annulation confirmé
      this.zone.run(()=>this.router.navigateByUrl('/vehicules'));
   
    }
  });
}

}
