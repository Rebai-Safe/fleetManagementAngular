import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { AffectationChauffeurService } from 'src/app/shared/services/affectation-chauffeur.service';
import { ConfirmBoxComponent } from 'src/app/shared/components/confirm-box/confirm-box.component';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
 

 //
 displayedColumns: string[] = ['vehicule','chauffeur','datedeb','datefin','actions'];
  
 //
 dataSource=new  MatTableDataSource();

//
 @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;


  constructor(public dialog: MatDialog, private router:Router,private affectationService:AffectationChauffeurService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.reloadData();
      }
    }); 
   }

  ngOnInit() {
  }



  reloadData(){ 
    //we use this method to get all vehicules list and to call it when the list gets modified by the user
    //get remoted data and populate dataSource object 
   
    this.affectationService.getAffectations().subscribe(dataFlow => {
      this.dataSource.data=dataFlow;
      this.dataSource.paginator = this.paginator;
    },
    error => {});
  }


//delete confirmattion
openDialog(id: number): void {
  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    width: '350px',
    data: "Annuler cette Affectation ?"
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log('Annuler cette Affectation');
      this. deleteAffectation(id);
    }
  });
} 


  //call service for deletion
  deleteAffectation(id: number) {
     this.affectationService.deleteAffetation(id)
      .subscribe(
        dataFlow => {
          console.log(dataFlow);
          this.reloadData();
        },
        error => console.log(error));
  }


//uses router service to navigate to editComponent
//state field (introduced since angular 7 ) allows to pass data ( data field of state object) while routing
   
   editAffectation(affectation){
    this.router.navigate(['/editAffectation'],{state:{data:affectation}});
   }


}
