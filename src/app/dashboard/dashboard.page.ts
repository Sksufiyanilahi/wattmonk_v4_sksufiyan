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
  userId: any;
  count: any={
    isinrevisionstatecount:'',
    putonhold:'',
    unassiigned:'',
    waitingforacceptance:''
  };
  userData: any;

  constructor(private apiService:ApiService,private route: ActivatedRoute,private storage:StorageService) { }

  ngOnInit() {
    this.userId= this.storage.getUserID();
    this.userData= this.storage.getUser();
  //  let data = this.route.snapshot.data.userdata; // get data from resolver
  //  console.log(data);
    //this.getCount();
  }

  ionViewDidEnter()
  {
    this.getCount();
  }

  getCount(){
         this.apiService.getcounts(this.userId).subscribe(res=>{
           this.count= res;
           console.log(this.count);
         })
  }

}
