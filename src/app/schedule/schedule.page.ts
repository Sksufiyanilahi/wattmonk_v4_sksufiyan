import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, NavController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  @ViewChild('tabs', { static: true }) tabs: IonTabs;

  address = '25 Wainright Street, Province Road, 1118, Sector-A, Pocket-A, Vasant Kunj USA';
  currentTab = 'design';

  // Geocoder configuration
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    private navController: NavController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private utilities: UtilitiesService
  ) {
    this.getGeoLocation();
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
    this.geolocation.getCurrentPosition().then((resp) => {
      this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  getGeoEncoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
        this.utilities.setAddress(this.address);
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

}
