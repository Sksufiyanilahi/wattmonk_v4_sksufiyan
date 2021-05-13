import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-design-tracker',
  templateUrl: './design-tracker.page.html',
  styleUrls: ['./design-tracker.page.scss'],
})
export class DesignTrackerPage implements OnInit {
  @ViewChild('barChart') barChart;
  @ViewChild("doughnutCanvas") doughnutCanvas;
  

  // private barChart: Chart;
   slideOpts = {
    slidesPerView: 1,
    initialSlide: 1,
    speed: 400
  }
  month: boolean = true;
  year: boolean = false;
  bars: any;
  Doughs:any
  colorArray: any;

  constructor( private router:Router,) { }

  

  ngOnInit() {
    
    

  }

  ToogleMonth(){
    this.month=true;
    this.year = false;
    
  }

  ToogleYear(){
    this.year = true;
    this.month= false;
  }

  ionViewDidEnter() {
    this.createBarChart();
    this.createDoughChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['2018', '2019','2020','2021'],
        datasets: [{
          barPercentage: 0.8,
          barThickness: 27.5,
          stack:'base',
          label: 'Work Analytics',
          data: [400, 600, 250,800],
          backgroundColor: '#EDC773', // array should have same number of elements as number of dataset
          borderColor: '#EDC773',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
             
            }
          }]
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            font: {
              size: 10,
            }
          }
        }
      }
    });
  }

  createDoughChart(){
    this.Doughs = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5],
            backgroundColor: [
              "rgba(255, 206, 86, 0.2)",
              "rgb(252, 235, 182,0.2)",
              "rgb(255, 165, 91,0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: [ "#FFCE56", "#EDC773", "#fcad80", "#FFCE56"]
          }
        ]
      }
    });
  }
  

  
}

  


