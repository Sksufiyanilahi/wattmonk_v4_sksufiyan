import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.page.html',
  styleUrls: ['./payment-gateway.page.scss'],
})

export class PaymentGatewayPage implements OnInit {
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

