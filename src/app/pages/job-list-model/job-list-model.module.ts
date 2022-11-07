import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobListModelPageRoutingModule } from './job-list-model-routing.module';

import { JobListModelPage } from './job-list-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobListModelPageRoutingModule
  ],
  declarations: [JobListModelPage]
})
export class JobListModelPageModule {}
