import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { GeolocationOptions, Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { google } from 'google-maps';
import { UtilitiesService } from '../utilities.service';
import { Router } from '@angular/router';
import { NavController, Platform, AlertController, ToastController } from '@ionic/angular';
import { AddressModel } from '../model/address.model';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { StorageService } from '../storage.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

declare var google;

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.page.html',
  styleUrls: ['./map-page.page.scss'],
})
export class MapPagePage implements OnInit {

  options: GeolocationOptions;
  currentPos: Geoposition;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];

  // map: any;

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  geocoder = new google.maps.Geocoder();

  constructor(
    private geoLocation: Geolocation,
    private zone: NgZone,
    private utilities: UtilitiesService,
    private router: Router,
    private navController: NavController,
    private nativeGeocoder: NativeGeocoder,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private platform: Platform,
    private storage: StorageService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ngOnInit() {

  }

  updateSearchResults(event: CustomEvent) {
    const input = event.detail.value;
    if (input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item) {
    console.log(item);
    this.geocoder.geocode({
      placeId: item.place_id
    }, (responses, status) => {
      console.log('respo', responses);
      this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address);
    });
  }

  getGeoEncoder(latitude, longitude, formattedAddress) {

    // //TODO remove later
    // const address: AddressModel = {
    //   address: 'Vasant Kunj, New Delhi, Delhi',
    //   lat: 28.5200491,
    //   long: 77.158687,
    //   country: 'India',
    //   state: 'Delhi',
    //   city: 'New Delhi',
    //   postalcode: '110070'
    // };
    // this.utilities.setAddress(address);
    // this.goBack();
    // return;

    this.utilities.showLoading('Loading').then(() => {
      this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
        .then((result: NativeGeocoderResult[]) => {
          let add = '';
          if (formattedAddress === '') {
            add = this.generateAddress(result[0]);
          } else {
            add = formattedAddress;
          }
          this.utilities.hideLoading().then(() => {
            console.log('resu', result);
            const address: AddressModel = {
              address: add,
              lat: latitude,
              long: longitude,
              country: result[0].countryName,
              state: result[0].administrativeArea,
              city: result[0].locality,
              postalcode: result[0].postalCode
            };
            this.utilities.setAddress(address);
            this.goBack();
          });

        })
        .catch((error: any) => {
          this.utilities.hideLoading().then(() => {
            alert('Error getting location' + JSON.stringify(error));
          });

        });
    });
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

  getGeoLocation() {
    this.utilities.showLoading('Getting Location');
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('resp', resp);
      this.utilities.hideLoading().then(() => {
        this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude, '');
      });
    }).catch((error) => {
      this.utilities.errorSnackBar('Unable to get location').then(() => {
        console.log('Error getting location', error);
        this.showNoLocation();
      });
    });

  }

  async showNoLocation() {
    const toast = await this.toastController.create({
      header: 'Error',
      message: 'Unable to get location',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.goBack();
          }
        }
      ]
    });
    await toast.present();
  }


  fetchLocation() {
    if (this.platform.is('ios')) {
      this.getGeoLocation();
    } else {
      this.diagnostic.isGpsLocationEnabled().then((status) => {
        if (status === true) {
          this.getGeoLocation();
          // this.utilities.showLoading('Getting Location').then(() => {

          // });
        } else {
          this.askToChangeSettings();
        }
      });
    }

  }

  async askToChangeSettings() {
    const toast = await this.toastController.create({
      header: 'Location Disabled',
      message: 'Please enable location services',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.changeLocationSettings();
          }
        }, {
          text: 'Cancel',
          handler: () => {
            this.goBack();
          }
        }
      ]
    });
    toast.present();
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
      this.utilities.showSnackBar('GPS Not Allowed');
    });

  }


  onCancel() {
    this.autocompleteItems = [];
  }

  goBack() {
    this.navController.pop();
  }
}
