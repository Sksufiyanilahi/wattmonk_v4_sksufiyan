import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { DesignModel, activities } from '../model/design.model';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit {
activity_details:any;
designId:Number;


  constructor(private apiservice: ApiService, private route: ActivatedRoute,
    private navController: NavController,private datepipe:DatePipe
    ) {
    this.designId = +this.route.snapshot.paramMap.get('id');    
   }

  ngOnInit() {
 
    this.activityDetail();
    this.apiservice.activityDetails(this.designId).subscribe((response:any)=>{this.activity_details=response;
      console.log(this.activity_details);
      
      if(this.activity_details.deliverydate !==undefined || this.activity_details !==null){
        // this.isDatePassed(this.activity_details.deliverydate);
      }
     });

  }

  activityDetail(){

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

 
  

}
