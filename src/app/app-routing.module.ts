import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { AddVehiculeComponent } from './components/vehicule/add-vehicule/add-vehicule.component';
import { EditVehiculeComponent } from './components/vehicule/edit-vehicule/edit-vehicule.component';
import { LoginComponent } from './components/login/login.component';
import { ChauffeurComponent } from './components/chauffeur/chauffeur.component';
import { AddChauffeurComponent } from './components/chauffeur/add-chauffeur/add-chauffeur.component';
import { EditChauffeurComponent } from './components/chauffeur/edit-chauffeur/edit-chauffeur.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { AddAffectationComponent } from './components/affectation/add-affectation/add-affectation.component';
import { EditAffectationComponent } from './components/affectation/edit-affectation/edit-affectation.component';

//main layout is the very first component to see atfer logging
//it's child by default is dashboardComponent
const routes: Routes = [

 
  
  //main path 
  {
    path:'',component:MainComponent,
  //nested routing
  children:[{
    path:'',
    component:DashboardComponent
  },
  //crud vehicule routing
  {
    //path doesn't start with a slash
    path:'vehicules',
    component:VehiculeComponent
  },{
    path:'ajouterVehicule',
    component:AddVehiculeComponent
  },{
    path:'editVehicule',
    component:EditVehiculeComponent
  },
  //chauffeurs crud routing
  {
    path:'chauffeurs',
    component:ChauffeurComponent
  },{
    path:'ajouterChauffeur',
    component:AddChauffeurComponent
  },
  {
    path:'editChauffeur',
    component:EditChauffeurComponent
  },
    
  //affectation crud routing
  {
    path:'affectations',
    component:AffectationComponent
  },{
    path:'ajouterAffectation',
    component:AddAffectationComponent
  },
  {
    path:'editAffectation',
    component:EditAffectationComponent
  },




]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
