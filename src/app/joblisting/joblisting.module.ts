import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoblistingPageRoutingModule } from './joblisting-routing.module';

import { JoblistingPage } from './joblisting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoblistingPageRoutingModule
  ],
  declarations: [JoblistingPage]
})
export class JoblistingPageModule {}
