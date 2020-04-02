import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { StorageService } from './storage.service';
import { UtilitiesModule } from './utilities/utilities.module';
import { SuccessModalComponent } from './utilities/success-modal/success-modal.component';
import { FCM } from '@ionic-native/fcm/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent, SuccessModalComponent],
  entryComponents: [SuccessModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, UtilitiesModule],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClient,
    StorageService,
    AuthGuardService,
    Geolocation
  ],
  exports: [
    UtilitiesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
