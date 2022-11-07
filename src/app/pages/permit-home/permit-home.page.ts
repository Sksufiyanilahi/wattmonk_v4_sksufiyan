import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DrawerState } from 'ion-bottom-drawer';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';

import { FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';

import { DesginDataModel } from 'src/app/models/design.model';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { COMETCHAT_CONSTANTS } from 'src/app/services/constants';
import { AddressModel } from 'src/app/models/address.model';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-permit-home',
    templateUrl: './permit-home.page.html',
    styleUrls: ['./permit-home.page.scss'],
})
export class PermitHomePage implements OnInit {

    private subscription: Subscription;
    public drawerState = DrawerState.Bottom;
    public showSearchBar = false;
    public update_version: string;
    public netSwitch: any;
    public unreadCount;
    public geoEncoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    public listOfDesignsData: DesginDataModel[] = [];
    private refreshSubscription: Subscription;
    private routeSubscription: Subscription;
    public today: any;
    public options: LaunchNavigatorOptions = {
        start: '',
        app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    public assignForm: FormGroup;
    public listOfAssignees: AssigneeModel[] = [];
    public listOfAssignees2: AssigneeModel[] = [];
    public designId = 0;
    public disableAccept = "true"
    public showBottomDraw: boolean = false;
    public roleType: any;
    public myFiles: string[] = [];
    public segments: any;
    public listOfDesigns: DesginDataModel[];
    private DesignRefreshSubscription: Subscription;
    private dataRefreshSubscription: Subscription;
    public listOfDesignsHelper: any[];
    public overdue: any;
    public todaysdate: string;
    public userData: any;
    public designerData: any;
    public assigneeData: any;
    public selectedDesigner: any;
    public reviewAssignedTo: any;
    public showFooter = true;
    public deactivateNetworkSwitch: Subscription;
    public userAccessRights: any = {};
    public isClient: boolean = true;

    constructor(
        private apiService: ApiService,
        public utils: UtilitiesService,
        private iab: InAppBrowser,
        private network: NetworkDetectService,
        private platform: Platform,
        private route: Router,
        private launchNavigator: LaunchNavigator,
        private datePipe: DatePipe,
        private cdr: ChangeDetectorRef,
        private storageservice: StorageService,
        private storage: Storage,
        public alertController: AlertController,
        public modalController: ModalController,
        private socialsharing: SocialSharing,
        private formBuilder: FormBuilder,
        private diagnostic: Diagnostic,
        private toastController: ToastController,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private mixpanelService: MixpanelService
    ) {
        // get access right permission data
        this.userAccessRights = this.utils.getUserAccessRights('permit');
    }

    ngOnInit() {
        this.setupCometChatUser();
        this.getNotificationCount();
        this.apiService.version.subscribe(versionInfo => {
            this.update_version = versionInfo;
        });
        this.route.navigate(['permit-home/permit-design']);

        this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
            this.showFooter = value;
        });
    }

    getNotificationCount() {
        this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
            this.unreadCount = count;
        });
        this.isClient = this.utils.isClient();
    }

    setupCometChatUser() {
        ;
        let userId = this.storageservice.getUserID();
        this.userData = this.storageservice.getUser();
        const user = new CometChat.User(userId);
        user.setName(this.storageservice.getUser().firstname + ' ' + this.storageservice.getUser().lastname);
        const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
        CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(() => {
            // You can now call login function.
            CometChat.login(userId, COMETCHAT_CONSTANTS.API_KEY).then((user) => {

            }, (error) => {

            });
        }, (error) => {

        });
    }

    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;

            let user = this.storageservice.getUser();
            this.apiService.emitUserNameAndRole(user);
        });

        this.network.networkDisconnect();
        this.network.networkConnect();

        this.mixpanelService.setUserDetails(this.userData.email, this.userData.firstname + " " + this.userData.lastname, this.userData.id)
        this.mixpanelService.track("PERMITDESIGN_PAGE_OPEN", {
            $id: this.userData.id,
            $email: this.userData.email,
            $name: this.userData.firstname + this.userData.lastname
        });
    }

    async scheduledPage() {
        this.mixpanelService.track("ADD_PERMITDESIGN_PAGE_OPEN", {});
        this.route.navigate(['/permit-schedule']);
    }

    searchbar() {
        this.route.navigate(['/search-bar']);
    }

    setzero() {
        this.unreadCount = 0;
    }

    requestLocationPermission() {
        this.platform.ready().then(() => {
            this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
                switch (mode) {
                    case this.diagnostic.permissionStatus.NOT_REQUESTED:
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                        this.showLocationDenied();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ONCE:
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
        });
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
                    }
                }
            ]
        });
        toast.present();
    }

    fetchLocation() {
        this.diagnostic.isGpsLocationEnabled().then((status) => {
            if (status === true) {
                this.getGeoLocation();
            } else {
                this.askToChangeSettings();
            }
        });
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
                    }
                }
            ]
        });
        toast.present();
    }

    getGeoLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            this.utils.errorSnackBar('Unable to get location');
            this.showNoLocation();
        });
    }

    getGeoEncoder(latitude, longitude) {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result: NativeGeocoderResult[]) => {
                const address: AddressModel = {
                    address: this.generateAddress(result[0]),
                    lat: latitude,
                    long: longitude,
                    country: result[0].countryName,
                    state: result[0].administrativeArea,
                    city: result[0].locality,
                    postalcode: result[0].postalCode
                };
                this.utils.setAddress(address);
            })
            .catch((error: any) => {
                this.showNoLocation();
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
            if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF)) {
                this.checkLocationAccess();
            }
        });
    }

    checkLocationAccess() {
        this.diagnostic.isLocationAuthorized().then((success) => {
            this.fetchLocation();
        }, (error) => {
            this.utils.errorSnackBar('GPS Not Allowed');
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
                        
                    }
                }
            ],
            backdropDismiss: false
        });
        await alert.present();
    }

    ngOndestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
    }

}
