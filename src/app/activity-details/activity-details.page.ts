import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { DesignModel, activities } from '../model/design.model';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit {
activity_details:{}
designId;
name;

  constructor(private apiservice: ApiService, private route: ActivatedRoute,
    private navController: NavController
    ) {
    this.route.paramMap.subscribe( params =>{ this.designId=params.get('id');
  this.name=params.get('name')});
   }

  ngOnInit() {
    if(this.name=="design"){
           this.apiservice.design_activityDetails(this.designId).subscribe(response =>{this.activity_details=response;
  ;
  
     console.log("inside this",this.activity_details);});}
    if(this.name=="survey"){
      this.apiservice.survey_activityDetails(this.designId).subscribe(response =>{this.activity_details=response;
        ;
        
           console.log("inside this",this.activity_details);});
    }

  }
  
  goBack() {
    this.navController.pop();
  }

}
