import { Component, OnInit, ViewChild,Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import { Chooser } from '@ionic-native/chooser/ngx';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import BaseMessage = CometChat.BaseMessage;
import { UtilitiesService } from '../utilities.service';
import { Plugins } from '@capacitor/core';
const { Keyboard } = Plugins;

// import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupchatPage implements OnInit {
  currentGroupData: any;
  messagesRequest: any;
  groupMessages: any;
  currentTypingUserIndicator: any;
  public messageText: string;
  loggedInUserData: any;

  @ViewChild('content',{static:false}) content: any;

  constructor(private router: Router, private route: ActivatedRoute, private renderer2: Renderer2,private navCtrl:NavController) {
    const html = document.getElementsByTagName('html').item(0);
    Keyboard.addListener('keyboardWillHide',()=>{
      this.moveToBottom();
    });

    Keyboard.addListener('keyboardWillShow',()=>{
      this.moveToBottom();
    });

    this.route.queryParams.subscribe(params => {



      if (this.router.getCurrentNavigation().extras.state) {
        this.currentGroupData = this.router.getCurrentNavigation().extras.state.group;
      }

    });
  }

  ngOnInit() {
    const  limit = 30;

    const guid: string = this.currentGroupData['guid'];

    this.messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(limit).setGUID(this.currentGroupData.guid).build();
    this.loadMessages();
    this.addMessageEventListner();
    this.addTypingListner();
    this.currentTypingUserIndicator = '';
    CometChat.getLoggedinUser().then(user => {

      this.loggedInUserData = user;
    }, error => {

    });
  }

  loadMessages() {

    this.messagesRequest.fetchPrevious().then(
      messages => {

        // Handle the list of messages
        this.groupMessages = messages;
        // this.userMessages.prepend(messages);

        // this.content.scrollToBottom(1500);
        this.moveToBottom();
      },
      error => {

      }
    );

  }

  loadPreviousMessages() {
    this.messagesRequest.fetchPrevious().then(
      messages => {

        // Handle the list of messages
        const newMessages = messages;
        // this.userMessages = messages;
        // this.userMessages.prepend(messages);

        if (newMessages !== '') {
          this.groupMessages = newMessages.concat(this.groupMessages);
        }


        // this.content.scrollToBottom(1500);
      },
      error => {

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

      CometChat.addMessageListener(listenerID, new CometChat.MessageListener({
      onTextMessageReceived: textMessage => {

      if (textMessage.receiverID !== this.loggedInUserData.uid) {
        this.groupMessages.push(textMessage);
        this.moveToBottom();
      }




      // Handle text message
      },
      onMediaMessageReceived: mediaMessage => {

      // Handle media message
      },
      onCutomMessageReceived: customMessage => {

      // Handle media message
      }

    })
    );

  }

  addTypingListner() {

    const listenerId = 'GroupTypingListner';

    CometChat.addMessageListener(listenerId, new CometChat.MessageListener({
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
    }));

  }

  sendMessage() {


    if (this.messageText !== '') {

      const messageType = CometChat.MESSAGE_TYPE.TEXT;
      const receiverType = CometChat.RECEIVER_TYPE.GROUP;

      const textMessage = new CometChat.TextMessage(this.currentGroupData.guid, this.messageText, receiverType);

      CometChat.sendMessage(textMessage).then(
        message => {

        // Text Message Sent Successfully
        // this.groupMessages.push(message);
        this.messageText = '';
        // this.content.scrollToBottom(1500);
        this.moveToBottom();
        },
      error => {

        }
      );

    }
  }

  checkBlur() {

    const receiverId = this.currentGroupData.guid;
    const receiverType = CometChat.RECEIVER_TYPE.GROUP;

    const typingNotification = new CometChat.TypingIndicator(receiverId, receiverType);
    CometChat.endTyping(typingNotification);
  }

  checkFocus() {

  }

  checkInput() {

    const receiverId = this.currentGroupData.guid;
    const receiverType = CometChat.RECEIVER_TYPE.GROUP;

    const typingNotification = new CometChat.TypingIndicator(receiverId, receiverType);
    CometChat.startTyping(typingNotification);
  }


  ionViewWillEnter(): void {
    setTimeout(() => {

      this.content.scrollToBottom(300);
    }, 2000);
  }

  goBack(){
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
  }


}
