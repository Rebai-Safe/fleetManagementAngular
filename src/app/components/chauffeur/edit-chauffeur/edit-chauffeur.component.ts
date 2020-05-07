import { Component, OnInit, NgZone } from '@angular/core';
import { Chauffeur } from 'src/app/models/chauffeur';
import { ChauffeurService } from 'src/app/shared/services/chauffeur.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'src/app/shared/components/confirm-box/confirm-box.component';

@Component({
  selector: 'app-edit-chauffeur',
  templateUrl: './edit-chauffeur.component.html',
  styleUrls: ['./edit-chauffeur.component.css']
})
export class EditChauffeurComponent implements OnInit {
 
  chauffeur: Chauffeur;
  
 
  constructor(private zone:NgZone, public dialog: MatDialog,private  chauffeurService:ChauffeurService, private router:Router,private toastr: ToastrService) { }
 
  ngOnInit() {
    //getData from routing
    this.chauffeur=window.history.state.data;
  }




  save() {
    //invoquer le service pour l'ajout
    this.chauffeurService.updateChauffeur(this.chauffeur).
    subscribe(data => {
      //Alert
      this.toastr.success("Modifié avec succées","");
      //goto list
      this.router.navigate(['/chauffeurs']);
     
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
      this.zone.run(()=>this.router.navigateByUrl('/chauffeurs'));
   
    }
  });
}

}