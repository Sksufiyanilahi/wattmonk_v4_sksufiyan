import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Intercom } from 'ng-intercom';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-statsoverviewdetails',
  templateUrl: './statsoverviewdetails.page.html',
  styleUrls: ['./statsoverviewdetails.page.scss'],
})
export class StatsoverviewdetailsPage implements OnInit {

  startDate:any;
  endDate:any;
  requestType:any;
  dataList:any;
  id:any;
  name:any;
  constructor(
    private apiService:ApiService,
    private storageService:StorageService,
    private utils:UtilitiesService,
    private router:Router,
    private route:ActivatedRoute ,
    private formBuilder:FormBuilder,
    private navController:NavController,
    private intercom:Intercom
  ) { }

  ngOnInit() {
    this.intercom.update({
      "hide_default_launcher": true
    });
    this.startDate = this.route.snapshot.paramMap.get('starttime');
    this.endDate = this.route.snapshot.paramMap.get('endtime');
    this.requestType = this.route.snapshot.paramMap.get('requesttype');
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    console.log(this.id);
    console.log(this.name)
    if(this.name==='designer')
    {
    this.getDesignerDesigns();
    }
    else if(this.name==='analyst')
    {
      this.getAnalystDesigns();
    }
    // console.log(this.requestType)
  }


  getDesignerDesigns(){
    this.apiService.getDesignerDesignsForStats(this.startDate,this.endDate,this.requestType,this.id).subscribe(response => {
      this.dataList = response;
      console.log(this.dataList);
    })
  }

  getAnalystDesigns(){
    this.apiService.getAnalystDesignsForStats(this.startDate, this.endDate, this.requestType, this.id).subscribe(response =>{
      this.dataList = response;
      console.log(this.dataList);
    })
  }

  ionViewWillLeave(){
    this.intercom.update({
      "hide_default_launcher": false
    });
  }
}
