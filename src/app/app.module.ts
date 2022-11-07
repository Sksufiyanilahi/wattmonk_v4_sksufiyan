import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LinkifyPipe } from './pipes/linkify/linkify.pipe';
import { SuccessModalComponent } from './components/utilities/success-modal/success-modal.component';
import { PopoverComponent } from './components/popover/popover.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UtilitiesModule } from './components/utilities/utilities.module';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// matrial import
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from 'src/environments/environment';

import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
// import { SplashScreenPluginWeb } from '@capacitor/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Dialogs } from '@awesome-cordova-plugins/dialogs/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Mixpanel, MixpanelPeople } from '@awesome-cordova-plugins/mixpanel/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

// service import
import { StorageService } from './services/storage/storage.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

import { SharedModule } from './shared.module';
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxPayPalModule } from "ngx-paypal";
import { Downloader } from '@ionic-native/downloader/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MentionModule } from 'angular-mentions';

@NgModule({
    declarations: [
        AppComponent,
        // LinkifyPipe,
        // SuccessModalComponent,
        // PopoverComponent
    ],
    entryComponents: [
        // SuccessModalComponent,
        // PopoverComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot({animated: false}),
        AppRoutingModule,
        HttpClientModule,
        UtilitiesModule,
        IonicStorageModule.forRoot(),
        NgChartsModule,
        NgxDropzoneModule,
        NgxPayPalModule,
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        SharedModule,
        NgxChartsModule,MentionModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        HttpClient,
        StorageService,
        AuthGuardService,
        Geolocation,
        FirebaseX,
        NgxImageCompressService,
        // SplashScreenPluginWeb,
        InAppBrowser,
        Network,
        // Stripe,
        SocialSharing,
        Dialogs,
        AndroidPermissions,
        Mixpanel,
        MixpanelPeople,
        NativeGeocoder,
        Downloader,
        FileOpener,
        File,
        FileTransfer
    ],
    exports: [
        UtilitiesModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
