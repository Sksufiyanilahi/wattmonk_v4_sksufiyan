import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './auth-guard.service';
import {StorageService} from './storage.service';
import {UtilitiesModule} from './utilities/utilities.module';
import {SuccessModalComponent} from './utilities/success-modal/success-modal.component';
// import { FCM } from '@ionic-native/fcm/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {NgxImageCompressService} from 'ngx-image-compress';
import {Camera} from '@ionic-native/camera/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Network} from '@ionic-native/network/ngx';
import {Stripe} from '@ionic-native/stripe/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {Mixpanel, MixpanelPeople} from '@ionic-native/mixpanel/ngx';
//import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

// import { LinkifyPipe } from './linkify.pipe';


@NgModule({
    declarations: [AppComponent, SuccessModalComponent],
    entryComponents: [SuccessModalComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        UtilitiesModule,
        IonicStorageModule.forRoot(),
        ChartsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase)

    ],
    providers: [
        // FCM,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        HttpClient,
        StorageService,
        AuthGuardService,
        Geolocation,
        FirebaseX,
        NgxImageCompressService,
        BackgroundMode,
        Camera,
        InAppBrowser,
        Network,
        Stripe,
        SocialSharing,
        Dialogs,
        AndroidPermissions,
        Mixpanel,
        MixpanelPeople
    ],
    exports: [
        UtilitiesModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
