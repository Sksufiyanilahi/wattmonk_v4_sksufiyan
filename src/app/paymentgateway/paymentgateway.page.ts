import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

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
  value: number=24;
  user: any;
 

  constructor(private storage:StorageService
    ) { 
   
  }

  ngOnInit() {
    this.user= this.storage.getUser();

  }

  select(e){
    console.log(e);
    this.value=parseInt(e.target.value);
  }

}
