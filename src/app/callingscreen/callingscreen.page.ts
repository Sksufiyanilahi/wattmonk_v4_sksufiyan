import { Component, OnChanges, OnInit } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import { Subscription } from 'rxjs/internal/Subscription';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { INCOMING_CALL_ALERT } from 'src/audio/incomingCallAlert';

@Component({
	selector: 'app-callingscreen',
	templateUrl: './callingscreen.page.html',
	styleUrls: [ './callingscreen.page.scss' ]
})
export class CallingscreenPage implements OnInit, OnChanges {
	calldata: any;
	calldeactivate: Subscription;
	showHideCallButtton: boolean = false;
	audio: HTMLAudioElement;
	video:HTMLVideoElement;
	name: any;

	constructor(
		private utils: UtilitiesService,
		private location: Location,
		private navCtrl: NavController,
		private apiService: ApiService,
		private router: Router
	) {
		this.showHideCallButtton = false;

		let data = localStorage.getItem('showHideButton');
		// let data  =this.router.getCurrentNavigation().extras.state.data.queryParams.value;
		console.log(data);
		// if(data){
		// 	this.showHideCallButtton= data;
		// }
	}

	ngOnChanges() {
		this.apiService.listencall(localStorage.getItem('gid'));
	}
	ngOnInit() {
		this.loadAudio();
	}

	ionViewDidEnter() {
		let that = this;
		// this.calldeactivate =  that.utils.callData;
		that.calldata = that.utils.getCallData();
		this.name = (that.calldata.receiver.name).slice(0,2);
		console.log(that.calldata.receiver.name, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	}

	acceptcall() {
		var sessionID = this.calldata.sessionId;

		CometChat.acceptCall(sessionID).then(
			(call) => {
				console.log('Call accepted successfully:', call);
				// start the call using the startCall() method
				this.startcall();
				this.showHideCallButtton = true;
			},
			(error) => {
				console.log('Call acceptance failed with error', error);
				// handle exception
			}
		);
	}

	rejectcall() {
		UtilitiesService.rejectCall(this.calldata.sessionId, CometChat.CALL_STATUS.REJECTED).then((res) => {
			console.log(res);
		});
		var sessionID = this.calldata.sessionId;

		console.log(sessionID);

		var status = CometChat.CALL_STATUS.REJECTED;

		CometChat.rejectCall(sessionID, status).then(
			(call) => {
				console.log('Call rejected successfully', call);
				this.showHideCallButtton = false;
				this.navCtrl.pop();
				this.pauseAudio();
			},
			(error) => {
				console.log('Call rejection failed with error:', error);
			}
		);
	}

	startcall() {
		/**
        * You can get the call Object from the success of acceptCall() or from the onOutgoingCallAccepted() callback of the CallListener.
        */
		var sessionId = this.calldata.sessionId;
		var callType = this.calldata.type;
		let callListener = new CometChat.OngoingCallListener({
			onUserJoined: (user) => {
				console.log('User joined call:', user);
			},
			onUserLeft: (user) => {
				console.log('User left call:', user);
				this.navCtrl.pop();
				this.pauseAudio();
			},
			onCallEnded: (call) => {
				console.log('Call ended listener', call);
				this.navCtrl.pop();
				this.pauseAudio();
			}
		});
		var callSettings = new CometChat.CallSettingsBuilder()
			.setSessionID(sessionId)
			.enableDefaultLayout(true)
			.setIsAudioOnlyCall(callType == 'audio' ? true : false)
			.setCallEventListener(callListener)
			.build();
		CometChat.startCall(callSettings);
	}

	cancelOutgoingCall() {
		var sessionID = this.calldata.sessionId;

		console.log(sessionID);
		debugger;
		var status = CometChat.CALL_STATUS.ENDED;

		CometChat.rejectCall(sessionID, status).then(
			(call) => {
				console.log('Call rejected successfully', call);
				this.showHideCallButtton = false;
				this.navCtrl.pop();
				this.pauseAudio();
			},
			(error) => {
				console.log('Call rejection failed with error:', error);
			}
		);
	}

	ngOnDestroy(): void {
		this.pauseAudio();
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		// this.calldeactivate.unsubscribe();
	}

	loadAudio() {
		this.audio = new Audio();
		this.audio.src = INCOMING_CALL_ALERT;
		this.playAudio();
	}

	/**
   * Plays Audio in loop
   */
	playAudio() {
		this.audio.currentTime = 0;
		if (typeof this.audio.loop == 'boolean') {
			this.audio.loop = true;
		} else {
			this.audio.addEventListener(
				'ended',
				function() {
					this.currentTime = 0;
					this.play();
				},
				false
			);
		}
		this.audio.play();
	}
	/**
   * Pauses audio
   */
	pauseAudio() {
		this.audio.pause();
	}
	
}
