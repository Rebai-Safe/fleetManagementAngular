import { Component, OnInit, NgZone } from '@angular/core';
import { ChauffeurService } from 'src/app/shared/services/chauffeur.service';
import { Chauffeur } from 'src/app/models/chauffeur';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { ConfirmBoxComponent } from 'src/app/shared/components/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.css']
})
export class AddChauffeurComponent implements OnInit {

//var declaration
chauffeurs : Chauffeur[];
chauffeur : Chauffeur = new Chauffeur();
minDate = new Date(); //attribute for datemin validation 



//constructor injection
constructor(public dialog: MatDialog,private chauffeurService:ChauffeurService,private toastr: ToastrService
    ,private zone:NgZone, private router:Router) { 

      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.reloadData();
        }
      });
    
    }

  ngOnInit() {
  }

  reloadData(){ 

   
    //get remoted data and populate chauffeurs list 
    this.chauffeurService.getChauffeurs().subscribe(dataFlow => {
     this.chauffeurs = dataFlow;
     
    }, 
      error => {
        
      });
}

exist(cin:number):Boolean{
 
 


   for(let i=0; i<this.chauffeurs.length; i++){
    if(this.chauffeurs[i].cin == cin )
     return true;
}

 return false;
 

}

//add method
add() {

    if(this.exist(this.chauffeur.cin) == true){
      this.toastr.error("Ce chauffeur existe déja","");
    }

 else {   
  //invoquer le service pour l'ajout
  this.chauffeurService.addChauffeur(this.chauffeur).
  subscribe(data => {
    
    
     //Alert
  this.toastr.success("Ajouté avec succées","");
   //redirection vers la page d'affichage
  this.zone.run(()=>this.router.navigateByUrl('/chauffeurs'));
    console.log(data)
  }
  , 
  
  error => console.log(error));
  
}
}


//annulation et ouverture de confirmation
   
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
