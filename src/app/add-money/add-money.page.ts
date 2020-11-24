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
import { ScheduleFormEvent } from '../model/constants';
declare var Stripe;


@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.page.html',
  styleUrls: ['./add-money.page.scss'],
})
export class AddMoneyPage implements OnInit {
 
card:any
  token:any;
  stripe=Stripe('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
 userData:User;
 mode:any;
 designId;
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
    //private stripe:Stripe
    ) {
    this.amountForm=this.formBuilder.group(
       {
         amount:new FormControl('',[Validators.required]),
         card:new FormControl('')
        }
        )
     }

  
    ngOnInit() {
    this.mode= this.route.snapshot.paramMap.get('mode');
   this.designId= this.route.snapshot.paramMap.get('id');
    this.userData = this.storageService.getUser();
    this.setupStripe();
    console.log(this.mode)
    console.log(this.designId);
    
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
    this.apiService.createPayment(data).subscribe(res=>{
      this.createPayment=res;
      this.utils.hideLoading().then(()=>{
      var dates=new Date();
     console.log(dates)
rechargeData={
  amount:this.amountForm.get('amount').value,
  datetime: dates,
  paymenttype: "wallet",
  type: this.createPayment.paymentstatus,
user: this.userData.id
}
this.apiService.recharges(rechargeData).subscribe(res=>{
  this.utils.showSnackBar("$"+this.amountForm.get('amount').value +" added in your wallet successfully");
  this.goBack();
  this.utils.setHomepageDesignRefresh(true);
});})
    }),error=>{
      console.log("payment was unsuccessful");
     
    };
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
    amount:12,
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
     this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
   }else{
            var postData={};
            var designacceptancestarttime = new Date();
             designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
               postData = {
      outsourcedto: 232,
      isoutsourced: "true",
      status: "outsourced",
      designacceptancestarttime: designacceptancestarttime
    };
    
      this.apiService.updateDesignForm(postData,this.designId).subscribe(value=>{
        this.utils.showSnackBar("Design request has been send to wattmonk successfully");
       this.router.navigate(['homepage/design']);
       this.utils.setHomepageDesignRefresh(true);
      
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
  
}


