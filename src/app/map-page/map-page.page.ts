import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { GeolocationOptions, Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { google } from 'google-maps';
import { UtilitiesService } from '../utilities.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AddressModel } from '../model/address.model';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

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
    private nativeGeocoder : NativeGeocoder,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.getUserPosition();
  }

  addMap(lat, long) {

    const latLng = new google.maps.LatLng(lat, long);

    // const mapOptions = {
    //   center: latLng,
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // this.addMarker();

  }

  // addMarker() {
  //
  //   const marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: this.map.getCenter()
  //   });
  //   const content = '<p>This is your current position !</p>';
  //   const infoWindow = new google.maps.InfoWindow({
  //     content
  //   });
  //
  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });
  //
  // }

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
      console.log("respo",responses);
      this.getGeoEncoder(responses[0].geometry.location.lat(),responses[0].geometry.location.lng());
      // const address: AddressModel = {
      //   address : responses[0].formatted_address,
      //   lat: responses[0].geometry.location.lat(),
      //   long: responses[0].geometry.location.lng()
      // };
      // this.utils.setAddress(address);
      this.goBack();
    });
  }

  getUserPosition() {
    this.options = {
      enableHighAccuracy: false,
      timeout: 5000
    };
    this.geoLocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.addMap(pos.coords.latitude, pos.coords.longitude);
    }, (err: PositionError) => {
      console.log('error : ' + err.message);
    });
  }

  getGeoEncoder(latitude, longitude) {
    // this.utilities.hideLoading().then((success) => {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        console.log("resu",result);
        const address: AddressModel = {
          address: this.generateAddress(result[0]),
          lat: latitude,
          long: longitude,
          country:result[0].countryName,
          state: result[0].administrativeArea,
          city:result[0].locality,
          postalcode:result[0].postalCode
        };
        this.utilities.setAddress(address);
      })
      .catch((error: any) => {
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


  onCancel() {
    this.autocompleteItems = [];
  }

  goBack() {
    this.navController.pop();
  }
}
