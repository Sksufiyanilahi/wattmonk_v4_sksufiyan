import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitschedulePageRoutingModule } from './permitschedule-routing.module';

import { PermitschedulePage } from './permitschedule.page';
//import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
//import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//import { MatProgressBarModule } from '@angular/material/progress-bar';
//import {MatDialogModule} from '@angular/material/dialog';
//import {MatButtonModule} from '@angular/material/button';
//import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermitschedulePageRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDialogModule,
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
  declarations: [PermitschedulePage],
  providers: [
    Diagnostic,
    NativeGeocoder,
  ]
})
export class PermitschedulePageModule {}
