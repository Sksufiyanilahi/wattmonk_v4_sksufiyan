import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { AlertController, IonTabs, NavController, Platform, ToastController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized, NavigationStart } from '@angular/router';
import { ScheduleFormEvent } from '../model/constants';
import { Subscription } from 'rxjs';
import { AddressModel } from '../model/address.model';

import { NetworkdetectService } from '../networkdetect.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit, OnDestroy {

  @ViewChild('tabs', { static: true }) tabs: IonTabs;


  address = '';
  currentTab = 'design';
  tabsDisabled = false;

  // Geocoder configuration
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  locationAllowed = false;
  gpsActive = false;
  private subscription: Subscription;
  userdata:any;
  netSwitch: boolean;
  deactivateNetworkSwitch: Subscription;
  designs: any;

  constructor(
    private navController: NavController,
    private nativeGeocoder: NativeGeocoder,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private platform: Platform,
    private storage: StorageService,
    private utilities: UtilitiesService,
    public router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private network:NetworkdetectService,
    private location:Location
  ) {


    const url = this.router.url;
    const splittedUrl = url.split('/');
    console.log(splittedUrl);
    this.tabsDisabled = splittedUrl.length === 4;
    this.currentTab = splittedUrl[2];

  }

  ionViewDidEnter(){
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);
    })
  }

ngOnInit() {

  this.network.networkDisconnect();
this.network.networkConnect();

   this.userdata = this.storage.getUser();
    //this.requestLocationPermission();
    if (this.tabsDisabled) {
      this.subscription = this.utilities.getStaticAddress().subscribe((address) => {
        this.address = address;
        this.storage.setData(this.address);
      });
    } else {
      // await this.getGeoLocation();
      this.subscription = this.utilities.getAddressObservable().subscribe((address) => {
        console.log(address);
        this.address = address.address;
      this.storage.setData(this.address);
      });
    }
     this.designs = this.utilities.getdesignDetails();
     console.log(this.designs)
  //console.log(this.designs.status);
  }

  goBack() {
    this.navController.pop();
    // this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.utilities.setStaticAddress('');
    this.deactivateNetworkSwitch.unsubscribe();
  }

  segmentChanged(event) {
    console.log(event);
    this.currentTab = event.detail.value;
    this.tabs.select(event.detail.value);
  }

  getGeoLocation() {
    // this.utilities.showLoading('Getting Location').then(()=>{
          // setTimeout(()=>{
          //   this.utilities.hideLoading();
          // },1000)
      this.geolocation.getCurrentPosition().then((resp) => {
        this.utilities.hideLoading();
        // .then(()=>{
          console.log('resp',resp);
          this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
          this.utilities.hideLoading();
        // });
      },err=>{
        this.utilities.hideLoading();
        this.utilities.errorSnackBar('Unable to get location');
      }).catch((error) => {
        this.utilities.hideLoading();
        this.utilities.errorSnackBar('Unable to get location');

        console.log('Error getting location', error);
        this.showNoLocation();
      });
    // },err=>{
    //   this.utilities.hideLoading();
    // });
  }

  async  showNoLocation() {
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
    toast.present();
  }



  async showLocationDenied() {
    const toast = await this.toastController.create({
      header: 'Error',
      message: 'Location services denied, please enable them manually',
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
    toast.present();
  }


  getGeoEncoder(latitude, longitude) {
    // this.utilities.hideLoading().then((success) => {
          this.utilities.showLoading('Getting Location').then(()=>{
      this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result);
        this.utilities.hideLoading();
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
            this.showNoLocation();
            this.utilities.hideLoading();
            alert('Error getting location' + JSON.stringify(error));
          });
        });
      // }, (error) => {

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
      // this.goBack();
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

  goTo() {
    this.router.navigate(['/mappage']);
  }


  saveDesignForm() {
    console.log('posting value');
    console.log(this.router.url);
    if(this.router.url=='/schedule/design' || this.router.url=='/schedule/design/' + this.designs.id ){
    this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_DESIGN_FORM);
    }
    else if(this.router.url=='/schedule/salesproposal' || this.router.url == '/schedule/salesproposal/'+this.designs.id)
    {
      this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_SALES_FORM);
    }
  }
  // else{
  //   if(this.router.url=='/schedule/design/'+this.designs.id)
  //   {
  //     this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_DESIGN_FORM);
  //   }
  //   else{
  //     this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_SALES_FORM);
  //   }
  // }
  //}

  saveSurveyForm() {
    console.log('posting value');
    this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_SURVEY_FORM);
  }

  startSurvey() {
    console.log('posting value');
    this.utilities.setScheduleFormEvent(ScheduleFormEvent.START_SURVEY);
  }

  sendDesignForm(){
    if(this.router.url=='/schedule/design' || this.router.url == '/schedule/design/'+this.designs.id){
     this.utilities.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
  }
  else if(this.router.url=='/schedule/salesproposal' || this.router.url == '/schedule/salesproposal/'+this.designs.id)
    {
      this.utilities.setScheduleFormEvent(ScheduleFormEvent.SEND_SALES_FORM);
    }
}
}
