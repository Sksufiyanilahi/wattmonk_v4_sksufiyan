import { EventEmitter, Injectable, Output } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { SuccessModalComponent } from './utilities/success-modal/success-modal.component';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ScheduleFormEvent } from './model/constants';
import { AddressModel } from './model/address.model';
import { AssigneeModel } from './model/assignee.model';
import * as moment from 'moment';
import { User } from './model/user.model';
import { LoginModel } from './model/login.model';
import { StorageService } from './storage.service';
import { Intercom } from 'ng-intercom';
import { NumberOnlyDirective } from './schedule/number.directive';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMETCHAT_CONSTANTS } from './contants.prod';

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {
	guid$: Observable<any>;
	private myMethodSubject = new Subject<any>();

	loading: HTMLIonLoadingElement;
	isLoading = false;
	address = new BehaviorSubject<AddressModel>({
		address: '',
		lat: 0,
		long: 0,
		country: '',
		state: '',
		city: '',
		postalcode: ''
	});
	staticAddress = new BehaviorSubject<string>('');
	saveScheduleForm = new BehaviorSubject<ScheduleFormEvent>(ScheduleFormEvent.NO_EVENT);
	homepageDesignRefresh = new BehaviorSubject<boolean>(false);
	homepageSurveyRefresh = new BehaviorSubject<boolean>(false);
	homepagePermitRefresh = new BehaviorSubject<boolean>(false);
	surveyDetailsRefresh = new BehaviorSubject<boolean>(false);
	designDetailsRefresh = new BehaviorSubject<boolean>(false);
	peStampRefresh = new BehaviorSubject<boolean>(false);
	permitdesignDetailsRefresh = new BehaviorSubject<boolean>(false);
	//permitdesignDetailsRefresh = new BehaviorSubject<boolean>(false);
	showBottomBarHomepage = new BehaviorSubject<boolean>(true);
	uploadfile = new BehaviorSubject<string>('');
	manualInput = new BehaviorSubject<string>('');
	paymentMode = new BehaviorSubject<string>('');
	couponid = new BehaviorSubject<number>(null);

	dataRefresh = new BehaviorSubject<boolean>(false);
	private currentUserSubject: BehaviorSubject<LoginModel>;
	public currentUser: Observable<LoginModel>;
	user: any;
	////
	private addUpper = true;
	private addNumbers = true;
	private addSymbols = false;
	private passwordLength = 6;
	designlistofdesignDetail: any;
	groupid: any;
	callData: any;

	toast:any;

	constructor(
		public loadingController: LoadingController,
		private toastController: ToastController,
		private alertController: AlertController,
		private modalController: ModalController,
		private storageService: StorageService,
		private intercom: Intercom,
		private router: Router,
		private navCtrl: NavController,
		private location: Location
	) {
		this.guid$ = this.myMethodSubject.asObservable();
		this.listencall();
		this.user = this.storageService.getUser();
		this.currentUserSubject = new BehaviorSubject<LoginModel>(this.user);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	guid(data) {
		console.log(data); // I have data! Let's return it so subscribers can use it!
		// we can do stuff with data if we want

		this.groupid = data;
		this.myMethodSubject.next(data);
	}

	public get currentUserValue(): LoginModel {
		return this.currentUserSubject.value;
	}

	getPaymentMode(): BehaviorSubject<string> {
		return this.paymentMode;
	}

	setPaymentMode(paymentMode: string) {
		this.paymentMode.next(paymentMode);
	}

	getCouponId(): BehaviorSubject<number> {
		return this.couponid;
	}

	setCouponId(couponId: number) {
		this.couponid.next(couponId);
	}

	getAddressObservable(): BehaviorSubject<AddressModel> {
		return this.address;
	}

	setAddress(address: AddressModel) {
		this.address.next(address);
	}

	getHomepageDesignRefresh(): BehaviorSubject<boolean> {
		return this.homepageDesignRefresh;
	}

	setHomepageDesignRefresh(refresh: boolean) {
		this.homepageDesignRefresh.next(refresh);
	}

	getHomepagePermitRefresh(): BehaviorSubject<boolean> {
		return this.homepagePermitRefresh;
	}

	setHomepagePermitRefresh(refresh: boolean) {
		this.homepagePermitRefresh.next(refresh);
	}

	getHomepageSurveyRefresh(): BehaviorSubject<boolean> {
		return this.homepageSurveyRefresh;
	}

	sethomepageSurveyRefresh(refresh: boolean) {
		this.homepageSurveyRefresh.next(refresh);
	}

	getPeStampRefresh(): BehaviorSubject<boolean> {
		return this.peStampRefresh;
	}

	setPeStampRefresh(refresh: boolean) {
		this.peStampRefresh.next(refresh);
	}

	getDataRefresh(): BehaviorSubject<boolean> {
		return this.dataRefresh;
	}

	setDataRefresh(refresh: boolean) {
		this.dataRefresh.next(refresh);
	}

	getSurveyDetailsRefresh(): BehaviorSubject<boolean> {
		return this.surveyDetailsRefresh;
	}

	setSurveyDetailsRefresh(refresh: boolean) {
		this.surveyDetailsRefresh.next(refresh);
	}

	getBottomBarHomepage(): BehaviorSubject<boolean> {
		return this.showBottomBarHomepage;
	}

	setBottomBarHomepage(value: boolean) {
		this.showBottomBarHomepage.next(value);
	}

	getDesignDetailsRefresh(): BehaviorSubject<boolean> {
		return this.designDetailsRefresh;
	}

	setDesignDetailsRefresh(value: boolean) {
		this.designDetailsRefresh.next(value);
	}

	getPermitDesignDetailsRefresh(): BehaviorSubject<boolean> {
		return this.permitdesignDetailsRefresh;
	}
	setPermitDesignDetailsRefresh(value: boolean) {
		this.permitdesignDetailsRefresh.next(value);
	}

	getdesignDetails() {
		return this.designlistofdesignDetail;
	}

	setDesignDetails(data) {
		this.designlistofdesignDetail = data;
	}
	// getPermitDesignDetailsRefresh(): BehaviorSubject<boolean> {
	//   return this.permitdesignDetailsRefresh;
	// }

	// setPermitDesignDetailsRefresh(value: boolean) {
	//   this.permitdesignDetailsRefresh.next(value);
	// }

	getScheduleFormEvent(): BehaviorSubject<ScheduleFormEvent> {
		return this.saveScheduleForm;
	}

	setScheduleFormEvent(event: ScheduleFormEvent) {
		this.saveScheduleForm.next(event);
		this.saveScheduleForm.next(ScheduleFormEvent.NO_EVENT);
	}

	async showLoading(message?: string) {
		let finalMessage = '';
		if (message) {
			finalMessage = message;
		} else {
			finalMessage = 'Please Wait';
		}
		this.loading = await this.loadingController.create({
			message: finalMessage
		});
		return this.loading.present();
	}

	async showLoadingWithPullRefreshSupport(showPopup: boolean, message?: string) {
		if (showPopup) {
			let finalMessage = '';
			if (message) {
				finalMessage = message;
			} else {
				finalMessage = 'Please Wait';
			}
			this.loading = await this.loadingController.create({
				message: finalMessage
			});
			return this.loading.present();
		} else {
			return Promise.resolve();
		}
	}

	showHideIntercom(value) {
		this.intercom.update({
			hide_default_launcher: value
		});
	}

	setLoadingMessage(message: string) {
		this.loading.message = message;
	}

	hideLoading(): Promise<boolean> {
		return this.loading.dismiss();
	}

	hideLoadingWithPullRefreshSupport(showPopup: boolean): Promise<boolean> {
		if (showPopup) {
			return this.loading.dismiss();
		} else {
			return Promise.resolve(true);
		}
	}

	async showAlert(message) {
		const alert = await this.alertController.create({
			header: 'Error',
			message,
			buttons: [ 'OK' ]
		});

		await alert.present();
	}

	async showSuccessModal(successMessage: string): Promise<HTMLIonModalElement> {
		const modal = await this.modalController.create({
			component: SuccessModalComponent,
			componentProps: {
				message: successMessage
			}
		});
		return modal;
	}

	capitalizeWord(word: string): string {
		if (!word) {
			return word;
		}
		return word[0].toUpperCase() + word.substr(1).toLowerCase();
	}

	async showSnackBar(message) {
		this.hideLoading();
		const toast = await this.toastController.create({
			message,
			duration: 2000,
			cssClass: 'my-custom-class'
		});
		await toast.present();
	}

	async errorSnackBar(message) {
		this.hideLoading();
		const toast = await this.toastController.create({
			message,
			duration: 2000,
			cssClass: 'my-custom-error-class'
		});
		await toast.present();
	}

	async uploadingSnackBar(message) {
		//this.hideLoading();
		//const toast = await this.toastController.create({
			console.log("hii")
		this.toast = await this.toastController.create({
			message,
			//duration: 2000,
			cssClass: 'my-custom-class'
		});
		await this.toast.present();
	}

	 async hideUploadingLoading() {
		 //that = this;
		 console.log("hello");
	await this.toast.dismiss();
	}

	setStaticAddress(address: string) {
		this.staticAddress.next(address);
	}

	getStaticAddress(): BehaviorSubject<string> {
		return this.staticAddress;
	}

	getBlobFromImageData(dataURI): Blob {
		// convert base64 to raw binary data held in a string
		const byteString = atob(dataURI.split(',')[1]);
		// separate out the mime component
		const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to an ArrayBuffer
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ ab ], { type: mimeString });
	}

	getJobTypeName(type) {
		if (type == 'pvbattery') {
			return 'PV + Battery';
		} else if (type == 'battery') {
			return 'Battery';
		} else {
			return 'PV';
		}
	}

	getPestampTypeName(type) {
		if (type == 'structural') {
			return 'Structural';
		} else if (type == 'electrical') {
			return 'Electrical';
		} else {
			return 'Both';
		}
	}

	getRemainingTime(endtime: string) {
		var now = new Date();
		var t = Date.parse(endtime) - Date.parse(now.toString());
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		if (hours > 0 || minutes > 0) {
			return '' + hours + 'h : ' + minutes + 'm';
		} else {
			return '0h : 0m';
		}
	}

	b64toBlob(b64Data) {
		let contentType = b64Data.split(',')[0].split(':')[1].split(';')[0] || '';
		var sliceSize = 256;

		var byteCharacters = atob(b64Data.split(',')[1]);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);
			var byteNumbers = new Array(slice.length);

			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		return new Blob(byteArrays, { type: contentType });
	}

	b64tBlob(b64Data) {
		let contentType = 'image/jpg';
		let sliceSize = 512;
		b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
		let byteCharacters = atob(b64Data);
		let byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);
			var byteNumbers = new Array(slice.length);

			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		return new Blob(byteArrays, { type: contentType });
	}

	async showAlertBox(header, message, button?) {
		const alert = await this.alertController.create({
			header: header,
			message: message,
			buttons: button,
			backdropDismiss: false
		});

		await alert.present();
	}

	formatDateInTimeAgo(datestring: string) {
		return moment(datestring, 'YYYY-MM-DD HH:mm:ss GMT Z').fromNow();
	}

	isDatePassed(datestring: string) {
		var checkdate = moment(datestring, 'YYYYMMDD');
		var todaydate = moment(new Date(), 'YYYYMMDD');
		var lateby = todaydate.diff(checkdate, 'days');
		if (lateby > 0) {
			return true;
		} else {
			return false;
		}
	}

	getTheLatebyString(datestring: string) {
		var start = moment(datestring, 'YYYYMMDD');
		var end = moment(new Date(), 'YYYYMMDD');
		var lateby = end.diff(start, 'days');
		if (lateby == 0) {
			return 'few minutes';
		} else if (lateby == 1) return 'a day';
		else if (lateby < 30 && lateby > 0) return lateby + ' days';
		else if (lateby == 30) return 'a month';
		else if (lateby > 30 && lateby < 365) return lateby + ' months';
		else if (lateby == 365) return 'an year';
		else {
			return 'few minutes';
		}
	}

	getRoleNames(name) {
		if (this.user.role.name == 'ContractorSuperAdmin' || this.user.role.name == 'ContractorSuperAdmin') {
			name = 'SuperAdmin';
			return name;
		} else if (this.user.role.name == 'WattmonkAdmin') {
			name = 'Admin';
			return name;
		} else {
			return this.user.role.name;
		}
	}

	randomPass() {
		var lower = 'abcdefghijklmnopqrstuvwxyz';
		var upper = this.addUpper ? lower.toUpperCase() : '';
		var nums = this.addNumbers ? '0123456789' : '';
		var symbols = this.addSymbols ? "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" : '';
		var all = lower + upper + nums + symbols;
		while (true) {
			var pass = '';
			for (var i = 0; i < this.passwordLength; i++) {
				pass += all[(Math.random() * all.length) | 0];
			}
			// criteria:
			if (!/[a-z]/.test(pass)) continue; // lowercase is a must
			if (this.addUpper && !/[A-Z]/.test(pass)) continue; // check uppercase
			if (this.addSymbols && !/\W/.test(pass)) continue; // check symbols
			if (this.addNumbers && !/\d/.test(pass)) continue; // check nums
			return pass; // all good
		}
	}

	// getNotificationCount(){
	//   this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{
	//     console.log("count",count);
	//     // this.unreadCount.next(count);
	//   });

	// this.unreadCount.subscribe(data=>{
	//   this.count = data;
	// })

	listencall() {
		var listnerID = this.groupid;
		const that = this;
		CometChat.addCallListener(
			listnerID,
			new CometChat.CallListener({
				onIncomingCallReceived(call) {
					console.log('Incoming call:', call);
					that.callData = call;
					// if(call.status=='initiated'){
					that.router.navigate([ '/', 'callingscreen' ]);
					// }
					// Handle incoming call
				},
				onOutgoingCallAccepted(call) {
					console.log('Outgoing call accepted:', call);
					that.callData = call;
					// Outgoing Call Accepted
				},
				onOutgoingCallRejected(call) {
					console.log('Outgoing call rejected:', call);
					that.callData = call;
					// Outgoing Call Rejected
					that.navCtrl.pop();
				},
				onIncomingCallCancelled(call) {
					console.log('Incoming call calcelled:', call);
					that.callData = call;

					// that.location.back();
					that.navCtrl.pop();
				}
			})
		);
	}

	getCallData(): Observable<any> {
		return this.callData;
	}

	static rejectCall(sessionId, rejectStatus) {
		let promise = new Promise((resolve, reject) => {
			CometChat.rejectCall(sessionId, rejectStatus).then((call) => resolve(call), (error) => reject(error));
		});

		return promise;
	}

	doCometUserLogin() {
		CometChat.login(this.storageService.getUserID(), COMETCHAT_CONSTANTS.API_KEY).then(
			loggedInUser => {
				console.log('Login Successful:', {loggedInUser});
				this.listencall();
			},
			error => {
				if (error.code === 'ERR_UID_NOT_FOUND') {
					const userDetails = new CometChat.User(this.storageService.getUserID());
					userDetails.setName(this.storageService.getUserName());
					CometChat.createUser(userDetails, COMETCHAT_CONSTANTS.API_KEY).then(
						user => {
							console.log('user created', user);
							CometChat.login(this.storageService.getUserID(), COMETCHAT_CONSTANTS.API_KEY).then(
								loggedInUser => {
									console.log('Login Successful:', {loggedInUser});
									this.listencall();
								},
								error => {
									console.log('Login failed with exception:', {error});
								}
							);
						},
						error => {
							console.log('error', error);
						});
				}
				console.log('Login failed with exception:', {error});
			}
		);
       
    }
}

// getcount(){
//   return this.unreadCount.next(count);
// }
