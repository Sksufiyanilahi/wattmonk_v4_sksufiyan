import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { UtilitiesModule } from '../utilities/utilities.module';
//import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';
import { JoyrideModule } from 'ngx-joyride';
// import { AngularFireDatabaseModule } from '@angular/fire/database/database.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    UtilitiesModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        SharedModule,
        JoyrideModule.forChild(),
        // AngularFireDatabaseModule,
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}
