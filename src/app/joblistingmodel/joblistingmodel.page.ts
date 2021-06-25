import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-joblistingmodel',
  templateUrl: './joblistingmodel.page.html',
  styleUrls: ['./joblistingmodel.page.scss'],
})
export class JoblistingmodelPage implements OnInit {

  jobData:User[]=[];
  jobDataId:any[]=[];
  data:any;
  user:User;
  // designId:Array<string>;
  designId:any[]=[];
  constructor(private nav:NavParams,
              private router:Router,
              private navigate:NavController,
              private modalController:ModalController,
              private apiService:ApiService,
              private storage:StorageService) { 
                this.jobData= this.nav.get('jobData');
                this.jobDataId = this.nav.get('designId');
    console.log(this.jobDataId)
    
  }

  ngOnInit() {
    this.data = this.jobData;
    this.designId = this.jobDataId;
    this.user = this.storage.getUser();
    console.log(this.user)
    console.log(this.designId)
  }

  goBack(){
    this.modalController.dismiss();
  }

  remove(value,index){
    this.data.forEach((element,i)=>{
      console.log(i)
      console.log(value, element)
      if(index == i){
        this.data.splice(i,1);
        this.designId.splice(i,1)
      }
      
    })
  }

  uploadJobs()
  {
    const postData={
      type:this.user.role.type,
      designid:this.designId
    }
    this.apiService.uploadJobs(this.user.id,postData).subscribe((res)=>{
      console.log(res);
      this.modalController.dismiss();
      this.data = '';
      this.designId = [];
    })
  }
}
