import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, NavController, Platform } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  @ViewChild('tabs', { static: true }) tabs: IonTabs;

  address = '25 Wainright Street, Province Road, 1118, Sector-A, Pocket-A, Vasant Kunj USA';
  currentTab = 'design';

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

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
    private utilities: UtilitiesService
  ) {
    this.requestLocationPermission();
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.pop();
  }

  segmentChanged(event: CustomEvent) {
    console.log(event);
    this.tabs.select(event.detail.value);
  }

  getGeoLocation() {
    let options = {
      enableHighAccuracy: false,
      timeout: 5000
    };
    console.log(options);
    this.utilities.showLoading('Getting Your Location');
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.utilities.hideLoading();
      console.log(resp);
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;
      this.getGeoEncoder(this.geoLatitude, this.geoLongitude);
    }).catch((error) => {
      this.utilities.hideLoading();
      this.utilities.showAlert('Unable to get location');
      console.log('Error getting location', error);
    });

  }


  getGeoEncoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.geoAddress = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (const key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  requestLocationPermission() {
    if (this.platform.is('ios')) {
      if (this.storage.isLocationAllowedOnIOS()) {
        this.fetchLocation();
      } else {
        if (!this.storage.isLocationCheckedOnIOS()) {
         this.storage.setLocationCheckedOnIOS(true);
          this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
            switch (mode) {
              case this.diagnostic.permissionStatus.NOT_REQUESTED:
                this.storage.setLocationAllowedOnIOS(false);
                break;
              case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                this.storage.setLocationAllowedOnIOS(false);
                break;
              case this.diagnostic.permissionStatus.GRANTED:
                this.storage.setLocationAllowedOnIOS(true);
                this.fetchLocation();
                break;
              case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                this.storage.setLocationAllowedOnIOS(true);
                this.fetchLocation();
                break;
              case 'authorized_when_in_use':
                this.storage.setLocationAllowedOnIOS(true);
                this.fetchLocation();
                break;
            }
          }, (rejection) => {
            this.locationAllowed = false;
            this.storage.setLocationAllowedOnIOS(false);
          });
        }
      }
    } else {
      this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
        switch (mode) {
          case this.diagnostic.permissionStatus.NOT_REQUESTED:
            break;
          case this.diagnostic.permissionStatus.DENIED_ALWAYS:
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
      });
    }

  }

  fetchLocation() {
    if (this.platform.is('ios')) {
      this.getGeoLocation();
    } else {
      this.diagnostic.isGpsLocationEnabled().then((status) => {
        if (status == true) {
          this.getGeoLocation();
        } else {
          this.changeLocationSettings();
        }
      });
    }

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


}
