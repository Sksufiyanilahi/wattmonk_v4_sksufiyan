import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { DateComponent } from './date/date.component';
import { EmailSelectorComponent } from './email-selector/email-selector.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { UserSelectorComponent } from './user-selector/user-selector.component';

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
        //   DatePicker
    ]
})
export class UtilitiesModule { }
