import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonTabs, NavController, Platform } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Router } from '@angular/router';
import { ScheduleFormEvent } from '../model/constants';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  @ViewChild('tabs', { static: true }) tabs: IonTabs;

  address = '';
  currentTab = 'design';

  // Geocoder configuration
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  locationAllowed = false;
  gpsActive = false;

  constructor(
    private navController: NavController,
    private nativeGeocoder: NativeGeocoder,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private platform: Platform,
    private storage: StorageService,
    private utilities: UtilitiesService,
    private router: Router,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.requestLocationPermission();
  }

  goBack() {
    this.navController.pop();
  }

  segmentChanged(event: CustomEvent) {
    console.log(event);
    this.currentTab = event.detail.value;
    this.tabs.select(event.detail.value);
  }

  getGeoLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      this.utilities.showAlert('Unable to get location');
      console.log('Error getting location', error);
      this.showNoLocation();
    });

  }

  async showNoLocation() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Unable to get location',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.goBack();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  async showLocationDenied() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Location services denied, please enable them manually',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.goBack();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }


  getGeoEncoder(latitude, longitude) {
    this.utilities.hideLoading().then((success) => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
          .then((result: NativeGeocoderResult[]) => {
            this.address = this.generateAddress(result[0]);
            this.utilities.setAddress(this.address);
          })
          .catch((error: any) => {
            this.showNoLocation();
            alert('Error getting location' + JSON.stringify(error));
          });
      }, (error) => {

      }
    );

  }

  generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (const key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length) {
        address += obj[val] + ', ';
      }
    }
    return address.slice(0, -2);
  }

  requestLocationPermission() {
    this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
      console.log(mode);
      switch (mode) {
        case this.diagnostic.permissionStatus.NOT_REQUESTED:
          this.goBack();
          break;
        case this.diagnostic.permissionStatus.DENIED_ALWAYS:
          this.showLocationDenied();
          break;
        case this.diagnostic.permissionStatus.DENIED_ONCE:
          this.goBack();
          break;
        case this.diagnostic.permissionStatus.GRANTED:
          this.fetchLocation();
          break;
        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          this.fetchLocation();
          break;
        case 'authorized_when_in_use':
          this.fetchLocation();
          break;
      }
    }, (rejection) => {
      console.log(rejection);
      this.goBack();
    });

    // if (this.platform.is('ios')) {
    //   if (this.storage.isLocationAllowedOnIOS()) {
    //     this.fetchLocation();
    //   } else {
    //     if (!this.storage.isLocationCheckedOnIOS()) {
    //       this.storage.setLocationCheckedOnIOS(true);
    //       this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
    //         switch (mode) {
    //           case this.diagnostic.permissionStatus.NOT_REQUESTED:
    //             this.storage.setLocationAllowedOnIOS(false);
    //             break;
    //           case this.diagnostic.permissionStatus.DENIED_ALWAYS:
    //             this.storage.setLocationAllowedOnIOS(false);
    //             break;
    //           case this.diagnostic.permissionStatus.GRANTED:
    //             this.storage.setLocationAllowedOnIOS(true);
    //             this.fetchLocation();
    //             break;
    //           case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
    //             this.storage.setLocationAllowedOnIOS(true);
    //             this.fetchLocation();
    //             break;
    //           case 'authorized_when_in_use':
    //             this.storage.setLocationAllowedOnIOS(true);
    //             this.fetchLocation();
    //             break;
    //         }
    //       }, (rejection) => {
    //         this.locationAllowed = false;
    //         this.storage.setLocationAllowedOnIOS(false);
    //       });
    //     }
    //   }
    // } else {
    //
    // }

  }

  fetchLocation() {
    if (this.platform.is('ios')) {
      this.getGeoLocation();
    } else {
      this.diagnostic.isGpsLocationEnabled().then((status) => {
        if (status === true) {
          this.utilities.showLoading('Getting Location').then(() => {
            this.getGeoLocation();
          });
        } else {
          this.askToChangeSettings();
        }
      });
    }

  }

  async askToChangeSettings() {
    const alert = await this.alertController.create({
      header: 'Location Disabled',
      subHeader: 'Please enable location services',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.changeLocationSettings();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            this.goBack();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  changeLocationSettings() {

    this.diagnostic.switchToLocationSettings();
    this.diagnostic.registerLocationStateChangeHandler((state) => {
      if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF) ||
        (this.platform.is('ios')) && (state === this.diagnostic.permissionStatus.GRANTED ||
          state === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
        )) {
        this.checkLocationAccess();
      }

    });
  }

  checkLocationAccess() {
    this.diagnostic.isLocationAuthorized().then((success) => {
      this.fetchLocation();
    }, (error) => {
      this.utilities.showAlert('GPS Not Allowed');
    });

  }

  goTo() {
    this.router.navigate(['/mappage']);
  }


  saveDesignForm() {
    console.log('posting value');
    this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_DESIGN_FORM);
  }

  saveSurveyForm() {
    console.log('posting value');
    this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_SURVEY_FORM);
  }

  startSurvey() {
    console.log('posting value');
    this.utilities.setScheduleFormEvent(ScheduleFormEvent.START_SURVEY);
  }
}
