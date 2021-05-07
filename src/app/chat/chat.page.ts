import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import BaseMessage = CometChat.BaseMessage;
import { UtilitiesService } from '../utilities.service';

import { StorageService } from '../storage.service';
import { ApiService } from '../api.service';
import { Plugins } from '@capacitor/core';
const {Keyboard} = Plugins;


@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: [ './chat.page.scss' ]
})
export class ChatPage implements OnInit {
	currentGroupData: any;
	messagesRequest: any;
	groupMessages: any;
	currentTypingUserIndicator: any;
	public messageText: string;
	loggedInUserData: any;
	designData:any;
	callAcceptedByReceiver:boolean;
	data:any;
	name:any;
	guid:any;
	sendbuttonactive:boolean=true

	@ViewChild('content', { static: false })
	content: any;
	userData: any;
	sessionID: string;
	audio: HTMLAudioElement;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private renderer2: Renderer2,
		private navController: NavController,
    private storageService: StorageService,
	private utils:UtilitiesService,
	private apiService:ApiService,
	private navCtrl: NavController
	) {

		const html = document.getElementsByTagName('html').item(0);
		Keyboard.addListener('keyboardWillHide',() =>{
			this.moveToBottom();
		})

		Keyboard.addListener('keyboardWillShow',() =>{
			this.moveToBottom();
		})

		// this.route.queryParams.subscribe(params => {



		// if (this.router.getCurrentNavigation().extras.state) {
			this.name = this.router.getCurrentNavigation().extras.state.productdetails.queryParams.name;
			this.guid = this.router.getCurrentNavigation().extras.state.productdetails.queryParams.guid;

		this.currentGroupData = this.route.snapshot.paramMap.get('id');

		localStorage.setItem('gid',this.currentGroupData);
    this.apiService.listencall(this.currentGroupData);
			// }

		// });
	}

	ionViewWillEnter(): void {
		this.ngOnInit();
		setTimeout(() => {

			this.content.scrollToBottom(300);
		}, 2000);
	}

	ngOnInit() {
		this.userData = this.storageService.getUser();
		const limit = 30;

		const guid: string = this.currentGroupData;

		this.messagesRequest = new CometChat.MessagesRequestBuilder()
			.setLimit(limit)
			.setGUID(this.currentGroupData)
			.build();
		this.loadMessages();
		this.addMessageEventListner();
		this.addTypingListner();
		this.currentTypingUserIndicator = '';
		CometChat.getLoggedinUser().then(
			(user) => {

				this.loggedInUserData = user;
			},
			(error) => {

			}
		);
	}

	loadMessages() {
		this.messagesRequest.fetchPrevious().then(
			(messages) => {

				// Handle the list of messages
				this.groupMessages = messages;
				// this.userMessages.prepend(messages);

				// this.content.scrollToBottom(1500);
				this.moveToBottom();
			},
			(error) => {



			}
		),
			(err) => {

			};
	}

	loadPreviousMessages() {
		this.messagesRequest.fetchPrevious().then(
			(messages) => {

				// Handle the list of messages
				const newMessages = messages;
				// this.userMessages = messages;
				// this.userMessages.prepend(messages);

				if (newMessages !== '') {
					this.groupMessages = newMessages.concat(this.groupMessages);
				}


				// this.content.scrollToBottom(1500);
			},
			(error) => {

			}
		);
	}

	moveToBottom() {

		this.content.scrollToBottom(2000);
	}

	logScrollStart() {

	}

	logScrolling($event) {

		if ($event.detail.scrollTop === 0) {

			this.loadPreviousMessages();
		}
	}

	logScrollEnd() {

	}

	addMessageEventListner() {
		const listenerID = 'GroupMessage';

		CometChat.addMessageListener(
			listenerID,
			new CometChat.MessageListener({
				onTextMessageReceived: (textMessage) => {

					if (textMessage.receiverID !== this.loggedInUserData.uid) {
						this.groupMessages.push(textMessage);
						this.moveToBottom();
					}




					// Handle text message
				},
				onMediaMessageReceived: (mediaMessage) => {

					// Handle media message
				},
				onCutomMessageReceived: (customMessage) => {

					// Handle media message
				}
			})
		);
	}

	addTypingListner() {
		const listenerId = 'GroupTypingListner';

		CometChat.addMessageListener(
			listenerId,
			new CometChat.MessageListener({
				onTypingStarted: (typingIndicator) => {


					if (typingIndicator.sender.uid !== this.loggedInUserData.uid) {


						const name = typingIndicator.sender.name + ' is typing...';
						this.currentTypingUserIndicator = name;

						// if (this.currentTypingUserIndicator != "") {
						//   var name = typingIndicator.sender.name+", "+this.currentTypingUserIndicator;
						//   this.currentTypingUserIndicator = name;
						// }else{
						//   var name = typingIndicator.sender.name+" is typing...";
						//   this.currentTypingUserIndicator = name;
						// }

						// var name = typingIndicator.sender.name+" is typing...";
						// this.currentTypingUserIndicator = name;
					}
				},
				onTypingEnded: (typingIndicator) => {


					if (typingIndicator.sender.uid !== this.loggedInUserData.uid) {
						this.currentTypingUserIndicator = '';
					}
				}
			})
		);
	}

	sendMessage() {
      
		if (this.messageText !== '' && this.sendbuttonactive) {
			this.sendbuttonactive=false
			const messageType = CometChat.MESSAGE_TYPE.TEXT;
			const receiverType = CometChat.RECEIVER_TYPE.GROUP;
			//  ;
			const textMessage = new CometChat.TextMessage(this.currentGroupData, this.messageText, receiverType);

			CometChat.sendMessage(textMessage).then(
				(message) => {

					// Text Message Sent Successfully
					this.groupMessages.push(message);
					this.messageText = '';
					this.sendbuttonactive=true
					this.content.scrollToBottom(1500);
					this.moveToBottom();
				},
				(error) => {

				}
			);
		}
	}

	checkBlur() {

		const receiverId = this.currentGroupData;
		const receiverType = CometChat.RECEIVER_TYPE.GROUP;

		const typingNotification = new CometChat.TypingIndicator(receiverId, receiverType);
		CometChat.endTyping(typingNotification);
	}

	checkFocus() {

	}

	checkInput() {

		const receiverId = this.currentGroupData;
		const receiverType = CometChat.RECEIVER_TYPE.GROUP;

		const typingNotification = new CometChat.TypingIndicator(receiverId, receiverType);
		CometChat.startTyping(typingNotification);
	}

	ionViewWillLeave() {
	}

	goBack() {
		this.navController.pop();
	}

	listencall() {
    var listnerID = this.currentGroupData;
    const that= this;
		CometChat.addCallListener(
			listnerID,
			new CometChat.CallListener({
				onIncomingCallReceived(call) {
					this.sessionID = call.getSessionId();

          this.callingvariable = call;
         that.router.navigate(['/', 'callingscreen']);
					// Handle incoming call
				},
				onOutgoingCallAccepted(call) {

					// Outgoing Call Accepted
				},
				onOutgoingCallRejected(call) {

					// Outgoing Call Rejected
				},
				onIncomingCallCancelled(call) {

				}
			})
		);
	}

	gotopage() {


		// this.router.navigate([ '/callingscreen' ]);
	}

	dialcall() {
		var receiverID = this.currentGroupData;

		var callType = CometChat.CALL_TYPE.AUDIO;

		var receiverType = CometChat.RECEIVER_TYPE.GROUP;


		var call = new CometChat.Call(receiverID, callType, receiverType);

		CometChat.initiateCall(call).then(
			(outGoingCall) => {

        this.sessionID = outGoingCall.getSessionId();

		this.apiService.callData = outGoingCall;
		//this.apiService.callData = outGoingCall;
					localStorage.setItem('showHideButton','true');
        this.router.navigate(['/','callingscreen']);
				// perform action on success. Like show your calling screen.
			},
			(error) => {

			}
		);
	}
	videocall() {
		var receiverID = this.currentGroupData;
		var callType = CometChat.CALL_TYPE.VIDEO;
		var receiverType = CometChat.RECEIVER_TYPE.GROUP;

		var call = new CometChat.Call(receiverID, callType, receiverType);

		CometChat.initiateCall(call).then(
			(outGoingCall) => {


				//this.utils.callData = outGoingCall;
				this.apiService.callData = outGoingCall;
				localStorage.setItem('showHideButton','true');
				this.router.navigate(['/callingscreen']);
				// perform action on success. Like show your calling screen.
			},
			(error) => {

			}
		);
	}

	acceptcall() {
		var sessionID = this.sessionID;

		CometChat.acceptCall(sessionID).then(
			(call) => {

				// start the call using the startCall() method
			},
			(error) => {

				// handle exception
			}
		);
	}

	rejectincomingcall() {
		var sessionID = this.sessionID;
		var status = CometChat.CALL_STATUS.REJECTED;

		CometChat.rejectCall(sessionID, status).then(
			(call) => {

			},
			(error) => {

			}
		);
	}
	pauseAudio() {
		this.audio.pause();
	}
}
