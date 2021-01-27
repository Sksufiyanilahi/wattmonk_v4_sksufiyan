import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { DesignModel, activities } from '../model/design.model';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { StorageService } from '../storage.service';
import { Intercom } from 'ng-intercom';
import { UtilitiesService } from '../utilities.service';



@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit {
activity_details:any;
designId:any;
  name: string;
  userData:any


  constructor(private apiservice: ApiService, private route: ActivatedRoute,
    private storageService:StorageService,
    private navController: NavController,private datepipe:DatePipe,
    private intercom:Intercom,
    private utilities:UtilitiesService
    ) {
    this.route.paramMap.subscribe( params =>{ this.designId=params.get('id');
  this.name=params.get('name')});
   }

  ngOnInit() {
    this.intercom.update({
      "hide_default_launcher": true
    });
    this.userData = this.storageService.getUser();
    console.log(this.userData);

   this.activitiesList();

  }

  activitiesList(){
    this.utilities.showLoading('Please wait...').then(()=>{
    if(this.name=="design"){
        this.apiservice.design_activityDetails(this.designId).subscribe(response =>{
          this.utilities.hideLoading().then(()=>{
            this.activity_details=response;
          })
       })}
        if(this.name=="survey"){
        this.apiservice.survey_activityDetails(this.designId).subscribe(response =>{
          this.utilities.hideLoading().then(()=>{
            this.activity_details=response;
          })
        });
        }
        if(this.name=="pestamp"){
          this.apiservice.pestamp_activityDetails(this.designId).subscribe(response =>{
            this.utilities.hideLoading().then(()=>{
              this.activity_details=response;
              console.log(this.activity_details)
            })
          });
          }
      })
  }
  
  goBack() {
    this.navController.pop();
  }

  isDatePassed(datestring: string){
    var checkdate = moment(datestring, "YYYYMMDD");
    var todaydate = moment(new Date(), "YYYYMMDD");
    var lateby = todaydate.diff(checkdate, "days");
    if (lateby > 0){
      return lateby;
    }else{
      return false;
    }
  }

  ionViewWillLeave(){
    this.intercom.update({
      "hide_default_launcher": false
    });
  }

 
  

}
