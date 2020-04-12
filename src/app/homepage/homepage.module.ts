import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagePageRoutingModule } from './homepage-routing.module';

import { HomepagePage } from './homepage.page';
import { SurveyComponent } from "./survey/survey.component";
import { DesignComponent } from "./design/design.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
  ],
  declarations: [HomepagePage, SurveyComponent, DesignComponent],
  providers: [
    DatePipe
  ]
})
export class HomepagePageModule {
}
