import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { SharedModule } from 'src/app/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { SurveyComponent } from './survey/survey.component';
import { DesignComponent } from './design/design.component';
import { SalesProposalComponent } from './sales-proposal/sales-proposal.component';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NumberOnlyDirective } from 'src/app/directive/number-only/number.directive';
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,NgxDropzoneModule
  ],
  declarations: [
    SchedulePage,
    SurveyComponent,
    DesignComponent,
    NumberOnlyDirective,
    SalesProposalComponent,
  ],
  providers: [
    Diagnostic,
    NativeGeocoder,
    File,
    DatePipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SchedulePageModule {}
