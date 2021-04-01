import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UtilitiesService} from '../utilities.service';
import {ApiService} from '../api.service';
import {DatePipe} from '@angular/common';
import {StorageService} from '../storage.service';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {AlertController, Platform, ToastController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import {AddressModel} from '../model/address.model';
import {Subscription} from 'rxjs';
import {DrawerState} from 'ion-bottom-drawer';
import {CometChat} from '@cometchat-pro/cordova-ionic-chat';
import {Router} from '@angular/router';
import {COMETCHAT_CONSTANTS, version} from '../contants';
import {NetworkdetectService} from '../networkdetect.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {UserData} from '../model/userData.model';


@Component({
  selector: 'app-analystoverview',
  templateUrl: './analystoverview.page.html',
  styleUrls: ['./analystoverview.page.scss'],
})
export class AnalystoverviewPage implements OnInit, OnDestroy {
  private version = version;
  @Output() ionInput = new EventEmitter();


  searchQuery = '';
  searchbarElement = '';
  items: string[];

  //isUserSurveyor = false ;
  //isUserDesigner= false ;
  //isUserAnalyst = false;

  showSearchBar = false;
  showHome = true;

  showFooter = true;
  // Geocoder configuration
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  searchDesginItem: any = [];
  searchSurveyItem: any = [];

  private subscription: Subscription;
  drawerState = DrawerState.Docked;
  name: any;
  userRole: any;
  netSwitch: any;
  update_version: string;
  unreadCount: any;
  userData: UserData
  deacctivateNetworkSwitch: Subscription;

  constructor(private utilities: UtilitiesService,
              private apiService: ApiService,
              private nativeGeocoder: NativeGeocoder,
              private platform: Platform,
              private datePipe: DatePipe,
              private storage: StorageService,
              private diagnostic: Diagnostic,
              private alertController: AlertController,
              private geolocation: Geolocation,
              private toastController: ToastController,
              public route: Router,
              private network: NetworkdetectService,
              private iab: InAppBrowser) {

  }

  getNotificationCount() {
    this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
      this.unreadCount = count;
    });


  }


  ngOnInit() {

    this.userData = this.storage.getUser();

    this.apiService.emitUserNameAndRole(this.userData);
    this.getNotificationCount();
    this.setupCometChat();
    this.requestLocationPermission();
    this.updateUserPushToken();
    this.route.navigate(['analystoverview/permitdesign']);
    this.subscription = this.utilities.getBottomBarHomepage().subscribe((value) => {
      this.showFooter = value;
    });


    //  this.isUserAnalyst = true;
    //  // this.isUserSurveyor = true;
    //   //this.isUserDesigner = true;


  }

  updateUserPushToken() {
    this.apiService.pushtoken(this.storage.getUserID(), {"newpushtoken": localStorage.getItem("pushtoken")}).subscribe((data) => {
    }, (error) => {
    });
  }

  setzero() {
    this.unreadCount = 0;
  }


  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.deacctivateNetworkSwitch.unsubscribe();
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }

  setupCometChat() {
    let userId = this.storage.getUserID();
    const user = new CometChat.User(userId);
    user.setName(this.storage.getUser().firstname + ' ' + this.storage.getUser().lastname);
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
      () => {
        // if(this.utilities.currentUserValue != null){
        // You can now call login function.
        CometChat.login(userId, COMETCHAT_CONSTANTS.API_KEY).then(
          (user) => {
          },
          error => {
          }
        );
        // }
      },
      error => {
      }
    );
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

  searchDesginAndSurvey(event) {



    if (this.searchbarElement !== '') {
      this.apiService.searchAllDesgin(this.searchbarElement).subscribe((searchModel: any) => {
        this.searchDesginItem = [];
        this.searchSurveyItem = [];
        if (event.target.value !== '') {

          searchModel.filter((element: any) => {
            if (element.type == 'design') {
              this.searchDesginItem = searchModel;

            } else {
              this.searchSurveyItem = searchModel;
            }
          });
        } else {
          this.searchDesginItem = [];
          this.searchSurveyItem = [];
        }
      }, (error) => {
      });
    } else {
      this.route.navigate(['homepage/design']);
    }

  }

  getdesigndata(serchTermData: any = {'type': ''}) {
    this.name = serchTermData.name;
    this.searchbarElement = this.name;
    if (serchTermData.type == 'design') {
      this.route.navigate(['homepage/design'], {queryParams: {serchTerm: serchTermData.id}});
    } else if (serchTermData.type == 'survey') {
      this.route.navigate(['homepage/survey'], {queryParams: {serchTerm: serchTermData.id}});
    } else {
      this.route.navigate(['homepage/design']);
    }
    this.searchDesginItem = [];
    this.searchSurveyItem = [];
  }

  searchbar() {
    this.route.navigate(['/search-bar1']);
  }

  requestLocationPermission() {
    this.platform.ready().then(() => {
      this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
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
        // this.utilities.showLoading('Getting Location').then(() => {
        this.getGeoLocation();
        // });
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
      this.utilities.errorSnackBar('Unable to get location');
      this.showNoLocation();
    });

  }

  getGeoEncoder(latitude, longitude) {
    // this.utilities.hideLoading().then((success) => {
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
        this.utilities.setAddress(address);
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

    this.deacctivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
      this.netSwitch = data;

    })

    this.network.networkDisconnect();
    this.network.networkConnect();
    // this.subscription = this.platform.backButton.subscribe(() => {
    //   if (this.showSearchBar === true) {
    //     this.showSearchBar = false;
    //   } else {
    //     (navigator as any).app.exitApp();
    //   }
    // });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();

  }

  scheduledPage() {

    if (this.route.url == '/analystoverview/design') {
      this.route.navigate(['/schedule/design'])
    } else {
      this.route.navigate(['/schedule/survey'])
    }
  }

  showHom() {
    this.showHome = true;
    this.showSearchBar = false;
    this.searchSurveyItem = [];
    this.searchDesginItem = [];
    this.searchbarElement = '';
    this.getdesigndata();
  }

  onClick() {
    this.showHome = false;
    this.showSearchBar = true;
  }
}
