import { Component, OnInit, NgZone } from '@angular/core';
import { AffectationChauffeur } from 'src/app/models/affectation-chauffeur';
import { Chauffeur } from 'src/app/models/chauffeur';
import { Vehicule } from 'src/app/models/vehicule';
import { VehiculeService } from 'src/app/shared/services/vehicule.service';
import { ChauffeurService } from 'src/app/shared/services/chauffeur.service';
import { AffectationChauffeurService } from 'src/app/shared/services/affectation-chauffeur.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'src/app/shared/components/confirm-box/confirm-box.component';

@Component({
  selector: 'app-add-affectation',
  templateUrl: './add-affectation.component.html',
  styleUrls: ['./add-affectation.component.css']
})
export class AddAffectationComponent implements OnInit {
 
  affectation = new AffectationChauffeur();


 //arrays to store dataFlow from the api call and diplay it in html page later//
  vehicules: Array<Vehicule>;
  chauffeurs :Array<Chauffeur>;
 

  constructor(public dialog: MatDialog,private zone:NgZone,private router:Router,private toastr: ToastrService,private AffectationService:AffectationChauffeurService,private vehiculeService:VehiculeService,private chauffeurService:ChauffeurService) { }

  ngOnInit() {
   
    
 
    
  
  }



   getDispo(){
   if(this.affectation.dateDebut != null ){ 
    this.vehiculeService.getDispoVehicules(this.affectation).subscribe(dataFlow => this.vehicules=dataFlow);
   // this.chauffeurService.getDispoChauffeur(this.affectation).subscribe(dataFlow => this.chauffeurs=dataFlow);
    }  
  }

/*
  selectVehicule(vehicule){
    this.affectation.idVehicule=vehicule;
  }

  selectChauffeur(chauffeur){
    this.affectation.idChauffeur=chauffeur;
  }
*/

//add method

add() {
  //invoquer le service pour l'ajout
  this.AffectationService.addAffetation(this.affectation).
  subscribe(data => console.log(data), error => console.log(error));
  
  //Alert
  this.toastr.success("Ajouté avec succées","");
 

 //redirection vers la page d'affichage
 this.zone.run(()=>this.router.navigateByUrl('/affectations'));


}

annuler(): void {
  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    width: '350px',
    data: "Annuler l'opération ?"
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
       //si annulation confirmé
      this.zone.run(()=>this.router.navigateByUrl('/affectations'));
   
    }
  });
}


}
