import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitHomePageRoutingModule } from './permit-home-routing.module';

import { PermitHomePage } from './permit-home.page';
import { DeclinePage } from '../decline/decline.page';
import { EmailModelPage } from '../email-model/email-model.page';
import { SharedModule } from 'src/app/shared.module';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { PermitDesignComponent } from './permit-design/permit-design.component';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';

@NgModule({
    entryComponents: [
        DeclinePage,
        EmailModelPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PermitHomePageRoutingModule,
        IonBottomDrawerModule,
        ReactiveFormsModule,
        UtilitiesModule,
        SharedModule
    ],
    declarations: [PermitHomePage, PermitDesignComponent],
    providers: [
        DatePipe,
        Diagnostic,
        NativeGeocoder,
        LaunchNavigator,
        Chooser,
        File,
        Network,
        FileTransfer,
        FileOpener
    ]
})
export class PermitHomePageModule { }
