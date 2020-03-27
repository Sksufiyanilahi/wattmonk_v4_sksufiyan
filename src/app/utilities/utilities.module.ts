import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeComponent } from './date-time/date-time.component';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { IonicModule } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  declarations: [
    DateTimeComponent,
    UserSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    DateTimeComponent,
    UserSelectorComponent
  ],
  providers: [
    DatePicker
  ]
})
export class UtilitiesModule { }
