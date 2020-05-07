import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VehiculeService } from 'src/app/shared/services/vehicule.service';
import { ChauffeurService } from 'src/app/shared/services/chauffeur.service';
import { Chauffeur } from 'src/app/models/chauffeur';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 //Declaration section
 nbVehicules : number;
 nbVehiculesPanne :number;
 globalCost : number;
 nbChauffeurs: number;
 chauffeurs : Array<Chauffeur>;


  constructor(private router:Router,private vehiculeService:VehiculeService,private chauffeurService:ChauffeurService) { 

     //subscribe to routing to load data correctly whenever a route is activated to our component
     router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.reloadData();
      }
    });
  }

  ngOnInit() {
  }
  
  reloadData(){ 

    this.vehiculeService.getNbVehicules().subscribe(data =>
      this.nbVehicules=data);

    this.vehiculeService.getBrokenVehicules().subscribe(data =>
      this.nbVehiculesPanne=data);

    this.vehiculeService.getGlobalCost().subscribe(data=>
      this.globalCost=data);


   this.chauffeurService.getNbChauffeurs().subscribe(data=>
    this.nbChauffeurs=data);



    this.chauffeurService.getExpiredLicence().subscribe(data =>
      this.chauffeurs=data

    );
    
   

  }


  editChauffeur(chauffeur){
    this.router.navigate(['/editChauffeur'],{state:{data:chauffeur}});
  }


}
