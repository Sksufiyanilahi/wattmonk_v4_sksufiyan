import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Intercom } from 'ng-intercom';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ScheduleFormEvent } from '../model/constants';
import { Pestamp } from '../model/pestamp.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-pestamp-payment-modal',
  templateUrl: './pestamp-payment-modal.page.html',
  styleUrls: ['./pestamp-payment-modal.page.scss'],
})
export class PestampPaymentModalPage implements OnInit {

  user
  id:any
  design = 'pestamp';
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

    designData:any;
    data:any;
    assignValue:any;
    serviceCharges:any;
    amounttopay:any;
    createpayment:any;
    deliveryCharges:any;
     
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
      // this.newpermitsRef = db.object('newpermitdesigns');
      // this.newpermits = this.newpermitsRef.valueChanges();
      // this.newpermits.subscribe(
      //   (res) => {
      //     console.log(res);
      //     this.newpermitscount = res.count;
      //     cdr.detectChanges();
      //   },
      //   (err) => console.log(err),
      //   () => console.log('done!')
      // )
      // //counts
      // this.newprelimsRef = db.object('newprelimdesigns');
      // this.newprelims = this.newprelimsRef.valueChanges();
      // this.newprelims.subscribe(
      //   (res) => {
      //     console.log(res);
      //     this.newprelimscount = res.count;
      //     cdr.detectChanges();
      //   },
      //   (err) => console.log(err),
      //   () => console.log('done!')
      // )
        console.log(this.router.getCurrentNavigation().extras.state);
      this.designData = this.router.getCurrentNavigation().extras.state;
      this.data = this.designData.productdetails.queryParams.designData;
      this.assignValue = this.designData.productdetails.queryParams.value;
      this.deliveryCharges = this.data.deliverycharges;
      console.log(this.assignValue);
      console.log(this.data);
       }
  
    ngOnInit() {
      // this.route.queryParams.subscribe(params => {
      //   if (params && params.special) {
      //     this.designData = JSON.parse(params.special);
      //     console.log(this.designData)
      //   }
      // });
     
     this.utils.showLoading("Please wait....").then(()=>{
     
     
     
      this.userData = this.storageService.getUser();
      console.log(this.userData)
      this.utils.showHideIntercom(true);
       this.fetchData();
      // this.servicecharges();
      if(this.assignValue == 'assign')
      {
      this.getPeStampCharges();
     }
    else{
      this.getCommercialCharges();
    }});
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

    getPeStampCharges()
    {
      var searchdata;
    if (this.data.propertytype == 'commercial') {
      searchdata = "commercialanymountingpecharges"
    }
    else if (this.data.type == 'electrical') {
      searchdata = "electricalanymountingpecharges"
    }
    else if (this.data.type == 'structural' && this.data.mountingtype == 'both') {
      searchdata = "structuralbothpecharges"
    }
    else if (this.data.type == 'structural' && this.data.mountingtype == 'ground') {
      searchdata = "structuralgroundmountpecharges"
    }
    else if (this.data.type == "structural" && this.data.mountingtype == 'roof') {
      searchdata = "structuralroofpecharges"
    }
      this.apiService.getPeStampCharges(searchdata).subscribe((res)=>{
        console.log(res);
        this.servicePrice = res;
        // this.servicePrice.forEach(element => {
        //   this.settingValue = element.settingvalue;
        // });
        if(res[0].settingname =='commercialanymountingpecharges')
        {
          console.log("hello");
          this.settingValue = 0;
          this.netPay = this.settingValue;    
        }
        else{
          console.log("hello1")
          this.settingValue = res[0].settingvalue;
          this.netPay = this.settingValue;
        }
      }
      )
    }

    getCommercialCharges(){
      this.apiService.getPeStampCharges("commercialanymountingpecharges").subscribe((res)=>{
        console.log(res);
        this.servicePrice = res;
        console.log("deliver")
        this.settingValue = res[0].settingvalue;
        this.serviceCharges = this.settingValue * this.data.workinghours;
        //this.netPay = this.settingValue * this.data.workinghours;
        this.getAmounttopay();
    })
  }

    getAmounttopay() {
      if (this.data.propertytype == 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
        this.amounttopay = this.serviceCharges + this.data.deliverycharges;
      }
      else if (this.data.propertytype == 'commercial' && this.data.modeofstamping == 'ecopy') {
        this.amounttopay = this.serviceCharges;
      }
      else if (this.data.propertytype == 'residential' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
        this.amounttopay = this.data.deliverycharges
      }
    }
  
  fetchData(){
    // this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
    // this.design=params.get('designData')});
  
  
    this.apiService.getUserData(this.userData.id).subscribe(res=>{this.user=res;
      console.log(this.user)
      });
    
  
      // this.apiService.freeCharges().subscribe(res=>{
      //   this.freeDesigns=res;
      //   this.freeDesigns.forEach(element => {
      //     this.freeCharges = element.settingvalue;
      //   })
      //   console.log("daadd",this.freeCharges);
        
      // })
     
  
    //   console.log(this.id);
    //  console.log(this.design);
    
    
  }
    
  // discountAmount(){
  //   if(this.freeCharges>this.count){
  //     this.discount=this.settingValue;
  //     this.netPay=this.settingValue-this.discount;
  //   }
  //   else if(this.coupondata!=null){
  //     this.discount=this.code_discount;
  //     this.netPay=this.settingValue-this.code_discount;
  //     console.log(this.netPay)
  //   }
  //   else{
  //     this.discount=null;
  //     this.netPay=this.settingValue;
  //     console.log(this.netPay)
  //   }
  // }
  
  // servicecharges(){
  //   if(this.design=='prelim'){
  //     this.apiService.prelimCharges().subscribe(res=>{
  //       this.servicePrice=res;
  //       this.servicePrice.forEach(element => {
  //         this.settingValue = element.settingvalue;
  //       });
  //       console.log("ddd",this.settingValue)
  //     })}
  //     else{
  //       this.apiService.permitCharges().subscribe(res=>{
  //         this.servicePrice=res;
  //         this.servicePrice.forEach(element => {
  //           this.settingValue = element.settingvalue;
  //         });
  //         console.log("ddd",this.settingValue)
  //       })
  //     }
  //     this.discountAmount();
      
  // }
  
  confirm(){
    //if(this.data.id!=null){
      if(this.assignValue == 'clearDues'){
        const inputData = {
          paymenttype: "wallet",
          pestampid: this.data.id,
          user: this.user.id
        }
        if (this.data.propertytype == 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
          this.makeCommercialpayment(inputData);
        }
        else if (this.data.propertytype == 'commercial' && this.data.modeofstamping == 'ecopy') {
          this.makeCommercialpayment(inputData);
        }
        else if (this.data.propertytype != 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
          this.makepayment(inputData);
        }
      }
      else{
    var postData={};
    var pestampacceptancestarttime = new Date();
    pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
    // if(this.design=='prelim'){
    // designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
    // }
    // else{
    //   designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
    // }
      postData = {
        outsourcedto: 232,
        isoutsourced: "true",
        status: "outsourced",
        pestampacceptancestarttime: pestampacceptancestarttime,
        paymenttype:this.utils.getPaymentMode().value
      };
      this.utils.showLoading("Assigning").then(()=>
      {
          this.apiService.updatePestamps(this.data.id,postData).subscribe(value=>{
        //     if(this.design=='prelim')
        // {
        //   this.newprelimsRef.update({ count: this.newprelimscount + 1});
        //   console.log("hello",this.newprelimscount)
        // }else{
        //   this.newpermitsRef.update({ count: this.newpermitscount + 1});
        // }
          this.utils.hideLoading().then(()=>
         { this.utils.showSnackBar("pe stamp request has been send to wattmonk successfully")
         //this.navController.pop();
        //  if(this.design=='prelim'){
        //    this.router.navigate(['/homepage/design'])
        //  this.utils.setHomepageDesignRefresh(true);
        //  }
        //  else{
        //   this.router.navigate(['/permithomepage/permitdesign'])
        //    this.utils.setHomepagePermitRefresh(true);
        //  }
        this.router.navigate(['/pestamp-homepage/pestamp-design']);
        this.utils.setPeStampRefresh(true);
         })
        })
        })//}
        // else{
        //   if(this.design=='prelim'){
        //     this.utils.setPaymentMode("wallet");
        //   this.utils.setScheduleFormEvent(ScheduleFormEvent.PAY_EVENT);
        //   }
        //   else{
        //     this.utils.setPaymentMode("wallet");
        //     this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_PERMIT_FORM);
        //   }
        // }
      }
  }
  
    addWallet(value){
      if(this.assignValue == 'assign'){
        console.log("assign")
      //this.router.navigate(['/add-money',{mode:value,id:this.data.id,serviceAmount:this.netPay,design:this.design,assignValue:this.assignValue}])
      let objToSend: NavigationExtras = {
        queryParams: {
        mode:value,
        id:this.data.id,
        serviceAmount:this.netPay,
        design:this.design,
        assignValue:this.assignValue,
        data:this.data,
        //value:'assign'
        },
        skipLocationChange: false,
        fragment: 'top' 
    };


this.router.navigate(['/add-money'], { 
  state: { productdetails: objToSend }
});  
    }
      else{
        console.log("deliver")
        //this.router.navigate(['/add-money',{mode:value,id:this.data.id,serviceAmount:this.amounttopay,design:this.design,assignValue:this.assignValue,data:this.data}])
       let objToSend: NavigationExtras = {
        queryParams: {
        mode:value,
        id:this.data.id,
        serviceAmount:this.amounttopay,
        design:this.design,
        assignValue:this.assignValue,
        data:this.data,
        //value:'assign'
        },
        skipLocationChange: false,
        fragment: 'top' 
    };


this.router.navigate(['/add-money'], { 
  state: { productdetails: objToSend }
});
      }
    }
  
    cancel(){
     
        // if(this.design ==='prelim'){
        // this.router.navigate(['/homepage/design'])
        // this.utils.setHomepageDesignRefresh(true);
        // }
        // else{
        //   this.router.navigate(['permithomepage/permitdesign'])
        //   this.utils.setHomepagePermitRefresh(true);
        // }
        this.router.navigate(['/pestamp-homepage/pestamp-design']);
        this.utils.setPeStampRefresh(true);
     
    }
    refreshDesigns(event: CustomEvent) {
      let showLoader = true;
      if (event !== null && event !== undefined) {
        showLoader = false;
      }
      showLoader=false;
      this.fetchData()
    }

    makepayment(inputData) {
      this.utils.showLoading("Adding").then(()=>{
      this.apiService.createPestamppayment(inputData).subscribe(response => {
        console.log(response);
        this.createpayment=response;
    this.utils.hideLoading().then(()=>{
    //if(this.createpayment.status=='succeeded'){
  this.utils.showSnackBar("payment successfull");
        //this.data.isConfirmed = true;
       // this.data.pestamp=response;
        //this.dialogRef.close(this.data);
        //this.notifyService.showSuccess("payment successfull", "success")
        this.router.navigate(['pestamp-homepage/pestamp-design']);
  this.utils.setPeStampRefresh(true);
     // }
     // else{
      //   this.utils.errorSnackBar("payment was unsuccessfull");
      // this.router.navigate(['pestamp-homepage/pestamp-design']);
      // this.utils.setPeStampRefresh(true);
      // }
    });
      },
      (error)=>{
        this.utils.hideLoading();
        this.utils.errorSnackBar("Something went wrong");
      })
    })
    }
    
    makeCommercialpayment(inputData) {
      this.utils.showLoading("Adding").then(()=>{
      this.apiService.createCommercialPestamppayment(inputData).subscribe(response => {
        console.log(response);
        this.createpayment=response;
    this.utils.hideLoading().then(()=>{
   // if(this.createpayment.status=='succeeded'){
  this.utils.showSnackBar("payment successfull");
        //this.data.isConfirmed = true;
       // this.data.pestamp=response;
        //this.dialogRef.close(this.data);
        //this.notifyService.showSuccess("payment successfull", "success")
        this.router.navigate(['pestamp-homepage/pestamp-design']);
  this.utils.setPeStampRefresh(true);
      // }
      // else{
      //   this.utils.errorSnackBar("payment was unsuccessfull");
      // this.router.navigate(['pestamp-homepage/pestamp-design']);
      // this.utils.setPeStampRefresh(true);
      // }
    });
      },
      (error)=>{
        this.utils.hideLoading();
        this.utils.errorSnackBar("Something went wrong");
      })
    })
    }

    
  
    confirmforPostpaid(){
     // if(this.id!=null){
        var postData={};
        var pestampacceptancestarttime = new Date();
        pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
        // if(this.design=='prelim'){
        // designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
        // }
        // else{
        //   designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
        // }
          postData = {
            outsourcedto: 232,
            isoutsourced: "true",
            status: "outsourced",
            pestampacceptancestarttime: pestampacceptancestarttime,
           // couponid:this.utils.getCouponId().value,
            paymenttype:this.utils.getPaymentMode().value
          };
          this.utils.showLoading("Assigning").then(()=>
            {this.apiService.updateDesignForm(postData,this.id).subscribe(value=>{
              this.utils.hideLoading().then(()=>
             { this.utils.showSnackBar("Pe Stamp request has been send to wattmonk successfully")
             //this.navController.pop();
            //  if(this.design=='prelim'){
            //   this.router.navigate(['/homepage/design'])
            //  this.utils.setHomepageDesignRefresh(true);
            //  }
            //  else{
            //   this.router.navigate(['/permithomepage/permitdesign'])
            //    this.utils.setHomepagePermitRefresh(true);
            //  }
            this.router.navigate(['/pestamp-homepage/pestamp-design']);
            this.utils.setPeStampRefresh(true);
             })
            })
            })//}
            // else{
            //   if(this.design=='prelim'){
            //     this.utils.setPaymentMode("null");
            //   this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
            //   }
            //   else{
            //     this.utils.setPaymentMode("null");
            //     this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_PERMIT_FORM);
            //   }
            // }
    }
  
    ionViewWillLeave(){
      this.utils.showHideIntercom(false);
    }
  
  
    // async Congratulations(){
  
    //    const alert = await this.alertController.create({
    //     cssClass: 'CogratulationalertClass',
    //      header: 'Congratulations!',
    //    message:'<div><img src="/assets/images/tick.png"> <span>you got discount of $'+ this.code_discount+'</span></div>',
    //     // inputs:
    //     //  [ {name:'comment',
    //     //  id:'comment',
    //     //     type:'textarea',
    //     //   placeholder:'Enter Comment'}
    //     //   ] ,
    //     // buttons: [
    //     //   {
    //     //     text: 'OK',
    //     //     role: 'cancel',
    //     //     cssClass: 'secondary',
    //     //     handler: (blah) => {
    //     //       console.log('Confirm Cancel: blah');
    //     //     }
    //     //   // }, {
    //     //   //   text: 'deliver',
    //     //   //   handler: (alertData) => {
    //     //   //     var postData= {};
    //     //   //     if(alertData.comment!=""){
    //     //   //      postData = {
    //     //   //       status: "delivered",
    //     //   //       comments: alertData.comment ,
    //     //   //        };}
    //     //   //        else{
    //     //   //         postData = {
    //     //   //           status: "delivered",
    //     //   //            };
    //     //   //        }
    //     //   //        console.log(postData);
    //     //   //       //  this.apiService.updateDesignForm(postData).subscribe((value) => {
    //     //   //       //   this.utils.hideLoading().then(()=>{
    //     //   //       //     ;
    //     //   //       //     console.log('reach ', value);
    //     //   //       //    this.utils.showSnackBar('Design request has been delivered successfully');
  
    //     //   //       //     this.utils.setHomepageDesignRefresh(true);
    //     //   //       //   })
    //     //   //       // }, (error) => {
    //     //   //       //   this.utils.hideLoading();
    //     //   //       //   ;
    //     //   //       // });
    //     //   //   }
    //     //   }
    //     // ]
    //   });
  
    //     await alert.present();
    //     setTimeout(()=>alert.dismiss(),1000);
  
  
  
    // }
  
  //   codeDiscountCalculation(data,price:number){
  //   if(data.discounttype=='percentage'){
  //     console.log(price)
  //     this.code_discount=(data.amount/100)*price;
  //   this.code_discount= this.code_discount.toFixed(2);
  //   this.discountAmount();
  //     console.log(this.code_discount)
  //     this.Congratulations();
  // }
  // else if(data.discounttype=='amount'){
  //   this.code_discount=data.amount;
  //   console.log(this.code_discount)
  //    this.discountAmount();
  //    this.Congratulations();
  // }
  //   }
  
    //  async openModal(){
    //   const modal = await this.modalController.create({
    //     component: CouponOffersModalPage,
    //     cssClass: 'coupon-modal-css',
    //     componentProps: {
    //    request:this.design
    //     },
    //     backdropDismiss:false
    //   });
    //   modal.onDidDismiss().then((data) => {
    //     console.log(data);
    //     if(data.data.cancel=='cancel'){
    //     }
    //     else if(data.data.data!=null){
    //     this.coupondata=data.data.data;
    //     console.log(this.coupondata);
    //     this.utils.setCouponId(this.coupondata.id);
        
    //     this.codeDiscountCalculation(this.coupondata,this.settingValue);
    //     }
    // });
    //   // modal.dismiss(() => {
    //   //   ;
    //   //   this.getDesigns(null);
    //   // });
    //   return await modal.present();
    // }
  
  
    // removeCoupon(){
    //   this.coupondata=null;
    //   this.discountAmount();
    //   this.utils.setCouponId(null);
    // }
  
  }
  