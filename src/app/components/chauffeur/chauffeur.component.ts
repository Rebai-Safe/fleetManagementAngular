import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { ChauffeurService } from 'src/app/shared/services/chauffeur.service';
import { ConfirmBoxComponent } from 'src/app/shared/components/confirm-box/confirm-box.component';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
}) 
export class ChauffeurComponent implements OnInit {
 
   //displayed columns
   displayedColumns: string[] = ['cin','nom','prenom','dateExpr','actions'];
  
   //bound to data table
   dataSource=new  MatTableDataSource();
 
  //paginator def
   @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;


  constructor(public dialog: MatDialog, private router:Router, private chauffeurService:ChauffeurService) {
 
     //since ngOnint method is executed only once we have to
    //subscribe to routing to load data correctly whenver a route is activated to our component
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.reloadData();
      }
    });

   }

  ngOnInit() {
    
  }


  reloadData(){ 

   
    //get remoted data and populate dataSource object 
    this.chauffeurService.getChauffeurs().subscribe(dataFlow => {
      this.dataSource.data=dataFlow ;
      this.dataSource.paginator = this.paginator;
     
    }, 
      error => {
        
      });
}


//invoque suitable service method
deleteChauffeur(id: number) {
  this.chauffeurService.deleteChauffeur(id)
   .subscribe(
     dataFlow => {
       console.log(dataFlow);
       this.reloadData();
     },
     error => console.log(error));
}



//open dialog method ***---
openDialog(id: number): void {
  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    width: '350px',
    data: "Supprimer ce chauffeur ?"
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log('Yes clicked');
      this.deleteChauffeur(id);
    }
  });
}



 //uses router service to navigate to editComponent
  //state field (introduced since angular 7 ) allows to pass data ( data field of state object) while routing
   
  editChauffeur(chauffeur){
   
    this.router.navigate(['/editChauffeur'],{state:{data:chauffeur}});
  }


}
