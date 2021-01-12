import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { NavParams, ModalController, NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../utilities.service';
import { ScheduleFormEvent } from '../model/constants';
import { Intercom } from 'ng-intercom';
import { CouponOffersModalPage } from '../coupon-offers-modal/coupon-offers-modal.page';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
user
id:any
design:any
count:any
netPay:any
  freeDesigns: any;
  servicePrice: any=0;
  settingValue:any=0;
  freeCharges:any;
  value:number=50; 
  coupondata=null;
  code_discount:any
  discount:any
  userData:any;
  uss:any;
   //counts
   isShow:boolean=false
   newpermits: Observable<any>;
   newpermitsRef: AngularFireObject<any>;
   newpermitscount = 0;
   //counts
  newprelims: Observable<any>;
  newprelimsRef: AngularFireObject<any>;
  //newprelimsRef:any;
  newprelimscount = 0;
   
  constructor( private storageService:StorageService,
    
    private apiService:ApiService,
    public router:Router,
    private route:ActivatedRoute,
    private navController:NavController,
    private utils:UtilitiesService,
    private intercom:Intercom,
    private alertController:AlertController,
    private modalController:ModalController,
    private db:AngularFireDatabase,
    private cdr: ChangeDetectorRef
    ) {
      //For Counts
    this.newpermitsRef = db.object('newpermitdesigns');
    this.newpermits = this.newpermitsRef.valueChanges();
    this.newpermits.subscribe(
      (res) => {
        console.log(res);
        this.newpermitscount = res.count;
        cdr.detectChanges();
      },
      (err) => console.log(err),
      () => console.log('done!')
    )
    //counts
    this.newprelimsRef = db.object('newprelimdesigns');
    this.newprelims = this.newprelimsRef.valueChanges();
    this.newprelims.subscribe(
      (res) => {
        console.log(res);
        this.newprelimscount = res.count;
        cdr.detectChanges();
      },
      (err) => console.log(err),
      () => console.log('done!')
    )
     }

  ngOnInit() {
   
   
   this.utils.showLoading("Please wait....").then(()=>{
   
   
   
    this.userData = this.storageService.getUser();
    console.log(this.userData)
    this.utils.showHideIntercom(true);
    this.fetchData();
    this.servicecharges();});
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
   setTimeout(() => {
    this.utils.hideLoading();
    this.isShow=true
    }, 2000);
  
  }
  ionViewDidEnter(){
    this.fetchData();
  }

fetchData(){
  this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
  this.design=params.get('designData')});


  this.apiService.getUserData(this.userData.id).subscribe(res=>{this.user=res;
    console.log(this.user)
    this.apiService.paymentDetail(this.user.id).subscribe(res=>{
      this.count=res;
      console.log(this.count);
      this.servicecharges();
    })});
  

    this.apiService.freeCharges().subscribe(res=>{
      this.freeDesigns=res;
      this.freeDesigns.forEach(element => {
        this.freeCharges = element.settingvalue;
      })
      console.log("daadd",this.freeCharges);
      
    })
   

    console.log(this.id);
   console.log(this.design);
  
  
}
  
discountAmount(){
  if(this.freeCharges>this.count){
    this.discount=this.settingValue;
    this.netPay=this.settingValue-this.discount;
  }
  else if(this.coupondata!=null){
    this.discount=this.code_discount;
    this.netPay=this.settingValue-this.code_discount;
    console.log(this.netPay)
  }
  else{
    this.discount=null;
    this.netPay=this.settingValue;
    console.log(this.netPay)
  }
}

servicecharges(){
  if(this.design=='prelim'){
    this.apiService.prelimCharges().subscribe(res=>{
      this.servicePrice=res;
      this.servicePrice.forEach(element => {
        this.settingValue = element.settingvalue;
      });
      console.log("ddd",this.settingValue)
    })}
    else{
      this.apiService.permitCharges().subscribe(res=>{
        this.servicePrice=res;
        this.servicePrice.forEach(element => {
          this.settingValue = element.settingvalue;
        });
        console.log("ddd",this.settingValue)
      })
    }
    this.discountAmount();
    
}

confirm(){
  if(this.id!=null){
  var postData={};
  var designacceptancestarttime = new Date();
  if(this.design=='prelim'){
  designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
  }
  else{
    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
  }
    postData = {
      outsourcedto: 232,
      isoutsourced: "true",
      status: "outsourced",
      couponid:this.utils.getCouponId().value,
      designacceptancestarttime: designacceptancestarttime
    };
    this.utils.showLoading("Assigning").then(()=>
    {
        this.apiService.updateDesignForm(postData,this.id).subscribe(value=>{
          if(this.design=='prelim')
      {
        this.newprelimsRef.update({ count: this.newprelimscount + 1});
        console.log("hello",this.newprelimscount)
      }else{
        this.newpermitsRef.update({ count: this.newpermitscount + 1});
      }
        this.utils.hideLoading().then(()=>
       { this.utils.showSnackBar("Design request has been send to wattmonk successfully")
       //this.navController.pop();
       if(this.design=='prelim'){
         this.router.navigate(['/homepage/design'])
       this.utils.setHomepageDesignRefresh(true);
       }
       else{
        this.router.navigate(['/permithomepage/permitdesign'])
         this.utils.setHomepagePermitRefresh(true);
       }
       })
      })
      })}
      else{
        if(this.design=='prelim'){
          this.utils.setPaymentMode("wallet");
        this.utils.setScheduleFormEvent(ScheduleFormEvent.PAY_EVENT);
        }
        else{
          this.utils.setPaymentMode("wallet");
          this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_PERMIT_FORM);
        }
      }
}

  addWallet(value){
    
    this.router.navigate(['/add-money',{mode:value,id:this.id,serviceAmount:this.netPay,design:this.design}])
  }

  cancel(){
   
      if(this.design ==='prelim'){
      this.router.navigate(['/homepage/design'])
      this.utils.setHomepageDesignRefresh(true);
      }
      else{
        this.router.navigate(['permithomepage/permitdesign'])
        this.utils.setHomepagePermitRefresh(true);
      }
   
  }
  refreshDesigns(event: CustomEvent) {
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }
    showLoader=false;
    this.fetchData()
  }

  confirmforPostpaid(){
    if(this.id!=null){
      var postData={};
      var designacceptancestarttime = new Date();
      if(this.design=='prelim'){
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
      }
      else{
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
      }
        postData = {
          outsourcedto: 232,
          isoutsourced: "true",
          status: "outsourced",
          designacceptancestarttime: designacceptancestarttime,
          couponid:this.utils.getCouponId().value,
          paymenttype:null
        };
        this.utils.showLoading("Assigning").then(()=>
          {this.apiService.updateDesignForm(postData,this.id).subscribe(value=>{
            this.utils.hideLoading().then(()=>
           { this.utils.showSnackBar("Design request has been send to wattmonk successfully")
           this.navController.pop();
           if(this.design=='prelim'){
           this.utils.setHomepageDesignRefresh(true);
           }
           else{
             this.utils.setHomepagePermitRefresh(true);
           }
           })
          })
          })}
          else{
            if(this.design=='prelim'){
              this.utils.setPaymentMode("null");
            this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
            }
            else{
              this.utils.setPaymentMode("null");
              this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_PERMIT_FORM);
            }
          }
  }

  ionViewWillLeave(){
    this.utils.showHideIntercom(false);
  }


  async Congratulations(){

     const alert = await this.alertController.create({
      cssClass: 'CogratulationalertClass',
       header: 'Congratulations!',
     message:'<div><img src="/assets/images/tick.png"> <span>you got discount of $'+ this.code_discount+'</span></div>',
      // inputs:
      //  [ {name:'comment',
      //  id:'comment',
      //     type:'textarea',
      //   placeholder:'Enter Comment'}
      //   ] ,
      // buttons: [
      //   {
      //     text: 'OK',
      //     role: 'cancel',
      //     cssClass: 'secondary',
      //     handler: (blah) => {
      //       console.log('Confirm Cancel: blah');
      //     }
      //   // }, {
      //   //   text: 'deliver',
      //   //   handler: (alertData) => {
      //   //     var postData= {};
      //   //     if(alertData.comment!=""){
      //   //      postData = {
      //   //       status: "delivered",
      //   //       comments: alertData.comment ,
      //   //        };}
      //   //        else{
      //   //         postData = {
      //   //           status: "delivered",
      //   //            };
      //   //        }
      //   //        console.log(postData);
      //   //       //  this.apiService.updateDesignForm(postData).subscribe((value) => {
      //   //       //   this.utils.hideLoading().then(()=>{
      //   //       //     ;
      //   //       //     console.log('reach ', value);
      //   //       //    this.utils.showSnackBar('Design request has been delivered successfully');

      //   //       //     this.utils.setHomepageDesignRefresh(true);
      //   //       //   })
      //   //       // }, (error) => {
      //   //       //   this.utils.hideLoading();
      //   //       //   ;
      //   //       // });
      //   //   }
      //   }
      // ]
    });

      await alert.present();
      setTimeout(()=>alert.dismiss(),1000);



  }

  codeDiscountCalculation(data,price:number){
  if(data.discounttype=='percentage'){
    console.log(price)
    this.code_discount=(data.amount/100)*price;
  this.code_discount= this.code_discount.toFixed(2);
  this.discountAmount();
    console.log(this.code_discount)
    this.Congratulations();
}
else if(data.discounttype=='amount'){
  this.code_discount=data.amount;
  console.log(this.code_discount)
   this.discountAmount();
   this.Congratulations();
}
  }

   async openModal(){
    const modal = await this.modalController.create({
      component: CouponOffersModalPage,
      cssClass: 'coupon-modal-css',
      componentProps: {
     request:this.design
      },
      backdropDismiss:false
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data.cancel=='cancel'){
      }
      else if(data.data.data!=null){
      this.coupondata=data.data.data;
      console.log(this.coupondata);
      this.utils.setCouponId(this.coupondata.id);
      
      this.codeDiscountCalculation(this.coupondata,this.settingValue);
      }
  });
    // modal.dismiss(() => {
    //   ;
    //   this.getDesigns(null);
    // });
    return await modal.present();
  }


  removeCoupon(){
    this.coupondata=null;
    this.discountAmount();
    this.utils.setCouponId(null);
  }

}
