import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitDesignDetailsPageRoutingModule } from './permit-design-details-routing.module';

import { PermitDesignDetailsPage } from './permit-design-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermitDesignDetailsPageRoutingModule
  ],
  declarations: [PermitDesignDetailsPage]
})
export class PermitDesignDetailsPageModule {}
