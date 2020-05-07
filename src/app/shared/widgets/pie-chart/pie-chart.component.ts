import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { VehiculeService } from '../../services/vehicule.service';
import { VehiculeByBrand } from 'src/app/models/vehiculeByBrand';
import { Router, NavigationEnd } from '@angular/router';
import { DataItem } from 'src/app/models/dataItem';
HC_exporting(Highcharts);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: any;
  vehiculesByBrand : VehiculeByBrand[];
  dataItems : DataItem[];
  
  


  constructor(private router:Router,private vehiculeService:VehiculeService) { 
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.initPie();
        }
      });
    }
 

  reloadData(){ 
 
    
 this.vehiculeService.getVehiculesByBrand().subscribe(dataFlow => {
 this.vehiculesByBrand=dataFlow;

 for(let i=0;i<this.vehiculesByBrand.length;i++){
     let  data = new DataItem;
     data.name=this.vehiculesByBrand[i].libelleMarque;
     data.y=this.vehiculesByBrand[i].nombre;
     this.dataItems.push(data);
}

}
);

}

initPie(){
    this.chartOptions =   {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Répartition du parc suivant les marques'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
exporting: {
  enabled:true
},
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [ {
              name: 'Toyota',
              y: 50,
              sliced: true,
              selected: true
          }, {
              name: 'Peugeot',
              y: 50
          }]
        }]



  };
  

    
      HC_exporting(Highcharts);
    
      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
}

  ngOnInit() {
   
}




}

