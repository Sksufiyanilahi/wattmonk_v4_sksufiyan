import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailModelPageModule } from '../email-model/email-model.module';
import { EmailModelPage } from '../email-model/email-model.page';
import {DeclinepagePageModule } from '../declinepage/declinepage.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmailModelPageModule,
    DeclinepagePageModule 
  ],
  exports:[
    EmailModelPageModule,
    DeclinepagePageModule 
  ]
})
export class SharedModule { }
