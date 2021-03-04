import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMoneyPageRoutingModule } from './add-money-routing.module';

import { AddMoneyPage } from './add-money.page';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  entryComponents:[],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMoneyPageRoutingModule,
    ReactiveFormsModule,
    NgxPayPalModule
   
  ],
  declarations: [AddMoneyPage]
})
export class AddMoneyPageModule {}
