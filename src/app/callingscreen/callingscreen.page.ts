import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import { Subscription } from 'rxjs/internal/Subscription';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-callingscreen',
  templateUrl: './callingscreen.page.html',
  styleUrls: ['./callingscreen.page.scss'],
})
export class CallingscreenPage implements OnInit {
  calldata: any;
  calldeactivate: Subscription;

  constructor(private utils:UtilitiesService,private location:Location,private navCtrl:NavController ) { }

  ngOnInit() {
  
  }

  ionViewDidEnter(){
    let that=this;
    // this.calldeactivate =  that.utils.callData;
      that.calldata = that.utils.getCallData();
       
  
      console.log(that.calldata.status,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  }



  acceptcall(){
    var sessionID = this.calldata.sessionId;

    CometChat.acceptCall(sessionID).then(
      call => {
        console.log("Call accepted successfully:", call);
        // start the call using the startCall() method
      },
      error => {
        console.log("Call acceptance failed with error", error);
        // handle exception
      }
    );
  }

  rejectcall(){
    var sessionID =this.calldata.sessionId;

    console.log(sessionID);
    
var status = CometChat.CALL_STATUS.REJECTED;

CometChat.rejectCall(sessionID, status).then(
  call => {
    console.log("Call rejected successfully", call);
    this.navCtrl.pop();
  },
  error => {
    console.log("Call rejection failed with error:", error);
  }
);
  }

  startcall(){
    /**
        * You can get the call Object from the success of acceptCall() or from the onOutgoingCallAccepted() callback of the CallListener.
        */
var sessionId = this.calldata.sessionId;
var callType = this.calldata.type;
let callListener = new CometChat.OngoingCallListener({
    onUserJoined: user => {
        console.log('User joined call:', user);
    },
    onUserLeft: user => {
        console.log('User left call:', user);
    },
    onCallEnded: call => {
        console.log('Call ended listener', call);
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.calldeactivate.unsubscribe();
  }

}
