import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitSchedulePageRoutingModule } from './permit-schedule-routing.module';

import { PermitSchedulePage } from './permit-schedule.page';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermitSchedulePageRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatPseudoCheckboxModule,
    MatStepperModule,
    MatDialogModule,
    NgxDropzoneModule,
    // MatExpansionModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    // MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    // MatSidenavModule,
    // MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    // MatSortModule,
    MatTableModule,
    MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    MatNativeDateModule,
    //MatCarouselModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    UtilitiesModule
  ],
  declarations: [PermitSchedulePage],
  providers: [
    Diagnostic,
    NativeGeocoder,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PermitSchedulePageModule{}
