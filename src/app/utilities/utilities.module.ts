import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeComponent } from './date-time/date-time.component';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { IonicModule } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailSelectorComponent } from './email-selector/email-selector.component'
import { DateComponent } from './date/date.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    DateTimeComponent,
    UserSelectorComponent,
    AutoCompleteComponent,
    EmailSelectorComponent,
    DateComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DateTimeComponent,
    UserSelectorComponent,
    AutoCompleteComponent,
    EmailSelectorComponent,
    DateComponent,
    ProgressBarComponent
  ],
  providers: [
    DatePicker
  ]
})
export class UtilitiesModule { }
