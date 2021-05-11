import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-design-tracker',
  templateUrl: './design-tracker.page.html',
  styleUrls: ['./design-tracker.page.scss'],
})
export class DesignTrackerPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private barChart: Chart;
   slideOpts = {
    slidesPerView: 1,
    initialSlide: 1,
    speed: 400
  }
  month: boolean = true;
  year: boolean = false;

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
    this.router.navigate(["/design-tracker/monthly-status"])
  }

  

}
