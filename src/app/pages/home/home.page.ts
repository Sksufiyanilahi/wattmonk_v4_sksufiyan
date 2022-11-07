import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { AlertController, MenuController, Platform, ToastController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { DrawerState } from 'ion-bottom-drawer';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { COMETCHAT_CONSTANTS } from 'src/app/services/constants';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
	unreadCount;
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
	count: any;
	deactivateNetworkSwitch: Subscription;
	userData: User;

	public userAccessRights: any = {};
	public isClient: boolean = true;

	constructor(
		private utilities: UtilitiesService,
		private apiService: ApiService,
		private menu: MenuController,
		private nativeGeocoder: NativeGeocoder,
		private platform: Platform,
		private datePipe: DatePipe,
		public storage: StorageService,
		private diagnostic: Diagnostic,
		private alertController: AlertController,
		private geolocation: Geolocation,
		private toastController: ToastController,
		public route: Router,
		private network: NetworkDetectService,
		private iab: InAppBrowser,
		private mixpanelService: MixpanelService,
		private datastorage: Storage,
	) {
		this.userData = this.storage.getUser();
		console.log('this.userData', this.userData);
		this.userRole = this.userData.role.type;
		// this.initializeItems();
		//this.scheduledPage();
		// get access right permission data
		route.events.subscribe((event: any) => {
			if (event.url) {
				if (this.route.url == '/home/design') {
					this.userAccessRights = this.utilities.getUserAccessRights('prelim');
				} else if (this.route.url == '/home/survey') {
					this.userAccessRights = this.utilities.getUserAccessRights('survey');
				}
			}
		});

		this.isClient = this.utilities.isClient();
		console.log('this.isClient', this.isClient);
		this.fetchsurveyprocessjsons();
	}

	fetchsurveyprocessjsons() {
		this.datastorage.get('pvsurveyjson').then((data) => {
			if (!data) {
				this.apiService.fetchJSON(this.storage.getParentId(), 'pv').subscribe((response: any) => {
					this.datastorage.set('pvsurveyjson', response);
				});
			}
		});
	}

	getNotificationCount() {
		this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
			this.unreadCount = count;
		});
	}

	ngOnInit() {
		this.apiService.version.subscribe((versionInfo) => {
			this.update_version = versionInfo;
		});
		this.getNotificationCount();
		this.setupCometChat();
		//this.requestLocationPermission();
		this.updateUserPushToken();
		this.subscription = this.utilities.getBottomBarHomepage().subscribe((value) => {
			this.showFooter = value;
		});
		// if (this.storage.getUser().role.id === ROLES.Surveyor) {
		//   // surveyor will only see survey tab
		//   this.isUserSurveyor = true;
		//   this.isUserDesigner = false;
		//   this.route.navigate(['home/survey']);

		// } else if (this.storage.getUser().role.id === ROLES.Designer) {
		//   // designer will only see design tab
		//   this.isUserSurveyor = false;
		//   this.isUserDesigner = true;
		//   this.route.navigate(['home/design']);

		// } else if (this.storage.getUser().role.id === ROLES.BD || this.storage.getUser().role.id === ROLES.Admin || this.storage.getUser().role.id === ROLES.ContractorAdmin || this.storage.getUser().role.id === ROLES.ContractorSuperAdmin || this.storage.getUser().role.id === ROLES.SuperAdmin) {
		//   // admin will see both tabs
		//   this.isUserSurveyor = true;
		//   this.isUserDesigner = true;
		//   this.route.navigate(['home/design']);
		// }
	}

	updateUserPushToken() {
		this.apiService
			.pushtoken(this.storage.getUserID(), { newpushtoken: localStorage.getItem('pushtoken') })
			.subscribe((data) => { }, (error) => { });
	}

	// getAddIcon(){
	// 	if(){
	// 		return false;
	// 	}
	// 	else{
	// 		return true;
	// 	}
	// }

	ngOnDestroy() {
		// this.subscription.unsubscribe();
		this.deactivateNetworkSwitch.unsubscribe();
	}

	initializeItems() {
		this.items = ['Amsterdam', 'Bogota'];
	}

	openFirst() {
		this.menu.enable(true, 'first');
		this.menu.open('first');
	}

	openEnd() {
		this.menu.open('end');
	}

	openCustom() {
		this.menu.enable(true, 'custom');
		this.menu.open('custom');
	}

	setupCometChat() {
		let userId = this.storage.getUserID();
		const user = new CometChat.User(userId);
		user.setName(this.storage.getUser().firstname + ' ' + this.storage.getUser().lastname);
		const appSetting = new CometChat.AppSettingsBuilder()
			.subscribePresenceForAllUsers()
			.setRegion(COMETCHAT_CONSTANTS.REGION)
			.build();
		CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
			() => {

				// if(this.utilities.currentUserValue != null){
				// You can now call login function.
				CometChat.login(userId, COMETCHAT_CONSTANTS.API_KEY).then(
					(user) => {

					},
					(error) => {

					}
				);
				// }
			},
			(error) => {

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
				return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
			});
		}
	}

	searchDesginAndSurvey(event) {


		if (this.searchbarElement !== '') {
			this.apiService.searchAllDesgin(this.searchbarElement).subscribe(
				(searchModel: any) => {

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
				},
				(error) => {

				}
			);
		} else {
			this.route.navigate(['home/design']);
		}
	}

	getdesigndata(serchTermData: any = { type: '' }) {

		this.name = serchTermData.name;
		this.searchbarElement = this.name;
		if (serchTermData.type == 'design') {
			this.route.navigate(['home/design'], { queryParams: { serchTerm: serchTermData.id } });
		} else if (serchTermData.type == 'survey') {
			this.route.navigate(['home/survey'], { queryParams: { serchTerm: serchTermData.id } });
		} else {
			this.route.navigate(['home/design']);
		}
		this.searchDesginItem = [];
		this.searchSurveyItem = [];
	}

	searchbar() {
		this.route.navigate(['/search-bar']);
	}

	// requestLocationPermission() {
	// 	this.platform.ready().then(() => {
	// 		this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then(
	// 			(mode) => {

	// 				switch (mode) {
	// 					case this.diagnostic.permissionStatus.NOT_REQUESTED:
	// 						// this.goBack();
	// 						break;
	// 					case this.diagnostic.permissionStatus.DENIED_ALWAYS:
	// 						this.showLocationDenied();
	// 						break;
	// 					case this.diagnostic.permissionStatus.DENIED_ONCE:
	// 						// this.goBack();
	// 						break;
	// 					case this.diagnostic.permissionStatus.GRANTED:
	// 						this.fetchLocation();
	// 						break;
	// 					case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
	// 						this.fetchLocation();
	// 						break;
	// 					case 'authorized_when_in_use':
	// 						this.fetchLocation();
	// 						break;
	// 				}
	// 			},
	// 			(rejection) => {

	// 			}
	// 		);
	// 	});
	// }

	// async showLocationDenied() {
	// 	const toast = await this.toastController.create({
	// 		header: 'Error',
	// 		message: 'Location services denied, please enable them manually',
	// 		cssClass: 'my-custom-class',
	// 		buttons: [
	// 			{
	// 				text: 'OK',
	// 				handler: () => {}
	// 			}
	// 		]
	// 	});
	// 	toast.present();
	// }

	// fetchLocation() {
	// 	this.diagnostic.isGpsLocationEnabled().then((status) => {
	// 		if (status === true) {
	// 			// this.utilities.showLoading('Getting Location').then(() => {
	// 			this.getGeoLocation();
	// 			// });
	// 		} else {
	// 			this.askToChangeSettings();
	// 		}
	// 	});
	// }

	// async askToChangeSettings() {
	// 	const toast = await this.toastController.create({
	// 		header: 'Location Disabled',
	// 		message: 'Please enable location services',
	// 		cssClass: 'my-custom-class',
	// 		buttons: [
	// 			{
	// 				text: 'OK',
	// 				handler: () => {
	// 					this.changeLocationSettings();
	// 				}
	// 			},
	// 			{
	// 				text: 'Cancel',
	// 				handler: () => {}
	// 			}
	// 		]
	// 	});
	// 	toast.present();
	// }

	// getGeoLocation() {
	// 	this.geolocation
	// 		.getCurrentPosition()
	// 		.then((resp) => {

	// 			this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
	// 		})
	// 		.catch((error) => {
	// 			this.utilities.errorSnackBar('Unable to get location');

	// 			this.showNoLocation();
	// 		});
	// }

	// getGeoEncoder(latitude, longitude) {
	// 	// this.utilities.hideLoading().then((success) => {
	// 	this.nativeGeocoder
	// 		.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
	// 		.then((result: NativeGeocoderResult[]) => {

	// 			const address: AddressModel = {
	// 				address: this.generateAddress(result[0]),
	// 				lat: latitude,
	// 				long: longitude,
	// 				country: result[0].countryName,
	// 				state: result[0].administrativeArea,
	// 				city: result[0].locality,
	// 				postalcode: result[0].postalCode
	// 			};
	// 			this.utilities.setAddress(address);
	// 		})
	// 		.catch((error: any) => {
	// 			this.showNoLocation();
	// 			alert('Error getting location' + JSON.stringify(error));
	// 		});
	// }

	// generateAddress(addressObj) {
	// 	const obj = [];
	// 	let address = '';
	// 	for (const key in addressObj) {
	// 		obj.push(addressObj[key]);
	// 	}
	// 	obj.reverse();
	// 	for (const val in obj) {
	// 		if (obj[val].length) {
	// 			address += obj[val] + ', ';
	// 		}
	// 	}
	// 	return address.slice(0, -2);
	// }

	// changeLocationSettings() {
	// 	this.diagnostic.switchToLocationSettings();
	// 	this.diagnostic.registerLocationStateChangeHandler((state) => {

	// 		if (this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF) {
	// 			this.checkLocationAccess();
	// 		}
	// 	});
	// }

	// checkLocationAccess() {

	// 	this.diagnostic.isLocationAuthorized().then(
	// 		(success) => {
	// 			this.fetchLocation();
	// 		},
	// 		(error) => {
	// 			this.utilities.errorSnackBar('GPS Not Allowed');
	// 		}
	// 	);
	// }

	// async showNoLocation() {
	// 	const alert = await this.alertController.create({
	// 		header: 'Error',
	// 		subHeader: 'Unable to get location',
	// 		buttons: [
	// 			{
	// 				text: 'OK',
	// 				handler: () => {
	// 					// this.goBack();
	// 				}
	// 			}
	// 		],
	// 		backdropDismiss: false
	// 	});
	// 	await alert.present();
	// }

	ionViewDidEnter() {
		// if (this.version !== this.update_version && this.update_version !== '') {
		// 	setTimeout(() => {
		// 		this.utilities.showAlertBox(
		// 			'Update App',
		// 			'New version of app is available on Play Store. Please update now to get latest features and bug fixes.',
		// 			[
		// 				{
		// 					text: 'Ok',

		// 					handler: () => {
		// 						this.iab.create(
		// 							'https://play.google.com/store/apps/details?id=com.solar.wattmonk',
		// 							'_system'
		// 						);
		// 						this.ionViewDidEnter();
		// 					}
		// 				}
		// 			]
		// 		);
		// 	}, 2000);
		// }
		this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe((data) => {
			this.netSwitch = data;
			let user = this.storage.getUser();
			this.apiService.emitUserNameAndRole(user);
		});

		this.network.networkDisconnect();
		this.network.networkConnect();

		// this.subscription = this.platform.backButton.subscribe(() => {
		// 	if (this.showSearchBar === true) {
		// 		this.showSearchBar = false;
		// 	} else {
		// 		(navigator as any).app.exitApp();
		// 	}
		// });
	}

	setzero() {
		this.unreadCount = 0;
	}

	ionViewWillLeave() {
		this.subscription.unsubscribe();
	}
	scheduledPage() {
		if (this.route.url == '/home/design') {
			// comment on 20220128
			this.mixpanelService.track("ADD_PRELIMDESIGN_PAGE_OPEN", {
			});
			this.utilities.presentPopover('design');
			this.utilities.setDesignDetails(null);
			// this.showToast()
			// this.route.navigate([ '/schedule/design' ]);
		} else if (this.route.url == '/home/survey') {
			this.utilities.setDesignDetails(null);
			this.route.navigate(['/schedule/survey']);
		}
	}

	async showToast() {
		const toast = await this.toastController.create({
			message: 'Kindly use web platform for adding a new request.',
			cssClass: 'my-custom-class',
			duration: 4000
		});
		await toast.present();
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
