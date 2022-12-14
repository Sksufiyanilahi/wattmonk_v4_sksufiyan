import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { AlertController, IonTabs, NavController, Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddressModel } from 'src/app/models/address.model';
import { ScheduleFormEvent } from 'src/app/models/constants';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.page.html',
    styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

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
    userdata: any;
    netSwitch: boolean;
    deactivateNetworkSwitch: Subscription;
    designs: any;
    designId: number = 0;
    public isClient: boolean = false;
    public isVAAgent: boolean = false;
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
        private network: NetworkDetectService,
        private location: Location
    ) {


        const url = this.router.url;
        const splittedUrl = url.split('/');

        this.tabsDisabled = splittedUrl.length === 4;
        this.currentTab = splittedUrl[2];
        this.isClient = this.utilities.isClient();
        this.isVAAgent = this.utilities.isVAAgent();


    }

    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;

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

                this.address = address.address;
                this.storage.setData(this.address);
            });
        }
        this.designs = this.utilities.getdesignDetails();

        if (this.designs !== null && this.designs !== undefined) {
            this.designId = this.designs.id;
        }

    }

    goBack() {
        this.navController.pop();
        // this.location.back();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.utilities.setStaticAddress('');
        // this.deactivateNetworkSwitch.unsubscribe();
    }

    segmentChanged(event) {

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

            this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
            this.utilities.hideLoading();
            // });
        }, err => {
            this.utilities.hideLoading();
            this.utilities.errorSnackBar('Unable to get location');
        }).catch((error) => {
            this.utilities.hideLoading();
            this.utilities.errorSnackBar('Unable to get location');


            this.showNoLocation();
        });
        // },err=>{
        //   this.utilities.hideLoading();
        // });
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
        this.utilities.showLoading('Getting Location').then(() => {
            this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
                .then((result: NativeGeocoderResult[]) => {

                    this.utilities.hideLoading();
                    const address: AddressModel = {
                        address: this.generateAddress(result[0]),
                        lat: latitude,
                        long: longitude,
                        country: result[0].countryName,
                        state: result[0].administrativeArea,
                        city: result[0].locality,
                        postalcode: result[0].postalCode
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



        if (this.designId !== 0) {

            if (this.router.url == '/schedule/design/' + this.designId) {
                this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_DESIGN_FORM);
            }
            else if (this.router.url == '/schedule/sales-proposal/' + this.designId) {
                this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_SALES_FORM);
            }

        }
        else {
            if (this.router.url == '/schedule/design') {

                this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_DESIGN_FORM);
            }
            else if (this.router.url == '/schedule/sales-proposal') {
                this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_SALES_FORM);
            }
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
        this.utilities.setScheduleFormEvent(ScheduleFormEvent.SAVE_SURVEY_FORM);
    }

    startSurvey() {

        this.utilities.setScheduleFormEvent(ScheduleFormEvent.START_SURVEY);
    }

    sendDesignForm() {
        if (this.designId == 0) {
            if (this.router.url == '/schedule/design') {
                this.utilities.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
            }
            else if (this.router.url == '/schedule/sales-proposal') {
                this.utilities.setScheduleFormEvent(ScheduleFormEvent.SEND_SALES_FORM);
            }
        }
        else {
            if (this.router.url == '/schedule/design/' + this.designId) {
                this.utilities.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
            }
            else if (this.router.url == '/schedule/sales-proposal/' + this.designId) {
                this.utilities.setScheduleFormEvent(ScheduleFormEvent.SEND_SALES_FORM);
            }
        }
    }
}
