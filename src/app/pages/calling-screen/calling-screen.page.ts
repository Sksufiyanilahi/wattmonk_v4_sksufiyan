import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { INCOMING_CALL_ALERT } from 'src/audio/incomingCallAlert';

@Component({
  selector: 'app-calling-screen',
  templateUrl: './calling-screen.page.html',
  styleUrls: ['./calling-screen.page.scss'],
})
export class CallingScreenPage implements OnInit {

  calldata: any;
  calldeactivate: Subscription;
  showHideCallButtton: boolean = false;
  audio: HTMLAudioElement;
  video: HTMLVideoElement;
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

    // if(data){
    // this.showHideCallButtton= data;
    // }
  }

  ngOnChanges() {
    this.apiService.listencall(localStorage.getItem('gid'));

  }
  ngOnInit() {

    this.loadAudio();
  }

  ionViewDidEnter() {
    //this.startcall();
    let that = this;
    // this.calldeactivate =  that.utils.callData;
    that.calldata = that.apiService.getCallData();

    this.name = (that.calldata.receiver.name).slice(0, 2);


  }

  acceptcall() {
    var sessionID = this.calldata.sessionId;


    CometChat.acceptCall(sessionID).then(
      (call) => {

        // start the call using the startCall() method

        //this.startcall();
        this.startcall(call);
        this.showHideCallButtton = true;
      },
      (error) => {

        // handle exception
      }
    );
  }

  rejectcall() {
    /*ApiService.rejectCall(this.calldata.sessionId, CometChat.CALL_STATUS.REJECTED).then((res) => {

    });*/
    var sessionID = this.calldata.sessionId;



    var status = CometChat.CALL_STATUS.REJECTED;

    CometChat.rejectCall(sessionID, status).then(
      (call) => {

        this.showHideCallButtton = false;
        this.navCtrl.pop();
        this.pauseAudio();
      },
      (error) => {

      }
    );
  }

  startcall(call) {
    /**
        * You can get the call Object from the success of acceptCall() or from the onOutgoingCallAccepted() callback of the CallListener.
        */
    // var sessionId = this.calldata.sessionId;
    // var callType = this.calldata.type;
    var sessionId = call.sessionId;
    var callType = call.type;
    let callListener = new CometChat.OngoingCallListener({
      onUserJoined: (user) => {

        this.pauseAudio();
      },
      onUserLeft: (user) => {

        this.navCtrl.pop();
        // this.pauseAudio();
      },
      onCallEnded: (call) => {

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


    ;
    var status = CometChat.CALL_STATUS.ENDED;

    CometChat.rejectCall(sessionID, status).then(
      (call) => {

        this.showHideCallButtton = false;
        this.navCtrl.pop();
        this.pauseAudio();
      },
      (error) => {

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
        function () {
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
