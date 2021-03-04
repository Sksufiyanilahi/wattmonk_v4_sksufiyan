import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NetworkdetectService } from '../networkdetect.service';
import { Subscription } from 'rxjs';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DrawerState } from 'ion-bottom-drawer';
import { DesginDataModel } from '../model/design.model';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssigneeModel } from '../model/assignee.model';
import { ErrorModel } from '../model/error.model';
import { DatePipe } from '@angular/common';
import { StorageService } from '../storage.service';
import { DeclinepagePage } from 'src/app/declinepage/declinepage.page';
import * as moment from 'moment';
import { ResendpagedialogPage } from 'src/app/resendpagedialog/resendpagedialog.page';
import{SocialSharing} from '@ionic-native/social-sharing/ngx';
import { EmailModelPage } from 'src/app/email-model/email-model.page';
import {Storage} from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AddressModel } from '../model/address.model';
import { Intercom } from 'ng-intercom';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { COMETCHAT_CONSTANTS, intercomId,version } from '../contants';
import { MixpanelService } from '../utilities/mixpanel.service';


@Component({
  selector: 'app-permithomepage',
  templateUrl: './permithomepage.page.html',
  styleUrls: ['./permithomepage.page.scss'],
})
export class PermithomepagePage implements OnInit {
  private version = version;

  private subscription: Subscription;

  drawerState = DrawerState.Bottom;
  showSearchBar = false;
  update_version: string;
  netSwitch: any;
  unreadCount;
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };


  //listOfDesignDataHelper: DesginDataHelper[] = [];
  listOfDesignsData: DesginDataModel[] = [];
  private refreshSubscription: Subscription;
  private routeSubscription: Subscription;
  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  assignForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];
  listOfAssignees2: AssigneeModel[] = [];
  designId = 0;
  disableAccept="true"
  showBottomDraw: boolean = false;
  roleType: any;
  myFiles: string[] = [];
  segments:any;
  listOfDesigns: DesginDataModel[];
  private DesignRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;
  listOfDesignsHelper: any[];
  overdue:any;
  todaysdate: string;
  userData: any;
  designerData: any;
  assigneeData: any;
  selectedDesigner: any;
 // netSwitch: boolean;
 reviewAssignedTo:any;
 showFooter = true;
  deactivateNetworkSwitch: Subscription;

  constructor(private apiService:ApiService,
              private utils:UtilitiesService,
              private iab:InAppBrowser,
              private network:NetworkdetectService,
              private platform: Platform,
              private route:Router,
              private launchNavigator: LaunchNavigator,
              private datePipe: DatePipe,
              private cdr: ChangeDetectorRef,
              private storageservice:StorageService,
              private storage:Storage,
              public alertController: AlertController,
              public modalController: ModalController,
              private socialsharing: SocialSharing,
              private formBuilder: FormBuilder,
              private diagnostic: Diagnostic,
              private toastController: ToastController,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private intercom:Intercom,
              private mixpanelService:MixpanelService
              ) {
                this.setupCometChatUser();
              }


              getNotificationCount(){
                this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{
                  console.log("count",count);
                 this.unreadCount= count;
                });


              }



  ngOnInit() {
    this.intercomModule();
    this.setupCometChatUser();
    this.utils.showHideIntercom(false);
    this.getNotificationCount();
    this.apiService.version.subscribe(versionInfo=>{
      this.update_version = versionInfo;
       });
       this.route.navigate(['permithomepage/permitdesign']);

       this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
        this.showFooter = value;
      });
  }
  setupCometChatUser() {
    debugger;
    let userId = this.storageservice.getUserID();
    this.userData = this.storageservice.getUser();
    const user = new CometChat.User(userId);
    user.setName(this.storageservice.getUser().firstname + ' ' + this.storageservice.getUser().lastname);
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        // if(this.utilities.currentUserValue != null){
          // You can now call login function.
          CometChat.login(userId,  COMETCHAT_CONSTANTS.API_KEY).then(
            (user) => {
              console.log('Login Successful:', { user });
            },
            error => {
              console.log('Login failed with exception:', { error });
            }
          );
      // }
      },
      error => {
        console.log('Initialization failed with error:', error);
      }
    );

  }

  ionViewDidEnter() {
    debugger;
    if(this.version !== this.update_version && this.update_version !==''){

      setTimeout(()=>{

        this.utils.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
          text:'Ok',

          handler:()=>{
            this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk',"_system");
           this.ionViewDidEnter();
          }
        }]);
      },2000)
    }
    this.deactivateNetworkSwitch=  this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      this.utils.showHideIntercom(false);
      console.log(this.netSwitch);
      let user= this.storageservice.getUser();
      this.apiService.emitUserNameAndRole(user);

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
    this.mixpanelService.setUserDetails(this.userData.email,this.userData.firstname+" "+this.userData.lastname,this.userData.id)
    this.mixpanelService.track("PERMITDESIGN_PAGE_OPEN", {
      $id: this.userData.id,
      $email: this.userData.email,
      $name: this.userData.firstname + this.userData.lastname
    });
  }

  scheduledPage(){
    this.mixpanelService.track("ADD_PERMITDESIGN_PAGE_OPEN", {
    });
    this.route.navigate(['/permitschedule']);

    }

    searchbar(){
      this.route.navigate(['/search-bar1']);
    }

    setzero(){
      this.unreadCount= 0;
    }

    ////////////////////////////////////////////////

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
        this.utils.errorSnackBar('Unable to get location');
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
              // this.goBack();
            }
          }
        ],
        backdropDismiss: false
      });
      await alert.present();
    }

    ngOndestroy(){
      this.deactivateNetworkSwitch.unsubscribe();
    }

    intercomModule(){
      // this.intercom.boot({
      //   app_id: intercomId,
      //   // Supports all optional configuration.
      //   widget: {
      //     "activator": "#intercom"
      //   }
      // });
    }






}
