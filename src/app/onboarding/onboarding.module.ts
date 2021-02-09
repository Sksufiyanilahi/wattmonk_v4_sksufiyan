import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { UtilitiesModule } from '../utilities/utilities.module';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    UtilitiesModule,
    MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        ReactiveFormsModule
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}
