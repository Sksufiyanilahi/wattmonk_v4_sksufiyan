import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { DatePipe } from '@angular/common';

import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

import Conversation = CometChat.Conversation;
import Group = CometChat.Group;
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.page.html',
    styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {


    public groups: Group[] = [];
    conversationsRequest;
    userListArray: any = [];
    public checkCount: number = 0;
    public totalcountsforallgroups: any = 0;
    public searchElement: string;
    public conversations: any[] = [];
    constructor(
        private navController: NavController,
        private utilities: UtilitiesService,
        private router: Router,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef,
        private datePipe: DatePipe,
        private eventService: CustomEventsService
    ) {
        let listenerID: string = "UNIQUE_LISTENER_ID";

        CometChat.addMessageListener(
            listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
                    this.updateUnreadMessageCount(textMessage);
                },
                onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
                    this.updateUnreadMessageCount(mediaMessage);
                },
                onCustomMessageReceived: (customMessage: CometChat.CustomMessage) => {
                    this.updateUnreadMessageCount(customMessage);
                }
            })
        );
    }

    // update unread message count for particuar group
    updateUnreadMessageCount(message): void {
        let GUID: string = message.receiverId;
        let conversationId = message.conversationId;

        CometChat.getUnreadMessageCountForGroup(GUID).then(
            (unreadMessageCount: Object) => {
                for (let data of this.conversations) {
                    if (conversationId == data.getConversationId()) {
                        data.setUnreadMessageCount(unreadMessageCount[GUID]);
                    }
                }
            }, (error: CometChat.CometChatException) => {
                console.log("Error in getting message count", error);
            }
        );
    }

    ngOnInit() {
        // this.conversationsRequest = new CometChat.ConversationsRequestBuilder()
        //     .setLimit(50)
        //     .setConversationType('group')
        //     .build();

        // this.loadData(null);
    }

    ionViewWillEnter(): void {
        // this.ngOnInit();
        this.searchElement = '';
        this.getGroup();

        CometChat.getUnreadMessageCountForAllGroups().then(
            (array) => {
                let totalcount = 0;
                this.totalcountsforallgroups = 0;
                const user = array;
                const entries = Object.entries(user);
                for (const val of entries) {
                    totalcount += val[1];
                }
                this.totalcountsforallgroups = totalcount;

                console.log('this.totalcountsforallgroups', this.totalcountsforallgroups);


                this.eventService.publish('foo:update-unread-msg-count', {
                    unreadMessageCount: this.totalcountsforallgroups
                });


                return totalcount;
            },
            () => {
                // do nothing.
            }
        )
    }

    goBack() {
        this.navController.pop();
    }

    // get group data
    getGroup(): void {
        console.log('this.searchElement', this.searchElement);
        if (this.searchElement !== '') {
            this.conversationsRequest = new CometChat.ConversationsRequestBuilder()
                // this.conversationsRequest = new CometChat.GroupsRequestBuilder()
                .setLimit(50)
                .setConversationType(this.searchElement)
                .build();

            this.conversations = [];
            console.log("Conversations", this.conversations);
            this.groups = [];
            console.log('this.groups', this.groups);

            this.loadData(null);
        } else {
            this.conversationsRequest = new CometChat.ConversationsRequestBuilder()
                // this.conversationsRequest = new CometChat.GroupsRequestBuilder()
                .setLimit(50)
                .setConversationType('group')
                .build();

            this.conversations = [];
            console.log("Conversations", this.conversations);

            this.loadData(null);
        }
    }


    getUnreadMessageCountForAllGroups() {
        CometChat.getUnreadMessageCountForAllGroups().then(
            (array) => {
                let totalcount = 0;
                this.totalcountsforallgroups = 0;
                const user = array;
                const entries = Object.entries(user);
                for (const val of entries) {
                    totalcount += val[1];
                }
                this.totalcountsforallgroups = totalcount;
                console.log('this.totalcountsforallgroups', this.totalcountsforallgroups);
                this.eventService.publish('foo:update-unread-msg-count', {
                    unreadMessageCount: this.totalcountsforallgroups
                });
                return totalcount;
            },
            () => {
                console.log('sdf');

                // do nothing.	
            }
        )
    }

    loadData(event) {
        this.utilities.showLoading('Getting Conversations').then(() => {
            if (this.searchElement === '') {
                this.conversationsRequest.fetchNext().then((conversationList: any) => {
                    this.utilities.hideLoading().then(() => {
                        this.getUnreadMessageCountForAllGroups();
                        this.checkCount = 1;
                        if (conversationList.length > 0) {
                            for (let data of conversationList) {
                                data.setCharacter = this.setCharacter(data.getConversationWith().getName());
                                data.time = this.isToday(data);
                            }
                        }
                        this.conversations = [...this.conversations, ...conversationList];
                        this.cdr.detectChanges();
                        if (event !== null) {
                            event.target.complete();
                        }
                    });
                }, (error) => {
                    console.log('Getting Group error', error);
                    this.utilities.doCometUserLogin();
                    if (this.checkCount == 0) {
                        setTimeout(() => {
                            this.loadData(null);
                            this.checkCount = 1;
                        }, 2000);
                    }
                    this.utilities.hideLoading().then(() => {
                        if (event !== null) {
                            event.target.complete();
                        }
                    });
                }
                );
            } else {
                console.log('2 this.groups', this.groups);

                this.conversationsRequest.fetchNext().then((conversationList: any) => {
                    this.utilities.hideLoading().then(() => {
                        this.checkCount = 1;
                        if (conversationList.length > 0) {
                            for (let data of conversationList) {
                                data.setCharacter = this.setCharacter(data.getConversationWith().getName());
                                data.time = this.isToday(data);
                            }
                        }
                        this.groups = [...this.groups, ...conversationList];
                        this.cdr.detectChanges();
                        if (event !== null) {
                            event.target.complete();
                        }
                    });
                }, (error) => {
                    // console.log('Getting Group error', error);	
                    // this.utilities.doCometUserLogin();	
                    // if (this.checkCount == 0) {	
                    //     setTimeout(() => {	
                    //         this.loadData(null);	
                    //         this.checkCount = 1;	
                    //     }, 2000);	
                    // }
                    console.log('Getting Group error', error);
                    this.utilities.doCometUserLogin();
                    this.utilities.hideLoading().then(() => {
                        if (this.checkCount == 0) {
                            setTimeout(() => {
                                this.loadData(null);
                                this.checkCount = 1;
                            }, 2000);
                        }
                    });

                    this.utilities.hideLoading().then(() => {
                        if (event !== null) {
                            event.target.complete();
                        }
                    });
                });
            }
        });
    }

    openConversation(conversation) {
        let objToSend: NavigationExtras = {
            queryParams: {
                name: this.searchElement === '' ? conversation.getConversationWith().getName() : conversation.getConversationWith().getName(),
                guid: this.searchElement === '' ? conversation.getConversationWith().getGuid() : conversation.getConversationWith().getGuid()
            },
            skipLocationChange: false,
            fragment: 'top'
        };

        let getGuid = this.searchElement === '' ? conversation.getConversationWith().getGuid() : conversation.getConversationWith().getGuid();
        console.log(getGuid);

        this.router.navigate(['chat/' + getGuid], {
            state: { productdetails: objToSend }
        });

        // let objToSend: NavigationExtras = {
        //     queryParams: {
        //         name: this.searchElement === '' ? conversation.getConversationWith().getName() : conversation.getName(),
        //         guid: this.searchElement === '' ? conversation.getConversationWith().getGuid() : conversation.getGuid()
        //     },
        //     skipLocationChange: false,
        //     fragment: 'top'
        // };

        // let getGuid = this.searchElement === '' ? conversation.getConversationWith().getGuid() : conversation.getGuid();
        // this.router.navigate(['chat/' + getGuid], {
        //     state: { productdetails: objToSend }
        // });

        //this.navController.navigateForward(['chat/' + conversation.getConversationWith().getGuid(),{'key':'group'}]);
    }

    getSantizeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    ionViewWillLeave() {
    }

    setCharacter(name): void {
        name = name.trim();
        // console.log("Name:",name);
        var getFirstAfterSpace = name.split(' ').join('_');
        var getSecondAfterSpace = getFirstAfterSpace.trim();
        getSecondAfterSpace = getSecondAfterSpace.split('_');
        // getFirstAfterSpace = getFirstAfterSpace.trim();
        if (getFirstAfterSpace.length > 0) {
            return getFirstAfterSpace[0][0] + getFirstAfterSpace[1][0];
        } else {
            return getFirstAfterSpace[0][0];
        }
    }

    isToday(conversation) {
        let toString: number = 0;
        if (this.searchElement === '') {
            if (conversation.getLastMessage()) {
                toString = conversation.getLastMessage().updatedAt;
            }
            else if (conversation.getConversationWith().getUpdatedAt() == undefined) {
                toString = conversation.getConversationWith().createdAt;
            }
            else if (conversation.getConversationWith().getUpdatedAt()) {
                toString = conversation.getConversationWith().getUpdatedAt();
            }
        } else if (this.searchElement !== '') {
            if (conversation.getConversationWith().getUpdatedAt() == undefined) {
                toString = conversation.createdAt;
            } else if (conversation.getConversationWith().getUpdatedAt()) {
                toString = conversation.getConversationWith().getUpdatedAt();
            }
            // if (conversation.getUpdatedAt() == undefined) {
            //     toString = conversation.createdAt;
            // } else if (conversation.getUpdatedAt()) {
            //     toString = conversation.getUpdatedAt();
            // }
        }
        if (toString) {
            let msgDate = new Date(toString * 1000);
            let msgDay = msgDate.getDate();
            let msgMonth = msgDate.getMonth() + 1;
            let msgYear = msgDate.getFullYear();
            // today date, month and year
            let today = new Date();
            let tDay = today.getDate();
            let tMonth = today.getMonth() + 1;
            let tYear = today.getFullYear();
            var yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            if (msgDay === tDay && msgMonth === tMonth && msgYear === tYear) {
                return this.datePipe.transform(msgDate, 'h:mm a');
            } else if (yesterday.toDateString() === msgDate.toDateString()) {
                return 'Yesterday';
            }
            return this.datePipe.transform(msgDate, 'd/M/yyyy');
        }
        return '';
    }



}
