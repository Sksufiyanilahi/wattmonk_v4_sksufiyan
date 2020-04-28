import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { StorageService } from '../storage.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AddressModel } from '../model/address.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  searchQuery = '';
  items: string[];

  showSearchBar:boolean = false;
  showHome:boolean = true;
  // Geocoder configuration
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  private subscription: Subscription;

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    private datePipe: DatePipe,
    private storage: StorageService,
    private diagnostic: Diagnostic,
    private alertController: AlertController,
    private geolocation: Geolocation
  ) {
    this.initializeItems();
  }

  ngOnInit() {
    this.requestLocationPermission();
  }


  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  requestLocationPermission() {
    this.platform.ready().then(() => {
      this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
        console.log(mode);
        switch (mode) {
          case this.diagnostic.permissionStatus.NOT_REQUESTED:
            // this.goBack();
            break;
          case this.diagnostic.permissionStatus.DENIED_ALWAYS:
            this.showLocationDenied();
            break;
          case this.diagnostic.permissionStatus.DENIED_ONCE:
            // this.goBack();
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
      });
    });
  }

  async showLocationDenied() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Location services denied, please enable them manually',
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  fetchLocation() {
    this.diagnostic.isGpsLocationEnabled().then((status) => {
      if (status === true) {
        // this.utilities.showLoading('Getting Location').then(() => {
        this.getGeoLocation();
        // });
      } else {
        this.askToChangeSettings();
      }
    });
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
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  getGeoLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      this.utilities.errorSnackBar('Unable to get location');
      console.log('Error getting location', error);
      this.showNoLocation();
    });

  }

  getGeoEncoder(latitude, longitude) {
    // this.utilities.hideLoading().then((success) => {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result);
        const address: AddressModel = {
          address: this.generateAddress(result[0]),
          lat: latitude,
          long: longitude
        };
        this.utilities.setAddress(address);
      })
      .catch((error: any) => {
        this.showNoLocation();
        alert('Error getting location' + JSON.stringify(error));
      });
    // }, (error) => {
    //
    // }
    // );
  }

  generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (const key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (const val in obj) {
      if (obj[val].length) {
        address += obj[val] + ', ';
      }
    }
    return address.slice(0, -2);
  }

  changeLocationSettings() {

    this.diagnostic.switchToLocationSettings();
    this.diagnostic.registerLocationStateChangeHandler((state) => {
      console.log(state);
      if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF)) {
        this.checkLocationAccess();
      }

    });
  }

  checkLocationAccess() {
    console.log('Getting location');
    this.diagnostic.isLocationAuthorized().then((success) => {
      this.fetchLocation();
    }, (error) => {
      this.utilities.errorSnackBar('GPS Not Allowed');
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
            // this.goBack();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      if (this.showSearchBar === true) {
        this.showSearchBar = false;
      } else {
        navigator['app'].exitApp();
      }
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();

  }

  showHom() {
    this.showHome = true;
    this.showSearchBar = false;
  }

  onClick(){
    this.showHome = false;
    this.showSearchBar = true;
  }

}
