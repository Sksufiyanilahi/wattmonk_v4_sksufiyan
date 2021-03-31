import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
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
  value: number=24;
  user: any;


  constructor(private storage:StorageService,
    private navController:NavController) {

  }

  ngOnInit() {
    this.user= this.storage.getUser();

  }
  routerLink()
  {
    this.navController.navigateRoot('add-money');
  }

  select(e){
    // console.log(e);
    this.value=parseInt(e.target.value);
  }

}
