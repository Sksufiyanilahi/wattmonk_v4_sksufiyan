
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { NavParams, ModalController, NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { UtilitiesService } from '../utilities.service';
import { ScheduleFormEvent } from '../model/constants';
import { CouponOffersModalPage } from '../coupon-offers-modal/coupon-offers-modal.page';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { DesginDataModel } from '../model/design.model';
import { ThemeService } from 'ng2-charts';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
public payPalConfig ? : IPayPalConfig;
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
   isradiodisable:boolean=false
   newpermits: Observable<any>;
   newpermitsRef: AngularFireObject<any>;
   newpermitscount = 0;
   //counts
  newprelims: Observable<any>;
  newprelimsRef: AngularFireObject<any>;
  //newprelimsRef:any;
  newprelimscount = 0;
  designData:any;
  fulldesigndata: any;
  delivertime:String;
  designType:any;
  wattmonkadmins: any;
  clientadmins: any;
  Servicecharges: AngularFireObject<any>;
  servicechargedata: Observable<any>;


  constructor( private storageService:StorageService,

    private apiService:ApiService,
    public router:Router,
    private route:ActivatedRoute,
    private navController:NavController,
    private utils:UtilitiesService,
    private alertController:AlertController,
    private modalController:ModalController,
    private db:AngularFireDatabase,
    private cdr: ChangeDetectorRef
    ) {
      // this.designData = this.router.getCurrentNavigation().extras.state;
      // this.id = this.designData.productdetails.queryParams.id;
      // this.design = this.designData.productdetails.queryParams.designData;
      //For Counts
      this.designData = this.router.getCurrentNavigation().extras.state;
      this.id = this.designData.productdetails.queryParams.id;
      this.design = this.designData.productdetails.queryParams.designData;
      this.fulldesigndata = this.designData.productdetails.queryParams.fulldesigndata;
      this.designType = this.designData.productdetails.queryParams.designType;

      this.Servicecharges = db.object("service_charges");
      this.servicechargedata = this.Servicecharges.valueChanges()
      this.servicechargedata.subscribe(
       (res) => {
       
         if(this.fulldesigndata.requesttype=='permit'){
          if (this.fulldesigndata.projecttype == 'residential') {
            if (this.fulldesigndata.jobtype == 'pv') {
              this.settingValue = res.permit_pv_residential.price
              this.delivertime = res.permit_pv_residential.turnaroundtime
              this.discountAmount()
            }
            else if (this.fulldesigndata.jobtype == 'battery') {
              this.settingValue = res.permit_battery_residential.price
              this.delivertime = res.permit_battery_residential.turnaroundtime
              this.discountAmount()
            }
            else if (this.fulldesigndata.jobtype == 'pvbattery') {
              this.settingValue = res.permit_pvbattery_residential.price
              this.delivertime = res.permit_pvbattery_residential.turnaroundtime
              this.discountAmount()
            }
          }
          else if (this.fulldesigndata.projecttype == 'commercial' || this.fulldesigndata.projecttype == 'detachedbuildingorshop' || this.fulldesigndata.projecttype == 'carport') {
            let solarCapcity = this.fulldesigndata.monthlybill / 1150
            if (solarCapcity > 0 && solarCapcity <= 49) {
              this.settingValue = res.permit_0_49commercial.price
              this.delivertime = res.permit_0_49commercial.turnaroundtime
              this.discountAmount()
            }
            else if (solarCapcity > 49 && solarCapcity <= 99) {
              this.settingValue= res.permit_50_99commercial.price
              this.delivertime = res.permit_50_99commercial.turnaroundtime
              this.discountAmount()
            }
            else if (solarCapcity > 99 && solarCapcity <= 199) {
              this.settingValue = res.permit_100_199commercial.price
              this.delivertime = res.permit_100_199commercial.turnaroundtime
              this.discountAmount()
            }
            else if (solarCapcity > 199 && solarCapcity <= 299) {
              this.settingValue = res.permit_200_299commercial.price
              this.delivertime = res.permit_200_299commercial.turnaroundtime
              this.discountAmount()
            }
            else if (solarCapcity > 299) {
              this.settingValue = res.permit_200_299commercial.price
              this.delivertime = res.permit_200_299commercial.turnaroundtime
              this.discountAmount()
              for (let i = 300; i <= solarCapcity; i = i + 100) {
                this.settingValue += res.permit_above_299_commercial.price
              }
            }
          }
      
        }
      else if(this.fulldesigndata.requesttype=='prelim')
    {
      if(this.fulldesigndata.requirementtype=='proposal' && this.fulldesigndata.projecttype=='residential'){
        this.settingValue = res.proposal_residential.price
      }
      else if(this.fulldesigndata.requirementtype=='assessment' && this.fulldesigndata.projecttype=='residential'){
        this.settingValue = res.assessment_residential.price
      }
      else if(this.fulldesigndata.requirementtype=='proposal' && (this.fulldesigndata.projecttype=='commercial' || this.fulldesigndata.projecttype =='detachedbuildingorshop' || this.fulldesigndata.projecttype =='carport')){
        let solarCapcity = this.fulldesigndata.monthlybill/1150
        if(solarCapcity>0 && solarCapcity<=49){
          this.settingValue = res.proposal_0_49commercial.price
        }
        else if(solarCapcity>49 && solarCapcity<=99){
          this.settingValue = res.proposal_50_99commercial.price
        }
        else if(solarCapcity>99 && solarCapcity<=199){
          this.settingValue = res.proposal_100_199commercial.price
        }
        else if(solarCapcity>199 && solarCapcity<=299){
          this.settingValue = res.proposal_200_299commercial.price
        }
        else if(solarCapcity>299){
          this.settingValue = res.proposal_200_299commercial.price
          for(let i =300; i<=solarCapcity;i=i+100){
            this.settingValue += res.proposal_above_299_commercial.price
          }
        }
      }
      else if(this.fulldesigndata.requirementtype=='assessment' && (this.fulldesigndata.projecttype=='commercial' || this.fulldesigndata.projecttype =='detachedbuildingorshop' || this.fulldesigndata.projecttype =='carport')){
        let solarCapcity = this.fulldesigndata.monthlybill/1150
        if(solarCapcity>0 && solarCapcity<=49){
          this.settingValue= res.assessment_0_49commercial.price
        }
        else if(solarCapcity>49 && solarCapcity<=99){
          this.settingValue = res.assessment_50_99commercial.price
        }
        else if(solarCapcity>99 && solarCapcity<=199){
          this.settingValue = res.assessment_100_199commercial.price
        }
        else if(solarCapcity>199 && solarCapcity<=299){
          this.settingValue = res.assessment_200_299commercial.price
        }
        else if(solarCapcity>299){
          this.settingValue = res.assessment_200_299commercial.price
          for(let i =300; i<=solarCapcity;i=i+100){
            this.settingValue += res.assessment_above_299_commercial.price
          }
        }
      }
    
     
    }}
       ,
       (err) => console.log(err),
       () => console.log("done!")
      );

    this.newpermitsRef = db.object('newpermitdesigns');
    this.newpermits = this.newpermitsRef.valueChanges();
    this.newpermits.subscribe(
      (res) => {
        this.newpermitscount = res.count;
        this.cdr.detectChanges();
      },
      (err) => console.log(err),
      () => console.log('done!')
    )
    //counts
    this.newprelimsRef = db.object('newprelimdesigns');
    this.newprelims = this.newprelimsRef.valueChanges();
    this.newprelims.subscribe(
      (res) => {
        this.newprelimscount = res.count;
        this.cdr.detectChanges();
      },
      (err) => console.log(err),
      () => console.log('done!')
    )
    this.paypalintegration()
     }

  ngOnInit() {


   this.utils.showLoading("Please wait....").then(()=>{



    this.userData = this.storageService.getUser();
    this.fetchData();
   
    // this.servicecharges();
  });
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
    }, 3000);



  }
  ionViewDidEnter(){
    this.fetchData();
  
  }

  ionViewDidLeave(){
    this.utils.setCouponId(null);
  }

fetchData(){
  // this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
  // this.design=params.get('designData')});
  // const navigation = this.router.getCurrentNavigation()
  // console.log(navigation)
  // console.log(this.router.getCurrentNavigation().extras.state)

// this.isradiodisable=false

  this.apiService.getUserData(this.userData.id).subscribe(res=>{this.user=res;
   
    this.apiService.paymentDetail(this.user.parent.id).subscribe(res=>{
      this.count=res;
      // this.servicecharges();
    })})


    this.apiService.freeCharges().subscribe(res=>{
      this.freeDesigns=res;
      this.freeDesigns.forEach(element => {
        this.freeCharges = element.settingvalue;
      })

    })

    this.apiService.getadmins().subscribe(res=>{
      this.wattmonkadmins=res;
    
    })
    this.apiService.getclientadmins(this.userData.id).subscribe(res=>{
     
      this.clientadmins=res

    })

}

discountAmount(){
  
  if(this.freeCharges>this.count){
    this.discount=this.settingValue;
    this.netPay=this.settingValue-this.discount;
    
  }
  else if(this.coupondata!=null){
    if(this.design=='prelim'){
    this.discount=this.code_discount;
    this.netPay=(this.settingValue-this.code_discount).toFixed(2);
    
  }
    if(this.design=='permit'){
      this.discount=this.code_discount;
      this.netPay=(this.netPay-this.discount).toFixed(2);
     
    }
  }
  else{
    if(this.design=='prelim'){
    this.discount=null;
    this.netPay=this.settingValue;
    
    }

    if(this.design=='permit'){
      this.netPay=this.settingValue;
     this.discount=0;
     
    }
  }
}

// servicecharges(){
//   if(this.design=='prelim' && this.fulldesigndata.requirementtype=="assessment"){
//     this.apiService.prelimCharges().subscribe(res=>{
//       this.servicePrice=res;
//       this.servicePrice.forEach(element => {
//         this.settingValue = element.settingvalue;
//       });
//       this.discountAmount();
//     })}
//     else if(this.design=='prelim' && this.fulldesigndata.requirementtype == "proposal")
//     {
//       this.apiService.prelimSalesCharges().subscribe(res=>{
//         this.servicePrice=res;
//         this.servicePrice.forEach(element => {
//           this.settingValue = element.settingvalue;
//         });

//         this.discountAmount();
//       })
//     }
//     else{
//       var postData={
//         userparentid:this.user.parent.id,
//         timeslab:this.delivertime
//       }
//       this.apiService.permitCharges(postData).subscribe(res=>{
//         this.servicePrice=res;
//        this.settingValue=this.servicePrice.servicecharge


//         if(this.servicePrice.freedesign==true){
//           this.delivertime="6-12";
//           this.discount=this.servicePrice.slabdiscount;
//           this.netPay=0
//           this.isradiodisable=true
//         }else{
//           this.delivertime=this.servicePrice.slabname;
//           this.netPay=this.servicePrice.paymentamount;
//           this.discount=this.servicePrice.slabdiscount;
//           this.isradiodisable=false
//         }

//       })
//     }


// }

confirm(){
  if(this.id!=null){
  var postData={};
  var designacceptancestarttime = new Date();
  if(this.design=='prelim'){
  designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
  postData = {
    outsourcedto: 232,
    isoutsourced: "true",
    status: "outsourced",
    couponid:this.utils.getCouponId().value,
    designacceptancestarttime: designacceptancestarttime,
    paymenttype:"wallet",
    amount:Number(this.netPay),
    serviceamount:this.settingValue,
    paymentstatus:null
  };
  }
  else{
    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
    postData = {
      outsourcedto: 232,
      isoutsourced: "true",
      status: "outsourced",
      couponid:this.utils.getCouponId().value,
      designacceptancestarttime: designacceptancestarttime,
      slabname:this.delivertime,
      slabdiscount:this.servicePrice.slabdiscount,
      serviceamount:this.servicePrice.paymentamount,
      amount:Number(this.netPay),
      paymenttype:"wallet",
      paymentstatus:null
    };
  }

    this.utils.showLoading("Assigning").then(()=>
    {
        this.apiService.updateDesignForm(postData,this.id).subscribe(value=>{
          if(this.design=='prelim')
      {
        this.createChatGroup(value);
        this.newprelimsRef.update({ count: this.newprelimscount + 1});
      }else{
        this.createChatGroup(value);
        this.newpermitsRef.update({ count: this.newpermitscount + 1});
      }
        this.utils.hideLoading().then(()=>
       { this.utils.showSnackBar("Design request has been send to WattMonk successfully")
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

    //this.router.navigate(['/add-money',{mode:value,id:this.id,serviceAmount:this.netPay,design:this.design}])
    let objToSend: NavigationExtras = {
      queryParams: {
        mode:value,
        id:this.id,
        serviceAmount:this.netPay,
        design:this.design,
        fulldesigndata:this.fulldesigndata,
        slabname:this.delivertime,
        slabdiscount:this.servicePrice.slabdiscount,
        serviceinitialamount:this.servicePrice.paymentamount
      },
      skipLocationChange: false,
      fragment: 'top'
  };


  this.router.navigate(['/add-money'], {
  state: { productdetails: objToSend }
  });
  }

  cancel(){

      if(this.design ==='prelim'){
      this.router.navigate(['/homepage/design'])
      this.utils.setHomepageDesignRefresh(true);

      }
      else if(this.design==='permit'){
        this.router.navigate(['/permithomepage/permitdesign'])
        this.utils.setHomepagePermitRefresh(true);
      }

  }
  refreshDesigns(event) {
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
      postData = {
        outsourcedto: 232,
        isoutsourced: "true",
        status: "outsourced",
        designacceptancestarttime: designacceptancestarttime,
        couponid:this.utils.getCouponId().value,
        paymenttype:null,

      };
      }
      else{
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
        postData = {
          outsourcedto: 232,
          isoutsourced: "true",
          status: "outsourced",
          designacceptancestarttime: designacceptancestarttime,
          couponid:this.utils.getCouponId().value,
          paymenttype:null,
          slabname:this.delivertime,
          serviceamount:this.settingValue,
          amount:Number(this.netPay)
         
        };
      }

        this.utils.showLoading("Assigning").then(()=>
          {this.apiService.updateDesignForm(postData,this.id).subscribe(value=>{
            this.utils.hideLoading().then(()=>
           { this.utils.showSnackBar("Design request has been send to WattMonk successfully")
           this.navController.pop();
           if(this.design=='prelim'){
             this.createChatGroup(this.design);
            this.router.navigate(['/homepage/design'])
           this.utils.setHomepageDesignRefresh(true);
           }
           else{
            this.createChatGroup(this.design);
            this.router.navigate(['/permithomepage/permitdesign'])
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
    this.code_discount=(data.amount/100)*this.netPay;
  // this.code_discount= this.code_discount.toFixed(2);
  this.discountAmount();
    this.Congratulations();
}
else if(data.discounttype=='amount'){
  this.code_discount=data.amount;
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
      if(data.data.cancel=='cancel'){
      }
      else if(data.data.data!=null){
      this.coupondata=data.data.data;
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

  createChatGroup(design:DesginDataModel){

    if(this.design=='prelim'){
      var GUID = 'prelim' + "_" + new Date().getTime();
    }else if(this.design=='permit'){
      var GUID = 'permit' + "_" + new Date().getTime();

    }

    var address = this.fulldesigndata.address.substring(0, 60);
    var groupName = this.fulldesigndata.name + "_" + address;

    var groupType = CometChat.GROUP_TYPE.PRIVATE;
    var password = "";

    var group = new CometChat.Group(GUID, groupName, groupType, password);
    let adminsid=[];
    let clientadminsid=[];
  this.wattmonkadmins.forEach(element => {
    adminsid.push(element.id)
  });
  this.clientadmins.forEach(element => {
    clientadminsid.push(element.id)
  });

    CometChat.createGroup(group).then(group=>{
      let membersList = [];
      if(this.userData.role.type!='clientadmin'||this.userData.role.type!='clientsuperadmin'){
        membersList=[new CometChat.GroupMember("" + this.fulldesigndata.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)]
      }
      clientadminsid.forEach(element => {
        membersList.push( new CometChat.GroupMember("" + element, CometChat.GROUP_MEMBER_SCOPE.ADMIN))
      });
        // new CometChat.GroupMember("" + this.fulldesigndata.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
     
      adminsid.forEach(element => {
        membersList.push( new CometChat.GroupMember("" + element, CometChat.GROUP_MEMBER_SCOPE.ADMIN))
      });
      CometChat.addMembersToGroup(group.getGuid(),membersList,[]).then(response=>{

          let postdata={
            chatid:GUID
          }

          this.apiService.updateDesignForm(postdata,design.id).subscribe(res=>{

          })
          // this.updateItemInList(LISTTYPE.NEW, design);

        this.cdr.detectChanges();
      })
    })
  }

  checkboxClicking(event){

// this.servicecharges();
this.removeCoupon();

  }



 private paypalintegration(){
    this.payPalConfig = {
      currency: 'USD',
      //for testing
      clientId: 'AV1abOj-_YOVXq_Negcy7Fkc2Esj2GtpY2dRe3nrTwPl4HSX22jbXQ6KKhyJRO7JjPxP__sr7wqi57bg',
     // for live
     //  CLIENT_ID: 'AfKOgzK6Le8LRp8bN4vefjNqC9B7qArUHJt0U_wUmed6hlDHlP-TlHYG9olpqTX85VhHHOD3T9pkfKuP',

      createOrderOnClient: (data) =>< ICreateOrderRequest >{
        intent: 'CAPTURE',
        purchase_units: [{
                    amount: {
                      value: this.netPay
                    }
                  }]

      },

      advanced: { extraQueryParams: [ { name: "disable-funding", value:"credit,card"} ],
    commit:'true' } ,

      style: {
              size: 'responsive',
              color: 'silver',
              shape: 'rect',
              label: 'pay',
              tagline:false,

      },


      onApprove: (data, actions) => {
          actions.order.get().then(details => {
         var postData={};
         var designacceptancestarttime = new Date();
         if(this.design=='prelim'){
         designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
         postData = {
           outsourcedto: 232,
           isoutsourced: "true",
           status: "outsourced",
           couponid:this.utils.getCouponId().value,
           designacceptancestarttime: designacceptancestarttime,
           paymenttype:"paypal",
           paymentstatus:"succeeded"

         };
         }
         else{
           designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
           postData = {
             outsourcedto: 232,
             isoutsourced: "true",
             status: "outsourced",
             couponid:this.utils.getCouponId().value,
             designacceptancestarttime: designacceptancestarttime,
             slabname:this.delivertime,
             slabdiscount:this.servicePrice.slabdiscount,
             serviceamount:this.servicePrice.servicecharge,
             amount:this.netPay,
             paymenttype:"paypal",
             paymentstatus:"succeeded"
           };
         }

           this.utils.showLoading("Assigning").then(()=>
           {
               this.apiService.updateDesignForm(postData,this.id).subscribe(value=>{
                 if(this.design=='prelim')
             {
               this.createChatGroup(value);
               this.newprelimsRef.update({ count: this.newprelimscount + 1});
             }else{
               this.createChatGroup(value);
               this.newpermitsRef.update({ count: this.newpermitscount + 1});
             }
               this.utils.hideLoading().then(()=>
              { this.utils.showSnackBar("Design request has been send to WattMonk successfully")
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
             })
          });

      },
      onClientAuthorization: (data) => {
          // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
          // this.showCancel = true;

      },
      onError: err => {
          // this.showError = true;
      },
      onClick: (data, actions) => {
          // this.resetStatus();
      },
  };
}




    // let _this = this;
    // setTimeout(() => {
    //   // Render the PayPal button into #paypal-button-container
    //   <any>window['paypal'].Buttons({

    //      style: {
    //       size: 'responsive',
    //       color: 'white',
    //       shape: 'rect',
    //       label: 'pay',
    //       tagline:false
    //   },

    //     // Set up the transaction
    //     createOrder: function (data, actions) {
    //       return actions.order.create({
    //         purchase_units: [{
    //           amount: {
    //             value: _this.netPay
    //           }
    //         }]
    //       });
    //     },

    //     // Finalize the transaction
    //     onApprove: function (data, actions) {
    //       return actions.order.capture()
    //         .then(function (details) {
    //           // Show a success message to the buyer
    //           alert('Transaction completed by ' + details.payer.name.given_name + '!');
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         })
    //     }
    //   }).render('#paypal-button-container');
    // }, 2000)
  }

