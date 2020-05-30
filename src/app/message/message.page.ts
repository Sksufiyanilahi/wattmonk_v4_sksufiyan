import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import Conversation = CometChat.Conversation;
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  conversations: Conversation[] = [];
  conversationsRequest;

  constructor(
    private navController: NavController,
    private utilities: UtilitiesService
  ) {
  }

  ngOnInit() {
    this.conversationsRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(50)
      .setConversationType('user')
      .build();

    this.loadData(null);
  }

  goBack() {
    this.navController.pop();
  }

  loadData(event) {
    this.utilities.showLoading('Getting Conversations').then(() => {
      this.conversationsRequest.fetchNext().then((conversationList) => {
          this.utilities.hideLoading().then(() => {
            console.log('Conversations list received:', conversationList);
            conversationList.forEach((item) => {
              console.log('item', item);
              this.conversations.push(item);
            });
            console.log(this.conversations);
            if (event !== null) {
              event.target.complete();
            }
          });
        },
        error => {
          this.utilities.hideLoading().then(() => {
            if (event !== null) {
              event.target.complete();
            }
            console.log('Conversations list fetching failed with error:', error);
          });
        }
      );
    });
  }

  openConversation(conversation) {
    this.navController.navigateForward(['chat/' + conversation.getConversationWith().getUid()]);
  }
}
