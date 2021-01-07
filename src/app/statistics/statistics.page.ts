import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Intercom } from 'ng-intercom';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  isSelected:boolean=false;

  constructor(public route: Router,private intercom:Intercom){}

  
  ngOnInit() {
    this.intercom.update({
      "hide_default_launcher": true
    });
    this.isSelected=true;
    this.route.navigate(['statistics/designs']);}
  

  segmentChanged(event){
   
    //if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
    console.log( event);  
    if(event.target.value=='designs'){
        this.route.navigate(['statistics/designs']);
        // return this.segments;
      }
      else if(event.target.value=='designers'){
        this.route.navigate(['statistics/designers']);
        // return this.segments;
      }
      else if(event.target.value=='analysts'){
        this.route.navigate(['statistics/analysts']);
        // return this.segments;
      }
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      // this.intercom.update({
      //   "hide_default_launcher": false
      // });
    }

}
