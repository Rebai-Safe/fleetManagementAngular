import { Component, OnInit, NgZone } from '@angular/core';
import { AffectationChauffeur } from 'src/app/models/affectation-chauffeur';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AffectationChauffeurService } from 'src/app/shared/services/affectation-chauffeur.service';
import { VehiculeService } from 'src/app/shared/services/vehicule.service';
import { ChauffeurService } from 'src/app/shared/services/chauffeur.service';
import { Vehicule } from 'src/app/models/vehicule';
import { Chauffeur } from 'src/app/models/chauffeur';
import { ConfirmBoxComponent } from 'src/app/shared/components/confirm-box/confirm-box.component';

@Component({
  selector: 'app-edit-affectation',
  templateUrl: './edit-affectation.component.html',
  styleUrls: ['./edit-affectation.component.css']
})
export class EditAffectationComponent implements OnInit {

  affectation :AffectationChauffeur;
   //arrays to store dataFlow from the api call and diplay it in html page later//
   vehicules: Array<Vehicule>;
   chauffeurs :Array<Chauffeur>;

  constructor(public dialog: MatDialog,private zone:NgZone,private router:Router,private toastr: ToastrService,private AffectationService:AffectationChauffeurService,private vehiculeService:VehiculeService,private chauffeurService:ChauffeurService) { }

  ngOnInit() {
    //getData from routing
    this.affectation=window.history.state.data;
  }


  getDispo(){
    if(this.affectation.dateDebut != null ){ 
     this.vehiculeService.getDispoVehicules(this.affectation).subscribe(dataFlow => this.vehicules=dataFlow);
    // this.chauffeurService.getDispoChauffeur(this.affectation).subscribe(dataFlow => this.chauffeurs=dataFlow);
     }  
   }


   save() {
    //invoquer le service pour la modification
    this.AffectationService.updateAffetation(this.affectation).
    subscribe(data => console.log(data), error => console.log(error));
    
    //Alert
    this.toastr.success("Modifié avec succées","");
   
  
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
