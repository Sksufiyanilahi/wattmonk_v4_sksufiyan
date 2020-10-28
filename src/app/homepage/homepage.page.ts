import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { StorageService } from '../storage.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AddressModel } from '../model/address.model';
import { Subscription } from 'rxjs';
import { DrawerState } from 'ion-bottom-drawer';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { COMET_CHAT_AUTH_KEY } from '../model/constants';
import { Router } from '@angular/router';
import { ROLES } from '../contants';
import { NetworkdetectService } from '../networkdetect.service';
import { environment } from 'src/environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit, OnDestroy {
  private version = environment.version;
  @Output() ionInput = new EventEmitter();


  searchQuery = '';
  searchbarElement = '';
  items: string[];
  isUserSurveyor = false;
  isUserDesigner = false;

  showSearchBar = false;
  showHome = true;

  showFooter = true;
  // Geocoder configuration
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  searchDesginItem: [] = [];
  searchSurveyItem: [] = [];

  private subscription: Subscription;
  drawerState = DrawerState.Docked;
  name: any;
  userRole: any;
  netSwitch: any;
  update_version: string;

  constructor(
    private utilities: UtilitiesService,
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
    private network:NetworkdetectService,
    private iab:InAppBrowser
  ) {
    // this.initializeItems();
    //this.scheduledPage();
  }

  ngOnInit() {
    this.apiService.version.subscribe(versionInfo=>{
    this.update_version = versionInfo;
  })
    this.setupCometChatUser();
    this.requestLocationPermission();
    this.updateUserPushToken();
    this.subscription = this.utilities.getBottomBarHomepage().subscribe((value) => {
      this.showFooter = value;
    });
    if (this.storage.getUser().role.id === ROLES.Surveyor) {
      // surveyor will only see survey tab
      this.isUserSurveyor = true;
      this.isUserDesigner = false;
      this.route.navigate(['homepage/survey']);

    } else if (this.storage.getUser().role.id === ROLES.Designer) {
      // designer will only see design tab
      this.isUserSurveyor = false;
      this.isUserDesigner = true;
      this.route.navigate(['homepage/design']);

    } else if (this.storage.getUser().role.id === ROLES.BD || this.storage.getUser().role.id === ROLES.Admin || this.storage.getUser().role.id === ROLES.ContractorAdmin || this.storage.getUser().role.id === ROLES.ContractorSuperAdmin || this.storage.getUser().role.id === ROLES.SuperAdmin) {
      // admin will see both tabs
      this.isUserSurveyor = true;
      this.isUserDesigner = true;
      this.route.navigate(['homepage/design']);
    }
  }

  updateUserPushToken(){
    this.apiService.pushtoken(this.storage.getUserID(), {"newpushtoken":localStorage.getItem("pushtoken")}).subscribe((data) => {
    }, (error) => {
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }

  setupCometChatUser() {
    const user = new CometChat.User(this.storage.getUserID());
    user.setName(this.storage.getUser().firstname + ' ' + this.storage.getUser().lastname);
    CometChat.createUser(user, COMET_CHAT_AUTH_KEY).then(
      (user) => {
        console.log('user created', user);
      }, error => {
        console.log('error', error);
      }
    );
    CometChat.login(this.storage.getUserID(), COMET_CHAT_AUTH_KEY).then(
      (user) => {
        console.log('Login Successful:', { user });
      },
      error => {
        console.log('Login failed with exception:', { error });
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

    console.log(event, this.searchbarElement);


    if (this.searchbarElement !== '') {
      this.apiService.searchAllDesgin(this.searchbarElement).subscribe((searchModel: any) => {
        // console.log(searchModel);
        this.searchDesginItem = [];
        this.searchSurveyItem = [];
        if (event.target.value !== '') {

          searchModel.filter((element: any) => {
            if (element.type == 'design') {
              this.searchDesginItem = searchModel;
              // console.log(this.searchDesginItem);

            } else {    
                this.searchSurveyItem = searchModel;
            }
          });
          console.log(this.searchDesginItem);
        } else {
          this.searchDesginItem = [];
          this.searchSurveyItem = [];
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.route.navigate(['homepage/design']);
    }

  }

  getdesigndata(serchTermData: any = { 'type': '' }) {
    console.log(serchTermData.name);
    this.name = serchTermData.name;
    this.searchbarElement = this.name;
    if (serchTermData.type == 'design') {
      this.route.navigate(['homepage/design'], { queryParams: { serchTerm: serchTermData.id } });
    } else if (serchTermData.type == 'survey') {
      this.route.navigate(['homepage/survey'], { queryParams: { serchTerm: serchTermData.id } });
    } else {
      this.route.navigate(['homepage/design']);
    }
    this.searchDesginItem = [];
    this.searchSurveyItem = [];
  }

  searchbar(){
    this.route.navigate(['/search-bar1']);
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
      console.log('resp', resp);
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
        console.log('resu', result);
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
    if(this.version !== this.update_version && this.update_version !==''){
        
      setTimeout(()=>{
    
        this.utilities.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
          text:'Ok',
        
          handler:()=>{
            this.iab.create('https://play.google.com/store/apps/details?id=net.one97.paytm',"_system");
           this.ionViewDidEnter();
          }
        }]);
      },2000)
    }
    this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);
      
    })

this.network.networkDisconnect();
this.network.networkConnect();
    this.subscription = this.platform.backButton.subscribe(() => {
      if (this.showSearchBar === true) {
        this.showSearchBar = false;
      } else {
        (navigator as any).app.exitApp();
      }
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();

  }
  scheduledPage(){
    if(this.route.url=='/homepage/design'){
      this.route.navigate(['/schedule/design'])
    }else{
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
