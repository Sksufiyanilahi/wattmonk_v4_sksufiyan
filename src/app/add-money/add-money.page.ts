import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import { Stripe } from '@ionic-native/stripe/ngx';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ProfileHistoryComponent } from '../profile/profile-history/profile-history.component';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleFormEvent, INVALID_AMOUNT, INVALID_AMOUNT_FOR_ONBOARDING } from '../model/constants';
import { Intercom } from 'ng-intercom';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
declare var Stripe;
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { DesginDataModel } from '../model/design.model';



@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.page.html',
  styleUrls: ['./add-money.page.scss'],
})
export class AddMoneyPage implements OnInit {

  invalidAmount = INVALID_AMOUNT;
  invalidAmountForOnboarding = INVALID_AMOUNT_FOR_ONBOARDING;

amountChecking:boolean=false;
amountCheckingForOnboarding:boolean=false;
card:any
  token:any;
  // stripe=Stripe('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
  stripe= Stripe('sk_test_51HQ4SfBlSfQmxsSflRlcq7ntq1xMbhlBVW03jzMCd1WiOZMqjglO0jO2FV6IHDSiFfDnesYt2feU7w4uEe34PfPR00iLg5qpLm');
 userData:User;
 mode:any;
 designId;
 serviceAmount:any;
 design:any;
  createPayment:any;
  assignValue:any;
  //data:any;
  //for pestamp
  createDirectPayment:any;
  amountForm:FormGroup;
  onBoarding:any;
  responseData:any;
  slabdiscount:any;
  slabtime:any;
  initialamount:any
  //counts
  newpermits: Observable<any>;
  newpermitsRef: AngularFireObject<any>;
  newpermitscount = 0;
  //counts
 newprelims: Observable<any>;
 newprelimsRef: AngularFireObject<any>;
 //newprelimsRef:any;
 newprelimscount = 0;
 createpayment:any;

 designData:any;
  fulldesigndata: any;

  constructor(//private stripe:Stripe,
    private apiService:ApiService,
    private storageService:StorageService,
    private utils:UtilitiesService,
    private router:Router,
    private route:ActivatedRoute ,
    private formBuilder:FormBuilder,
    private navController:NavController,
    private intercom:Intercom,
    private db:AngularFireDatabase,
    private cdr: ChangeDetectorRef
    //private stripe:Stripe
    ) {
      this.designData = this.router.getCurrentNavigation().extras.state;
      console.log(this.designData)
      this.mode = this.designData.productdetails.queryParams.mode;
      this.designId = this.designData.productdetails.queryParams.id;
      this.serviceAmount = this.designData.productdetails.queryParams.serviceAmount;
      this.design = this.designData.productdetails.queryParams.design;
      this.slabdiscount=this.designData.productdetails.queryParams.slabdiscount;
      this.slabtime=this.designData.productdetails.queryParams.slabtime;
      this.initialamount=this.designData.productdetails.queryParams.serviceinitialamount;
     // this.data = this.designData.productdetails.queryParams.data;
      this.fulldesigndata = this.designData.productdetails.queryParams.fulldesigndata;
      this.assignValue = this.designData.productdetails.queryParams.assignValue;
        console.log(this.fulldesigndata);
        console.log(this.design);
    this.amountForm=this.formBuilder.group(
       {
         amount:new FormControl('',[Validators.required, Validators.min(1), Validators.max(10000)]),
         card:new FormControl('')
        }
        )
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

    //PESTAMP Payment
    // this.designData = this.router.getCurrentNavigation().extras.state;
    // console.log(this.designData)
    // this.mode = this.designData.productdetails.queryParams.mode;
    // this.designId = this.designData.productdetails.queryParams.id;
    // this.serviceAmount = this.designData.productdetails.queryParams.serviceAmount;
    // this.design = this.designData.productdetails.queryParams.design;
    // this.data = this.designData.productdetails.queryParams.data;
    // this.assignValue = this.designData.productdetails.queryParams.assignValue;
     }

  
    ngOnInit() {
   this.utils.showHideIntercom(true);
  //   this.mode= this.route.snapshot.paramMap.get('mode');
  //  this.designId= this.route.snapshot.paramMap.get('id');
  //     this.serviceAmount = this.route.snapshot.paramMap.get('serviceAmount');
  //     this.design = this.route.snapshot.paramMap.get('design');
  //     this.onBoarding = this.route.snapshot.paramMap.get('onBoarding');
  //     this.assignValue = this.route.snapshot.paramMap.get('assignValue');
  //     this.data = this.route.snapshot.paramMap.get('data');

      
    this.userData = this.storageService.getUser();
    this.setupStripe();
    console.log(this.mode)
    console.log(this.designId);
    console.log(this.design);

    if(this.mode=='card'){
      this.amountForm.patchValue({amount:this.serviceAmount});
    }
    
  }
 setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#111'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = elements.create('card', { style: style });
    console.log(this.card);
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event)
      // if(this.onBoarding == 'true' || this.onBoarding =='false'){
      //   if(this.amountForm.get('amount').value >=100 && this.amountForm.get('amount').value <= 5000)
      //   {
      //     this.stripe.createToken(this.card).then(result => {
      //       if (result.error) {
      //         var errorElement = document.getElementById('card-errors');
      //         errorElement.textContent = result.error.message;
      //       } else {
      //         console.log(result);
      //         this.token=result;
      //         console.log(this.token.token.id);
      //         this.addMoney();
             
      //       }
      //     });
      //   }else{
      //     this.utils.errorSnackBar("Please Enter Valid Amount");
      //   }
      // }
     // else{
      if(this.amountForm.get('amount').value >=1 && this.amountForm.get('amount').value <=10000)
      {
      this.stripe.createToken(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          this.token=result;
          console.log(this.token.token.id);
          this.addMoney();
         
        }
      });
    }else{
      this.utils.errorSnackBar("Please Enter Valid Amount");
    }
      //}
    });
  }


  goBack(){
    this.navController.pop();
  }
  addMoney()
  {
   
    if(this.mode=='wallet'){
      var data={};
  var rechargeData={};
    //console.log(form.value.cardNo);
  /* this.stripe.setPublishableKey('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
    let card:any= {
      number : form.value.cardNo,
      
      expYear : form.value.expYear,
      expMonth : form.value.expMonth,
      cvc : form.value.cvc,
      amount : form.value.amount,
      
    }
    console.log(card);*/
 this.utils.showLoading("Adding").then(()=>{
    //this.stripe.createCardToken(card).then(token => {
     // console.log(token);
     // this.token=token.id
//      if(this.onBoarding=='true' && this.amountForm.get('amount').value >= 500){
//       data={
//         amount:this.amountForm.get('amount').value + 100,
//         email:this.userData.email,
//         paymenttype: "wallet",
//         token:this.token.token.id,
//         user:this.userData.id
//       }
//       console.log(data);
//      }
//      else{
//   data={
//     amount:this.amountForm.get('amount').value,
//     email:this.userData.email,
//     paymenttype: "wallet",
//     token:this.token.token.id,
//     user:this.userData.id
//   }
// }
//   console.log(data);
    // this.apiService.createPayment(data).subscribe(res=>{
    //   this.createPayment=res;
    //   this.utils.hideLoading().then(()=>{
      var dates=new Date();
     console.log(dates)
     if(this.onBoarding=='true' && this.amountForm.get('amount').value > 1000){
      rechargeData={
        amount:this.amountForm.get('amount').value + 100,
        datetime: dates,
        paymenttype: "wallet",
        type: "succeeded",
      user: this.userData.id,
      token:this.token.token.id,
      }
     }
     else{
rechargeData={
  amount:this.amountForm.get('amount').value,
  datetime: dates,
  paymenttype: "wallet",
  type: "succeeded",
user: this.userData.id,
token:this.token.token.id,
}
     }
this.apiService.recharges(rechargeData).subscribe((res:any)=>{
  this.utils.hideLoading().then(()=>{ 
  this.responseData = res;
  let token=  this.storageService.getJWTToken();
          this.storageService.setUser(res.user,token);
  console.log(res);
  this.utils.showSnackBar("$"+this.responseData.amount +" added in your wallet successfully");
  this.goBack();
  this.utils.setHomepageDesignRefresh(true);
}),error=>{
  this.utils.hideLoading().then(()=>{      
    console.log("payment was unsuccessful");
     this.utils.errorSnackBar(error);
    })
    };
  });
    this.token=''
  });
  }
 

  if(this.mode=='card') {
    var data={};
   //console.log(form.value.cardNo);
   // this.stripe.setPublishableKey('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
   /* let card:any= {
      number : form.value.cardNo,
      
      expYear : form.value.expYear,
      expMonth : form.value.expMonth,
      cvc : form.value.cvc,
      amount : form.value.amount,
      
    }*/
    console.log("card");
 this.utils.showLoading("Adding").then(()=>{
   // this.stripe.createCardToken(card).then(token => {
   //   console.log(token);
     // this.token=token.id
var date= new Date();
if(this.design == 'pestamp'){
  if(this.assignValue =='assign'){
  data={
    datetime:date,
    amount:this.amountForm.get('amount').value,
    //email:this.userData.email,
    // paymenttype: "direct",
    token: this.token.token.id,
    user:this.userData.id,
    pestampid:this.designId
  }
  this.apiService.createdirectpayment(data).subscribe((res)=>{
    this.createDirectPayment=res;
    this.utils.hideLoading().then(()=>{
      this.createChatGroup(this.fulldesigndata);
    if(this.createDirectPayment.status=='succeeded'){
  this.utils.showSnackBar("payment via card is successfull");
  var postData={};
  var pestampacceptancestarttime = new Date();
 pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
  postData = {
   outsourcedto: 232,
   isoutsourced: "true",
   status: "outsourced",
   pestampacceptancestarttime: pestampacceptancestarttime,
   paymenttype : "direct",
  // couponid:this.utils.getCouponId().value,
 
 };
 this.apiService.updatePestamps(this.designId,postData).subscribe(value=>{
   this.utils.showSnackBar("Pe Stamp request has been send to wattmonk successfully");
   this.router.navigate(['pestamp-homepage/pestamp-design']);
   this.utils.setPeStampRefresh(true);
 
 })
}
else{
  this.utils.errorSnackBar("payment was unsuccessfull");
this.router.navigate(['pestamp-homepage/pestamp-design']);
this.utils.setPeStampRefresh(true);
}
});
},
(error)=>{
  this.utils.hideLoading();
  this.utils.errorSnackBar("Something went wrong");
})
}
else{
  const inputData = {
    paymenttype: "direct",
    token: this.token.token.id,
    pestampid: this.designId,
    email: this.fulldesigndata.email,
    amount: this.serviceAmount,
    user: this.userData.id,
   

  }
  console.log(inputData)
  if (this.fulldesigndata.propertytype == 'commercial' && (this.fulldesigndata.modeofstamping == 'hardcopy' || this.fulldesigndata.modeofstamping == 'both')) {
    this.makeCommercialpayment(inputData);
  }
  else if (this.fulldesigndata.propertytype == 'commercial' && this.fulldesigndata.modeofstamping == 'ecopy') {
    this.makeCommercialpayment(inputData);
  }
  else if (this.fulldesigndata.propertytype != 'commercial' && (this.fulldesigndata.modeofstamping == 'hardcopy' || this.fulldesigndata.modeofstamping == 'both')) {
    this.makepayment(inputData);
  }
}
this.token='';
}
else{
  var data={}
  if (this.design=='permit'){
  data={
    //designid:this.designId,
    datetime:date,
    amount:this.amountForm.get('amount').value,
    email:this.userData.email,
    paymenttype: "direct",
    token: this.token.token.id,
    user:this.userData.id,
    couponid:this.utils.getCouponId().value,
    designid:this.designId,
    slabdiscount:this.slabdiscount,
    serviceamount:this.initialamount
    // datetime:date,
    // type:"succeeded"

  }}
  else{
    data={
      //designid:this.designId,
      datetime:date,
      amount:this.amountForm.get('amount').value,
      email:this.userData.email,
      paymenttype: "direct",
      token: this.token.token.id,
      user:this.userData.id,
      couponid:this.utils.getCouponId().value,
      designid:this.designId,
    
      // datetime:date,
      // type:"succeeded"
  
    }
  }
  console.log(data);
    this.apiService.createPayment(data).subscribe((res)=>{
      this.createPayment=res;
      debugger;
      if(res){
        this.utils.hideLoading().then(()=>{
          this.createChatGroup(this.fulldesigndata);
  
        });
      }
      if(this.createPayment.status=='succeeded'){
    this.utils.showSnackBar("payment via card is successfull");
   if(this.designId==="null"){
     if(this.design==='prelim'){
       this.utils.setPaymentMode("direct");
     this.utils.setScheduleFormEvent(ScheduleFormEvent.PAY_EVENT);
     }
     else{
       this.utils.setPaymentMode("direct");
       this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_PERMIT_FORM);
     }
   }else{
            var postData={};
            var designacceptancestarttime = new Date();
            if(this.design=='prelim'){
             designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
             postData = {
              outsourcedto: 232,
              isoutsourced: "true",
              status: "outsourced",
              designacceptancestarttime: designacceptancestarttime,
              paymenttype : "direct",
              couponid:this.utils.getCouponId().value,
            
            };
            }
            else{
              designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
              postData = {
                outsourcedto: 232,
                isoutsourced: "true",
                status: "outsourced",
                designacceptancestarttime: designacceptancestarttime,
                paymenttype : "direct",
                couponid:this.utils.getCouponId().value,
                slabdiscount:this.slabdiscount,
                slabtime:this.slabtime,
                serviceamount:this.initialamount,
                amount:this.amountForm.get('amount').value
              
              };
            }
     
    
      this.apiService.updateDesignForm(postData,this.designId).subscribe(value=>{
        if(this.design=='prelim')
        {
          this.newprelimsRef.update({ count: this.newprelimscount + 1});
          console.log("hello",this.newprelimscount)
        }else{
          this.newpermitsRef.update({ count: this.newpermitscount + 1});
        }
        this.utils.showSnackBar("Design request has been send to wattmonk successfully");
        if(this.design=='prelim'){
       this.router.navigate(['homepage/design']);
       this.utils.setHomepageDesignRefresh(true);
        }
        else{
          this.router.navigate(['permithomepage/permitdesign']);
          this.utils.setHomepagePermitRefresh(true);
        }
      
      })
  
    }
   
    
 }
else
{
  this.utils.errorSnackBar("payment was unsuccessfull");
//   if(this.design=='pestamp')
//   { 
// this.router.navigate(['pestamp-homepage/pestamp-design']);
// this.utils.setPeStampRefresh(true);
//   }
 if(this.design=='prelim'){
this.router.navigate(['homepage/design']);
this.utils.setHomepageDesignRefresh(true);}
else
{
  this.router.navigate(['permithomepage/permitdesign']);
this.utils.setHomepagePermitRefresh(true);
}
  }
}
    ,
(error)=>{
  this.utils.hideLoading();
  this.utils.errorSnackBar("Something went wrong");
}
    )
    this.token='';
}
  })
  }

}

amountCheck(event){
  console.log(event.target.value);
//   if(this.onBoarding == 'true' || this.onBoarding == 'false')
//   {
//     if(event.target.value < 100 || event.target.value > 5000)
// {
//   this.amountCheckingForOnboarding = true;
//   console.log(this.amountCheckingForOnboarding);
// }else{
//   this.amountCheckingForOnboarding = false;
// }
//   }
//   else{
if(event.target.value < 1 || event.target.value > 10000)
{
  this.amountChecking = true;
  console.log(this.amountChecking);
}else{
  this.amountChecking = false;
}
//}
}

makepayment(inputData) {
  console.log(inputData);
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
  //}
  //else{
  //   this.utils.errorSnackBar("payment was unsuccessfull");
  // this.router.navigate(['pestamp-homepage/pestamp-design']);
  // this.utils.setPeStampRefresh(true);
  //}
});
  },
  (error)=>{
    this.utils.hideLoading();
    this.utils.errorSnackBar("Something went wrong");
  })
}

makeCommercialpayment(inputData) {
  this.apiService.createCommercialPestamppayment(inputData).subscribe(response => {
    console.log(response);
    this.createpayment=response;
this.utils.hideLoading().then(()=>{
//if(this.createpayment.status=='succeeded'){
this.utils.showSnackBar("payment successfull");
this.router.navigate(['pestamp-homepage/pestamp-design']);
  this.utils.setPeStampRefresh(true);
    //this.data.isConfirmed = true;
   // this.data.pestamp=response;
    //this.dialogRef.close(this.data);
    //this.notifyService.showSuccess("payment successfull", "success")
    
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
}


createChatGroup(design){
  debugger;
  if(this.design == 'pestamp'){
    var GUID = 'pestamp' + "_" + new Date().getTime();
    //var address = design.address.substring(0, 60);
    var groupname = design.personname// + "_" + address;

    var groupType = CometChat.GROUP_TYPE.PRIVATE;
    var password = "";

    var group = new CometChat.Group(GUID, groupname, groupType, password);

    CometChat.createGroup(group).then(group=>{
      let membersList = [
        new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
      ];
      CometChat.addMembersToGroup(group.getGuid(),membersList,[]).then(response=>{
        this.cdr.detectChanges();
      })
    })
  }
  else{
  if(this.design=='prelim'){
    var GUID = 'prelim' + "_" + new Date().getTime();
  }else if(this.design=='permit'){
    var GUID = 'permit' + "_" + new Date().getTime();
  } 

    var address = design.address.substring(0, 60);
    var groupName = design.name + "_" + address;

    var groupType = CometChat.GROUP_TYPE.PRIVATE;
    var password = "";

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group).then(group=>{
      let membersList = [
        new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
      ];
      CometChat.addMembersToGroup(group.getGuid(),membersList,[]).then(response=>{
        this.cdr.detectChanges();
      })
    })
  }
}
}


