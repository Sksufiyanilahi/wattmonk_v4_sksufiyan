import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import Conversation = CometChat.Conversation;
import { UtilitiesService } from 'src/app/utilities.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  conversations: Conversation[] = [];
  conversationsRequest;
  userListArray: any=[];

  constructor(
    private navController: NavController,
    private utilities: UtilitiesService
  ) {
  }

  ngOnInit() {
    this.conversationsRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(50)
      .setConversationType('group')
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
            // if(conversationList.length > 0){
            //   CometChat.getUnreadMessageCountForAllUsers().then(array=>{
            //     const unread  =Object.keys(array);
            //     if(unread.length>0){
            //       unread.map(uid=>{
            //         const index= conversationList.findIndex(user=>user.uid===uid);
            //         if(index !==-1){
            //           conversationList[index].unreadCount = array[uid];
            //         }
            //       })
            //     }
            //     this.conversations = conversationList;
            // console.log('UserList Array :', this.conversations);
            //   })
            // }
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
    this.navController.navigateForward(['chat/' + conversation.getConversationWith().getGuid(),{'key':'group'}]);
  }

}
