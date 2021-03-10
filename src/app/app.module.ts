import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Mixpanel, MixpanelPeople} from '@ionic-native/mixpanel/ngx';
import {Network} from '@ionic-native/network/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Stripe} from '@ionic-native/stripe/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {ChartsModule} from 'ng2-charts';
import {NgxImageCompressService} from 'ngx-image-compress';
import {environment} from 'src/environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuardService} from './auth-guard.service';
import {StorageService} from './storage.service';
import {SuccessModalComponent} from './utilities/success-modal/success-modal.component';
import {UtilitiesModule} from './utilities/utilities.module';
import {PopoverComponentComponent} from './popover-component/popover-component.component';
import {MyLoaderComponent} from './components/my-loader/my-loader.component';

@NgModule({
  declarations: [AppComponent, SuccessModalComponent, MyLoaderComponent, PopoverComponentComponent],
  entryComponents: [SuccessModalComponent, PopoverComponentComponent],
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
