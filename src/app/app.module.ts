import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { AddVehiculeComponent } from './components/vehicule/add-vehicule/add-vehicule.component';
import { ConfirmBoxComponent } from './shared/components/confirm-box/confirm-box.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditVehiculeComponent } from './components/vehicule/edit-vehicule/edit-vehicule.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptorService } from './shared/services/http-error-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { ChauffeurComponent } from './components/chauffeur/chauffeur.component';
import { EditChauffeurComponent } from './components/chauffeur/edit-chauffeur/edit-chauffeur.component';
import { AddChauffeurComponent } from './components/chauffeur/add-chauffeur/add-chauffeur.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { AddAffectationComponent } from './components/affectation/add-affectation/add-affectation.component';
import { EditAffectationComponent } from './components/affectation/edit-affectation/edit-affectation.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { PieChartComponent } from './shared/widgets/pie-chart/pie-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './shared/widgets/card/card.component';

//for date format
export const DateFormats = {
  parse: {
      dateInput: ['YYYY-MM-DD']
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    VehiculeComponent,
    AddVehiculeComponent,
    ConfirmBoxComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainComponent,
    DashboardComponent,
    EditVehiculeComponent,
    LoginComponent,
    ChauffeurComponent,
    EditChauffeurComponent,
    AddChauffeurComponent,
    AffectationComponent,
    AddAffectationComponent,
    EditAffectationComponent,
    PieChartComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    HttpClientModule,
    HighchartsChartModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ConfirmBoxComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true},
    
    /*
    //utliser pour l'authentification
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  */
 { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
 { provide: MAT_DATE_FORMATS, useValue: DateFormats }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
