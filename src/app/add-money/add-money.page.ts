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
  stripe=Stripe('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
 userData:User;
 mode:any;
 designId;
 serviceAmount:any;
 design:any;
  createPayment:any
  amountForm:FormGroup;
  onBoarding:any;
  responseData:any;
  //counts
  newpermits: Observable<any>;
  newpermitsRef: AngularFireObject<any>;
  newpermitscount = 0;
  //counts
 newprelims: Observable<any>;
 newprelimsRef: AngularFireObject<any>;
 //newprelimsRef:any;
 newprelimscount = 0;

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
    this.amountForm=this.formBuilder.group(
       {
         amount:new FormControl('',[Validators.required, Validators.min(1), Validators.max(5000)]),
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
     }

  
    ngOnInit() {
   this.utils.showHideIntercom(true);
    this.mode= this.route.snapshot.paramMap.get('mode');
   this.designId= this.route.snapshot.paramMap.get('id');
      this.serviceAmount = this.route.snapshot.paramMap.get('serviceAmount');
      this.design = this.route.snapshot.paramMap.get('design');
      this.onBoarding = this.route.snapshot.paramMap.get('onBoarding');
      
    this.userData = this.storageService.getUser();
    this.setupStripe();
    console.log(this.mode)
    console.log(this.designId);

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
      if(this.onBoarding == 'true' || this.onBoarding =='false'){
        if(this.amountForm.get('amount').value >=100 && this.amountForm.get('amount').value <= 5000)
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
      }
      else{
      if(this.amountForm.get('amount').value >=1 && this.amountForm.get('amount').value <=5000)
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
      }
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
     if(this.onBoarding=='true' && this.amountForm.get('amount').value > 500){
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
      
    }
    console.log(card);*/
 this.utils.showLoading("Adding").then(()=>{
   // this.stripe.createCardToken(card).then(token => {
   //   console.log(token);
     // this.token=token.id
var date= new Date();

  data={
    //designid:this.designId,
    datetime:date,
    amount:this.amountForm.get('amount').value,
    email:this.userData.email,
    paymenttype: "direct",
    token: this.token.token.id,
    user:this.userData.id,
    couponid:this.utils.getCouponId().value,
    designid:this.designId
    // datetime:date,
    // type:"succeeded"

  }
  console.log(data);
    this.apiService.createPayment(data).subscribe((res)=>{
      this.createPayment=res;
      this.utils.hideLoading();
      if(this.createPayment.paymentstatus=='succeeded'){
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
            }
            else{
              designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
            }
               postData = {
      outsourcedto: 232,
      isoutsourced: "true",
      status: "outsourced",
      designacceptancestarttime: designacceptancestarttime,
      paymenttype : "direct",
      couponid:this.utils.getCouponId().value,
    
    };
    
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
      
      })}
   
    
 }
else
{this.utils.errorSnackBar("payment was unsuccessfull");
this.router.navigate(['homepage/design']);
this.utils.setHomepageDesignRefresh(true);}
}
    ,
(error)=>{
  this.utils.hideLoading();
  this.utils.errorSnackBar("Something went wrong");
}
    )
    this.token='';})
  }

}

amountCheck(event){
  console.log(event.target.value);
  if(this.onBoarding == 'true' || this.onBoarding == 'false')
  {
    if(event.target.value < 100 || event.target.value > 5000)
{
  this.amountCheckingForOnboarding = true;
  console.log(this.amountCheckingForOnboarding);
}else{
  this.amountCheckingForOnboarding = false;
}
  }
  else{
if(event.target.value < 1 || event.target.value > 5000)
{
  this.amountChecking = true;
  console.log(this.amountChecking);
}else{
  this.amountChecking = false;
}
}
}
  
}


