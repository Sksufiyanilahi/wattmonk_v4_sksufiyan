import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../utilities.service';
import { ScheduleFormEvent } from '../model/constants';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
user:any
id:any
design:any
count:any
  constructor( private storageService:StorageService,
    
    private apiService:ApiService,
    public router:Router,
    private route:ActivatedRoute,
    private navController:NavController,
    private utils:UtilitiesService,
    ) { }

  ngOnInit() {
    
   /* this.apiService.getProfileDetails().subscribe(res=>{this.user=res;
    console.log(this.user)
    this.apiService.paymentDetail(this.user.id).subscribe(res=>{
      this.count=res;
      console.log(this.count);
    })});
    this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
    this.design=params.get('designData')});

    console.log(this.id);
   console.log(this.design);*/
  
  }
  ionViewDidEnter(){
    this.fetchData();
  }

fetchData(){
  this.apiService.getProfileDetails().subscribe(res=>{this.user=res;
    console.log(this.user)
    this.apiService.paymentDetail(this.user.id).subscribe(res=>{
      this.count=res;
      console.log(this.count);
    })});
    this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
    this.design=params.get('designData')});

    console.log(this.id);
   console.log(this.design);
  
}

confirm(){
  if(this.id!=null){
  var postData={};
  var designacceptancestarttime = new Date();
  designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
    postData = {
      outsourcedto: 232,
      isoutsourced: "true",
      status: "outsourced",
      designacceptancestarttime: designacceptancestarttime
    };
    this.utils.showLoading("Assigning").then(()=>
      {this.apiService.updateDesignForm(postData,this.id).subscribe(value=>{
        this.utils.hideLoading().then(()=>
       { this.utils.showSnackBar("Design request has been send to wattmonk successfully")
       this.navController.pop();
       this.utils.setHomepageDesignRefresh(true);
       })
      })
      })}
      else{
        this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
      }
}

  addWallet(value){
    
    this.router.navigate(['/add-money',{mode:value,id:this.id}])
  }

  cancel(){
    this.navController.pop();
  }
  refreshDesigns(event: CustomEvent) {
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }
    showLoader=false;
    this.fetchData()
  }
}
