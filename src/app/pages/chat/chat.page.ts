import { ChangeDetectorRef, Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Keyboard } from '@capacitor/keyboard';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DatePipe, NgIf } from '@angular/common';
import { String } from 'aws-sdk/clients/cloudhsm';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { ModalController } from '@ionic/angular';
//import { ChatModalComponent } from './chat-modal/chat-modal.component';

export function getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}
@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    @ViewChild('dummyClick') dummyClickRef: ElementRef;
    @ViewChild('videoClick') videoClickRef: ElementRef;
    @ViewChild('audioClick') audioClickRef: ElementRef;
    @ViewChild('filesClick') filesClickRef: ElementRef;


    photo: SafeResourceUrl;
    currentGroupData: any;
    messagesRequest: any;
    groupMessages: any = [];
    currentTypingUserIndicator: any;
    public messageText: String;
    loggedInUserData: any;
    designData: any;
    callAcceptedByReceiver: boolean;
    data: any;
    name: any;
    guid: any;
    sendbuttonactive: boolean = true
    public isError: boolean = false;

    @ViewChild('content', { static: false })
    content: any;
    userData: any;
    sessionID: string;
    audio: HTMLAudioElement;
    cometchat = CometChat;
    public previousPageName: string = '';
    attachment: any;
    media: any;
    url = "https://data-us.cometchat.io/190385dcec51285/media/"
    imagePath: File;
    imgURL: any;
    imgID: any;
    vidID: any;
    audioID: any;
    filetype: any;
    public groupMemberRequest: CometChat.GroupMembersRequest;
    // public guid: string;
    public limit: number = 30;
    public groupMembersData: any = [];
    public searchElement: string = '';
    groupMemberNames: any;
    items: any = [];
    filedata: any;
    bind: any;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private renderer2: Renderer2,
        private navController: NavController,
        private storageService: StorageService,
        private utils: UtilitiesService,
        private apiService: ApiService,
        private cdr: ChangeDetectorRef,
        private alertCtrl: AlertController,
        private actionSheetCtrl: ActionSheetController,
        private deviceStorage: Storage,
        private datePipe: DatePipe,
        private imagePicker: ImagePicker,
        public modalController: ModalController,
        private sanitizer: DomSanitizer,
        private loader: LoadingController
    ) {

        const html = document.getElementsByTagName('html').item(0);
        Keyboard.addListener('keyboardWillHide', () => {
            this.moveToBottom();
        })

        Keyboard.addListener('keyboardWillShow', () => {
            this.moveToBottom();
        })

        // this.route.queryParams.subscribe(params => {

        console.log('this.groupMessages.length', this.groupMessages);

        // if (this.router.getCurrentNavigation().extras.state) {
        this.name = this.router.getCurrentNavigation().extras.state.productdetails.queryParams.name;
        this.guid = this.router.getCurrentNavigation().extras.state.productdetails.queryParams.guid;

        this.currentGroupData = this.route.snapshot.paramMap.get('id');
        localStorage.setItem('gid', this.currentGroupData);
        this.apiService.listencall(this.currentGroupData);
        // }

        // });

        let listenerID: string = "UNIQUE_LISTENER_ID";
        CometChat.addMessageListener(
            listenerID,
            new CometChat.MessageListener({
                onMessageDeleted: (message: CometChat.BaseMessage) => {
                    if (this.groupMessages.length > 0) {
                        var index = -1
                        for (var i = 0; i < this.groupMessages.length; i++) {
                            if (this.groupMessages[i].id === message.getId()) {
                                index = i;
                                this.groupMessages.splice(index, 1);
                                this.cdr.detectChanges();
                                break;
                            }
                        }
                    }
                }
            })
        );
    }

    ionViewWillEnter(): void {
        console.log("viewvill enter");

        this.ngOnInit();
        setTimeout(() => {

            this.content.scrollToBottom(300);
        }, 2000);
    }

    ngOnInit() {
        this.userData = this.storageService.getUser();
        console.log('this.userData', this.userData);

        const limit = 100;

        const guid: string = this.currentGroupData;
        console.log('guid', guid);

        this.messagesRequest = new CometChat.MessagesRequestBuilder()
            .setLimit(limit)
            .setGUID(this.currentGroupData)
            .build();
        this.loadMessages();
        this.addMessageEventListner();
        this.addTypingListner();
        this.getGroupMemberRequest();
        this.currentTypingUserIndicator = '';
        CometChat.getLoggedinUser().then(
            (user) => {
                this.loggedInUserData = user;
            }, (error) => {

            }
        );

        this.previousPageName = this.router.getCurrentNavigation().previousNavigation.finalUrl.toString();
        console.log('this.previousPageName', this.previousPageName);


    }

    loadMessages() {
        this.messagesRequest.fetchPrevious().then(
            (messages: CometChat.BaseMessage[]) => {
                // Handle the list of messages
                this.groupMessages = messages;

                console.log(this.groupMessages, "are grp msgs");

                // this.userMessages.prepend(messages);
                // this.content.scrollToBottom(1500);
                for (let i = messages.length - 1; i >= 0; i--) {
                    let message = messages[i];
                    if (message.getSender().getUid() != this.loggedInUserData.getUid()) {
                        this.markMessageAsRead(message);
                    } else {
                        if (
                            message.getCategory() != "call" &&
                            message.getCategory() != "action"
                        ) {
                            let messageId = message.getId();
                            CometChat.getMessageReceipts(messageId).then((receipts) => {
                                Object.values(receipts).forEach((element) => {
                                    const messageReceipt =
                                        element as CometChat.MessageReceipt;
                                    if (
                                        messageReceipt.RECEIPT_TYPE.READ_RECEIPT ===
                                        messageReceipt.getReceiptType()
                                    ) {
                                        this.callback(messageReceipt, true);
                                    }
                                });
                            }, (error) => { }
                            );
                        }
                    }
                }
                this.moveToBottom();
            }, (error) => {
                this.isError = true;
            }
        ), (err) => {
            this.isError = true;
        };
    }

    private markMessageAsRead(message: CometChat.BaseMessage) {
        if (!(message.getReadAt() || message.getReadByMeAt())) {
            if (message.getReceiverType() === "user") {
                CometChat.markAsRead(message).then(
                    () => {
                        console.log("mark as read success.");
                    }, (error: CometChat.CometChatException) => {
                        console.log("An error occurred when marking the message as read.", error);
                    }
                );
            } else {
                CometChat.markAsRead(message).then(
                    () => {
                        console.log("mark as read success.");
                    }, (error: CometChat.CometChatException) => {
                        console.log("An error occurred when marking the message as read.", error);
                    }
                );
            }
        }
    }



    callback = (msg: CometChat.BaseMessage | CometChat.MessageReceipt, isReceipt: boolean = false): void => {
        if (!isReceipt) {
            const message = msg as CometChat.BaseMessage;
            this.groupMessages = this.groupMessages.filter((msg: CometChat.BaseMessage) => {
                return msg["id"] != message["id"];
            });
            this.groupMessages.push(message);
            this.markMessageAsRead(message);
        } else {
            const messageReceipt = msg as CometChat.MessageReceipt;

            if (messageReceipt.getReceiverType() === "user") {
                this.groupMessages.map((msgObject) => {
                    if (
                        !msgObject["deliveredAt"] &&
                        messageReceipt.RECEIPT_TYPE.DELIVERY_RECEIPT ===
                        messageReceipt.getReceiptType() &&
                        messageReceipt.getSender().getUid() === this.userData.uid
                    ) {
                        msgObject["deliveredAt"] = messageReceipt.getDeliveredAt();
                    }
                    if (
                        !msgObject["readAt"] &&
                        messageReceipt.RECEIPT_TYPE.READ_RECEIPT ===
                        messageReceipt.getReceiptType() &&
                        messageReceipt.getSender().getUid() === this.userData.uid
                    ) {
                        msgObject["readAt"] = messageReceipt.getReadAt();
                    }
                });
            } else {
                this.groupMessages.map((msgObject, index) => {
                    if (
                        !msgObject["deliveredAt"] &&
                        messageReceipt.RECEIPT_TYPE.DELIVERY_RECEIPT ===
                        messageReceipt.getReceiptType() &&
                        msgObject["sender"]["uid"] === this.loggedInUserData.getUid()
                    ) {
                        msgObject["deliveredAt"] = messageReceipt.getDeliveredAt();
                    }
                    if (
                        !msgObject["readAt"] &&
                        messageReceipt.RECEIPT_TYPE.READ_RECEIPT ===
                        messageReceipt.getReceiptType() &&
                        msgObject["sender"]["uid"] === this.loggedInUserData.getUid()
                    ) {
                        msgObject["readAt"] = messageReceipt.getReadAt();
                    }
                });

            }


            this.cdr.detectChanges();
        }
    };

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

            console.log(this.messageText);

            this.sendbuttonactive = false
            const messageType = CometChat.MESSAGE_TYPE.TEXT;
            const receiverType = CometChat.RECEIVER_TYPE.GROUP;
            //  ;
            const textMessage = new CometChat.TextMessage(this.currentGroupData, this.messageText, receiverType,);
            console.log(this.messageText);

            CometChat.sendMessage(textMessage).then(
                (message) => {

                    // Text Message Sent Successfully
                    this.groupMessages.push(message);
                    // this.groupMessages.push(message);

                    this.messageText = '';
                    this.sendbuttonactive = true
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
        // this.navController.pop();
        if (this.previousPageName != '') {
            this.navController.pop();
        } else {
            this.utils.onRedirectIfPreviousPageNotFound();
        }
    }

    listencall() {
        var listnerID = this.currentGroupData;
        const that = this;
        CometChat.addCallListener(
            listnerID,
            new CometChat.CallListener({
                onIncomingCallReceived(call) {
                    this.sessionID = call.getSessionId();

                    this.callingvariable = call;
                    that.router.navigate(['/', 'calling-screen']);
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


        // this.router.navigate([ '/calling-screen' ]);
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
                localStorage.setItem('showHideButton', 'true');
                this.router.navigate(['/', 'calling-screen']);
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
                localStorage.setItem('showHideButton', 'true');
                this.router.navigate(['/calling-screen']);
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

    showDate(time1, time2?): string {
        if (time2) {
            if (new Date(time1 * 1000).getDate() - new Date(time2 * 1000).getDate()) {
                // return new Date(time1 * 1000).toLocaleDateString();
                return this.datePipe.transform(new Date(time1 * 1000), 'd MMMM, EEEE');
            }
        } else {
            // return new Date(time1 * 1000).toLocaleDateString();
            return this.datePipe.transform(new Date(time1 * 1000), 'd MMMM, EEEE');
        }
        return undefined;
    }

    chatMembersList(): any {
        let data: any = {
            name: this.name,
            guid: this.guid,
            currentGroupData: this.currentGroupData
        }
        this.router.navigate(['/chat-members-list/' + this.guid]);
    }

    // delete sender message
    async deleteMessage(message) {
        if (this.loggedInUserData.uid === message.sender.uid) {
            const alert = await this.alertCtrl.create({
                cssClass: 'my-custom-class',
                header: 'Confirm!',
                message: 'Are you sure you want to delete message?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            console.log('Confirm Okay');
                            let messageId = message.id;
                            var index = -1
                            for (var i = 0; i < this.groupMessages.length; i++) {
                                if (this.groupMessages[i].id === message.getId()) {
                                    index = i;
                                    break;
                                }
                            }
                            CometChat.deleteMessage(messageId).then(
                                (message: CometChat.BaseMessage) => {
                                    this.groupMessages.splice(index, 1);
                                    this.cdr.detectChanges();
                                }, (error: CometChat.CometChatException) => {
                                    console.log("Message delete failed with error:", error);
                                }
                            );
                        }
                    }
                ]
            });

            await alert.present();
        }
    }

    // deleteMessage(message): any {
    //     if (this.loggedInUserData.uid === message.sender.uid) {

    //         let messageId = message.id;
    //         var index = -1
    //         for (var i = 0; i < this.groupMessages.length; i++) {
    //             if (this.groupMessages[i].id === message.getId()) {
    //                 index = i;
    //                 break;
    //             }
    //         }

    //         CometChat.deleteMessage(messageId).then(
    //             (message: CometChat.BaseMessage) => {
    //                 this.groupMessages.splice(index, 1);
    //                 this.cdr.detectChanges();
    //             }, (error: CometChat.CometChatException) => {
    //                 console.log("Message delete failed with error:", error);
    //             }
    //         );
    //     }
    // }
    onFileSelected(event, id) {
        console.log('hi i m on selected');
        // var x = event;
        console.log('event.target.files', event.target.files);
        console.log('id', id);
        const file: File = event.target.files[0];
        console.log('file', file);
        // this.sendMsg(file, id)

        if (id == 'img_file') {
            
            this.imagePath = file;
            console.log('this.imagePath', this.imagePath);

            let reader = getFileReader();
            reader.onload = (e: any) => {
                console.log('e', e);
                console.log('reader.result', reader.result);
                
                this.imgURL = reader.result;
                console.log('this.imgURL', this.imgURL);
                let file = this.imgURL;
                this.fileConfirmAlert(file, id);
                
                this.cdr.detectChanges();
            }
            reader.readAsDataURL(this.imagePath);

            // reader.readAsDataURL(file);
            // reader.onload = (_event) => {
            //     console.log('_event', _event);
                
            //     this.imgURL = reader.result;
            //     console.log('this.imgURL', this.imgURL);
            //     let file = this.imgURL
            //     this.fileConfirmAlert(file, id);

            // }
        } else if (id == 'audio_file') {
            this.imagePath = file;
            console.log(this.imagePath);

            let reader = getFileReader();
            reader.onload = (e: any) => {
                console.log('e', e);
                console.log('reader.result', reader.result);
                
                this.imgURL = reader.result;
                console.log('this.imgURL', this.imgURL);
                let file = this.imgURL;
                this.fileConfirmAlert(file, id);
                
                this.cdr.detectChanges();
            }
            reader.readAsDataURL(this.imagePath);
        }
        else if (id == 'vid_file') {
            // this.fileConfirmAlert(file,id);
            this.imagePath = file;
            console.log(this.imagePath);

            let reader = getFileReader();
            reader.onload = (e: any) => {
                console.log('e', e);
                console.log('reader.result', reader.result);
                
                this.imgURL = reader.result;
                console.log('this.imgURL', this.imgURL);
                let file = this.imgURL;
                this.fileConfirmAlert(file, id);
                
                this.cdr.detectChanges();
            }
            reader.readAsDataURL(this.imagePath);

        }

        else if (id == 'files_file') {
            // this.fileConfirmAlert(file,id);
            this.imagePath = file;
            console.log(this.imagePath);

            let reader = getFileReader();
            reader.onload = (e: any) => {
                console.log('e', e);
                console.log('reader.result', reader.result);
                
                this.imgURL = reader.result;
                console.log('this.imgURL', this.imgURL);
                let file = this.imgURL;
                this.fileConfirmAlert(file, id);
                
                this.cdr.detectChanges();
            }
            reader.readAsDataURL(this.imagePath);
        }


    }


    async fileConfirmAlert(file, id) {
        console.log('fileConfirmAlert id', id);
        console.log('file', file);

        console.log('22 id', id);
        if (id == 'img_file') {
            this.filedata = file;
            this.bind = `<div class="imgalertdiv">
            <img src="${file}" class="imagealert"></div>`
            console.log(this.bind);

        }
        else if (id == 'audio_file') {
            this.filedata = file;
            this.bind = `<div class="imgalertdiv">
            <img  src="../../../assets/images/music_upload.png" class="imagealert"></div>`
            console.log(this.bind);

        }
        else if (id == 'video_file') {
            this.filedata = file;
            this.bind = `<div class="imgalertdiv">
            <img  src="../../../assets/images/music_upload.png" class="imagealert"></div>`
            console.log(this.bind);
        }

        else if (id == 'files_file') {
            this.filedata = file;
            this.bind = `<div class="imgalertdiv">
            <img  src="../../../assets/images/file_upload.png" class="imagealert"></div>`
            console.log(this.bind);
        }



        const alert = await this.alertCtrl.create({
            header: 'Upload a file',
            message: this.bind,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Buy clicked');
                        let file = document.getElementById(id)['files'][0];
                        console.log(file);
                        this.sendMsg(file, id)

                    }
                }
            ]
        })

        await alert.present();
        alert.onDidDismiss();

    }
    sendMsg(file, id) {
        console.log('hi');

        // let file = document.getElementById('img_file')['files'][0];
        console.log(file);
        let messageType: string;
        // let file : string;
        if (id == 'img_file') {
            file = document.getElementById(id)['files'][0];
            messageType = CometChat.MESSAGE_TYPE.IMAGE;

        }
        else if (id == 'vid_file') {
            file = document.getElementById(id)['files'][0];

            messageType = CometChat.MESSAGE_TYPE.VIDEO;

        }
        else if (id == 'audio_file') {
            file = document.getElementById(id)['files'][0];

            messageType = CometChat.MESSAGE_TYPE.AUDIO;

        }
        else if (id == 'files_file') {
            file = document.getElementById(id)['files'][0];

            messageType = CometChat.MESSAGE_TYPE.FILE;

        }

        //     console.log(file);
        //    console.log(document.getElementById('img_file')['files']);


        const receiverType = CometChat.RECEIVER_TYPE.GROUP;
        const mediaMessage = new CometChat.MediaMessage(this.currentGroupData, file, messageType, receiverType);
        console.log(mediaMessage);

        CometChat.sendMediaMessage(mediaMessage).then(
            (mediaMessage: CometChat.MediaMessage) => {
                console.log("message", mediaMessage)
                this.groupMessages.push(mediaMessage);
                this.content.scrollToBottom(1500);
                this.moveToBottom();
                messageType = undefined;
                file = "";
                id = "";
                this.bind = "";
                this.filetype = "";
            }, (error: CometChat.CometChatException) => {
                console.log("error in sending message", error)
                // this.cdr.detectChanges();

            }

        );
        //    this.ngOnInit();  
        // this.loadPreviousMessages();

    }
    // add image, video, file, mp3 in chat
    async presentAttchmentActionSheet() {
        // this.sendbuttonactive = false

        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Attachment',
            buttons: [
                {

                    text: 'Image',
                    icon: 'image-outline',
                    role: 'image',
                    cssClass: "dark",
                    handler: () => {
                        // this.selectAttchments('image');
                        // let file = document.getElementById('img_file')['files'][0];
                        // console.log(file);
                        console.log('123 img');
                        console.log('this.dummyClickRef', this.dummyClickRef);
                        console.log('this.dummyClickRef.nativeElement', this.dummyClickRef.nativeElement);
                        
                        this.dummyClickRef.nativeElement.click()


                    }
                },
                {
                    text: 'Video',
                    icon: 'videocam-outline',
                    role: 'video',
                    cssClass: "dark",
                    handler: () => {
                        // this.selectAttchments('video');
                        console.log('video');

                        this.videoClickRef.nativeElement.click()

                    }
                },
                {
                    text: 'Audio',
                    icon: 'musical-note-outline',
                    role: 'Audio',
                    cssClass: "dark",
                    handler: () => {
                        // this.selectAttchments('video');
                        console.log('audio');

                        this.audioClickRef.nativeElement.click()

                    }
                },
                {
                    text: 'All files',
                    icon: 'document-outline',
                    role: 'document',
                    cssClass: "dark",
                    handler: () => {
                        console.log('files');

                        this.filesClickRef.nativeElement.click()

                        // this.selectAttchments('document');

                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    cssClass: "dark",

                    handler: () => {
                    }
                }
            ]
        });
        await actionSheet.present();
    }



    setCharacter(name): void {
        name = name.trim();

        var getFirstAfterSpace = name.split(' ').join('');
        var getSecondAfterSpace = getFirstAfterSpace.trim();
        getSecondAfterSpace = getSecondAfterSpace.split('');
        // getFirstAfterSpace = getFirstAfterSpace.trim();
        if (getFirstAfterSpace.length > 0) {
            return getFirstAfterSpace[0][0] + getFirstAfterSpace[1][0];
        } else {
            return getFirstAfterSpace[0][0];
        }

    }/*
    async presentModal(file) {
        const modal = await this.modalController.create({
          component: ChatModalComponent,
          cssClass: 'my-custom-class',
        });
        return await modal.present();
      }*/

    getGroupMemberRequest(): void {
        console.log('getGroupMemberRequest this.searchElement', this.searchElement);
        this.groupMembersData = [];
        if (this.searchElement != '') {
            this.groupMemberRequest = new CometChat.GroupMembersRequestBuilder(this.guid)
                .setLimit(this.limit)
                .setSearchKeyword(this.searchElement)
                .build();
        } else {
            this.groupMemberRequest = new CometChat.GroupMembersRequestBuilder(this.guid)
                .setLimit(this.limit)
                .build();
        }
        this.fetchGroupMembers();
    }
    // fetch group members
    fetchGroupMembers(): void {
        this.groupMemberRequest.fetchNext().then((groupMembers: CometChat.GroupMember[]) => {
            console.log('groupMembers', groupMembers);
            this.groupMembersData = groupMembers
            console.log('groupMembersData', this.groupMembersData);
            this.items = [];
            this.groupMembersData.forEach((element) => {
                element.role = "{" + element.name + "|" + element.uid + "}";
                this.items.push(element);
                //   console.log(this.items    )
            });
        }, error => {
            console.log("Group Member list fetching failed with exception:", error);
        });
    }
    getAllGroupMembers(event) {
        console.log(event.target.value)
        if (event.target.value == '@') {
            this.groupMemberNames = this.groupMembersData.map(function (el) { return el.name; });
            console.log(this.groupMemberNames);
            console.log(this.groupMembersData);
        }
    }
    onMentionSelect(selection): string {
        console.log('selection', selection);

        // console.log(selection);
        return "@" + selection.role;
    }

}
