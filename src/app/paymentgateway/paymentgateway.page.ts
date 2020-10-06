import { Component, OnInit } from '@angular/core';
import { FIELD_REQUIRED } from '../model/constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { NavController } from '@ionic/angular';
// import {
//   IPayPalConfig,
//   ICreateOrderRequest 
// } from 'ngx-paypal';

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.page.html',
  styleUrls: ['./paymentgateway.page.scss'],
})
export class PaymentgatewayPage implements OnInit {
  // public payPalConfig ? : IPayPalConfig
  // amountError = INVALID_EMAIL_MESSAGE;
  fieldRequired = FIELD_REQUIRED;
  initialamount: FormGroup;
  user: any;
  amount:any;
  showSuccess: boolean;

  constructor( private formBuilder: FormBuilder,
    private apiService:ApiService,
    private storageService:StorageService, private navController:NavController
    ) { 
    this.initialamount = this.formBuilder.group({
      amount: new FormControl('', [Validators.required])
    }
    );
  }

  ngOnInit() {
    // this.initConfig();
    this.user= this.storageService.getUser();

  }

  addamount(){
    
    console.log(this.initialamount.value.amount);
      if(this.initialamount.status=='VALID' && this.amount > 0){
        let date = Date.parse(this.user.updated_at);
        let data={
          "amount":this.amount,
          "datetime":date.toString(),
          "type":"success",
          "user":this.user.id
        }
    
        console.log(data);
        this.apiService.rechargePost(data).subscribe(res=>{
          console.log(res);
          
        })
      }
      }
      routerLink()
      {
        this.navController.navigateRoot('add-money');
      }

      // private initConfig(): void {
      //   // let enteredAmount = JSON.stringify(this.amount);
        
      //   console.log(this.amount);
        
      //   this.payPalConfig = {
      //   currency: 'INR',
      //   clientId: 'AVbuzL02W8su4HV5UHcuV4C7j1mdxpCq_qZZLSvYtxcvNxQ21FOgWPy1DLYYGzSMpWH9QGib08iewXY6',
      //   createOrderOnClient: (data) => <ICreateOrderRequest>{
      //     intent: 'CAPTURE',
      //     purchase_units: [
      //       {
      //         amount: {
      //           currency_code: 'INR',
      //           value: this.amount,
      //           breakdown: {
      //             item_total: {
      //               currency_code: 'INR',
      //               value: this.amount
      //             }
      //           }
      //         },
      //         items: [
      //           {
      //             name: 'Enterprise Subscription',
      //             quantity: '1',
      //             category: 'DIGITAL_GOODS',
      //             unit_amount: {
      //               currency_code: 'INR',
      //               value: this.amount,
      //             },
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   advanced: {
      //     commit: 'true'
      //   },
      //   style: {
      //     label: 'paypal',
      //     layout: 'vertical'
      //   },
      //   onApprove: (data, actions) => {
      //     console.log('onApprove - transaction was approved, but not authorized', data, actions);
      //     actions.order.get().then(details => {
      //       console.log('onApprove - you can get full order details inside onApprove: ', details);
      //     });
      //   },
      //   onClientAuthorization: (data) => {
      //     console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      //     this.showSuccess = true;
      //     this.addamount();
          
      //   },
      //   onCancel: (data, actions) => {
      //     console.log('OnCancel', data, actions);
      //   },
      //   onError: err => {
      //     console.log('OnError', err);
      //   },
      //   onClick: (data, actions) => {
      //     console.log('onClick', data, actions);
      //   },
      // };
      // }

}
