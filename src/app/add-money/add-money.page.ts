import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import { Stripe } from '@ionic-native/stripe/ngx';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ProfileHistoryComponent } from '../profile/profile-history/profile-history.component';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleFormEvent, INVALID_AMOUNT } from '../model/constants';
import { Intercom } from 'ng-intercom';
declare var Stripe;



@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.page.html',
  styleUrls: ['./add-money.page.scss'],
})
export class AddMoneyPage implements OnInit {

  invalidAmount = INVALID_AMOUNT;

amountChecking:boolean=false;
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
  constructor(//private stripe:Stripe,
    private apiService:ApiService,
    private storageService:StorageService,
    private utils:UtilitiesService,
    private router:Router,
    private route:ActivatedRoute ,
    private formBuilder:FormBuilder,
    private navController:NavController,
    private intercom:Intercom
    //private stripe:Stripe
    ) {
    this.amountForm=this.formBuilder.group(
       {
         amount:new FormControl('',[Validators.required, Validators.min(1), Validators.max(5000)]),
         card:new FormControl('')
        }
        )
     }

  
    ngOnInit() {
   this.utils.showHideIntercom(true);
    this.mode= this.route.snapshot.paramMap.get('mode');
   this.designId= this.route.snapshot.paramMap.get('id');
      this.serviceAmount = this.route.snapshot.paramMap.get('serviceAmount');
      this.design = this.route.snapshot.paramMap.get('design');
      
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
     
  data={
    amount:this.amountForm.get('amount').value,
    email:this.userData.email,
    paymenttype: "wallet",
    token:this.token.token.id,
    user:this.userData.id
  }
  console.log(data);
    // this.apiService.createPayment(data).subscribe(res=>{
    //   this.createPayment=res;
    //   this.utils.hideLoading().then(()=>{
      var dates=new Date();
     console.log(dates)
rechargeData={
  amount:this.amountForm.get('amount').value,
  datetime: dates,
  paymenttype: "wallet",
  type: "succeeded",
user: this.userData.id
}
this.apiService.recharges(rechargeData).subscribe(res=>{
  this.utils.hideLoading().then(()=>{
  this.utils.showSnackBar("$"+this.amountForm.get('amount').value +" added in your wallet successfully");
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
  data={
    amount:this.amountForm.get('amount').value,
    email:this.userData.email,
    paymenttype: "direct",
    token: this.token.token.id,
    user:this.userData.id
  }
  console.log(data);
    this.apiService.createPayment(data).subscribe(res=>{
      this.createPayment=res;
      this.utils.hideLoading();
      if(this.createPayment.paymentstatus=='succeeded'){
    this.utils.showSnackBar("payment via card is successfull");
   if(this.designId==="null"){
     if(this.design==='prelim'){
       this.utils.setPaymentMode("direct");
     this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
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
      paymenttype : "direct"
    };
    
      this.apiService.updateDesignForm(postData,this.designId).subscribe(value=>{
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
this.utils.setHomepageDesignRefresh(true);}}
    )
    this.token='';})
  }

}

amountCheck(event){
  console.log(event.target.value);
if(event.target.value < 1 || event.target.value > 5000)
{
  this.amountChecking = true;
  console.log(this.amountChecking);
}else{
  this.amountChecking = false;
}
}
  
  
}


