import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  waitingforacceptance: any;
  unassigned: any;
  onHold: any;
  revision: any;

  constructor(private apiService:ApiService,private route: ActivatedRoute,private storage:StorageService) { }

  ngOnInit() {
  //  let data = this.route.snapshot.data.userdata; // get data from resolver
  //  console.log(data);
    this.getCount();
  }

  getCount(){

    this.apiService.getDesignSurveys('status=outsourced','','').subscribe((res:any)=>{
      console.log(res);
      this.waitingforacceptance= res.length;
    })
    this.apiService.getDesignSurveys('status=created','','').subscribe((res:any)=>{
      console.log(res);
      this.unassigned= res.length;
    })
    this.apiService.getDesignSurveys('status=requestdeclined','','').subscribe((res:any)=>{
      this.onHold= res.length;
      console.log(res);
    })
    this.apiService.getDesignSurveys('status=outsourced&isinrevisionstate=true','','').subscribe((res:any)=>{
      this.revision = res.length;
      console.log(res);
    })
  }

}
