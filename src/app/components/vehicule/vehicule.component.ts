import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Vehicule } from 'src/app/models/vehicule';
import { VehiculeService } from 'src/app/shared/services/vehicule.service';
import { ConfirmBoxComponent } from 'src/app/shared/components/confirm-box/confirm-box.component';
import { Router, NavigationEnd } from '@angular/router';
import { ɵMetadataOverrider } from '@angular/core/testing';


import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent {
 
   //-------mat table columns
  displayedColumns: string[] = ['immatriculation','idModele','idMarque','idEtat','dateAcquisitionAcquisition', 'coutAcquisition', 'idTypeContratAssurance','actions'];
  
  //-----matTableDataSource Object
  dataSource=new  MatTableDataSource();

 //---paginator 
  @ViewChild('paginator', {static:false}) paginator: MatPaginator;

//----Vehicule list to export
  vehiculesList : Array<Vehicule> ;

//constructor Injection
  constructor(private vehiculeService:VehiculeService,public dialog: MatDialog, private router:Router) { 
    
     //since ngOnint method is executed only once we have to
    //subscribe to routing to load data correctly whenver a route is activated to our component
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.reloadData();
      }
    }); 

  
}



  reloadData(){ 
    //we use this method to get all vehicules list and to call it when the list gets modified by the user
      
          /* 
            this method didn't work we had to populate dataSource.data directly from subscribe method 
            this.vehiculeService.getVehicules().subscribe
             (dataFlow => this.vehicules=dataFlow ,
            error => console.log(error) )
             this.dataSource.data=this.vehicules ;
          */
   
    /*get remoted data and populate dataSource object */
    this.vehiculeService.getVehicules().subscribe(dataFlow => {
        this.dataSource.data=dataFlow ;
        this.vehiculesList=dataFlow;
        this.dataSource.paginator = this.paginator;
       
     
        
    }
    ,
    error => {
        
      });

    
  

}

/*
overrideFilter(){
    this.dataSource.filterPredicate = (data : Vehicule, filter) => {
    const dataStr = data.immatriculation;
    console.log("predicate :"+this.dataSource.filterPredicate);
    return (dataStr.indexOf(filter) != -1);

    
}
}*/



 //----filter method
 applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
     console.log("filtring : "+this.dataSource);
}



//delete confirmattion
openDialog(id: number): void {
  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    width: '350px',
    data: "Supprimer ce vehicule ?"
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log('Yes clicked');
      this.deleteVehicule(id);
    }
  });
}


  //call service for deletion
  deleteVehicule(id: number) {
     this.vehiculeService.deleteVehicule(id)
      .subscribe(
        dataFlow => {
          console.log(dataFlow);
          this.reloadData();
        },
        error => console.log(error));
  }


 


  


  //uses router service to navigate to editComponent
  //state field (introduced since angular 7 ) allows to pass data ( data field of state object) while routing
   
  editVehicule(vehicule){
   this.router.navigate(['/editVehicule'],{state:{data:vehicule}});
  }


 //--export list
  downloadPdf() {
    var content=[];
     this.vehiculesList.forEach((v: Vehicule)=>{
      var tempObj =[];
      tempObj.push(v.immatriculation);
      tempObj.push(v.dateMiseCirculation);
      tempObj.push(v.dateAcquisition);
      tempObj.push(v.coutAcquisition);
      tempObj.push(v.numeroMoteur);
      tempObj.push(v.puissance);
     
     /* tempObj.push(v.idTypeContratAssurance.libelle_assurance);
      tempObj.push(v.idEtat.libelleEtat);
      tempObj.push(v.idAssurance.libelleAssurance);
      tempObj.push(v.idModele.idMarque.libelleMarque);
     */

      
   content.push(tempObj);


    })
    /*,'Type Contrat','Etat','Compagnie','Marque'*/
    const doc = new jsPDF();
    doc.autoTable({
        head: [['Matricule','Date MEC','Date Acquisition','cout Acquisition','numero Moteur','puissance']],
        body: content
    });
    doc.save('Vehicules_List' + '.pdf');
  }
    }





