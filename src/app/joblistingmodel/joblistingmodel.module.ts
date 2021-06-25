import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoblistingmodelPageRoutingModule } from './joblistingmodel-routing.module';

import { JoblistingmodelPage } from './joblistingmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoblistingmodelPageRoutingModule
  ],
  declarations: [JoblistingmodelPage]
})
export class JoblistingmodelPageModule {}
