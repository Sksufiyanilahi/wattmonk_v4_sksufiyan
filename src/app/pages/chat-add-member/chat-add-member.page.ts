import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
    selector: 'app-chat-add-member',
    templateUrl: './chat-add-member.page.html',
    styleUrls: ['./chat-add-member.page.scss'],
})
export class ChatAddMemberPage implements OnInit {

    public usersRequest: CometChat.UsersRequest;
    public limit: number = 30;
    public skip: number = 0;
    public userListData: { selected: boolean; user: any }[] = [];
    public guid: string;
    public searchElement: any = '';
    public teamIds = [];

    constructor(
        private modalCtrl: ModalController,
        private sanitizer: DomSanitizer,
        private nav: NavParams,
        private utilitiesService: UtilitiesService,
        private apiService: ApiService
    ) {
        this.guid = this.nav.get('guid');
    }

    ngOnInit() {
        this.usersRequest = new CometChat.UsersRequestBuilder()
            .setLimit(this.limit)
            .build();
        // this.fetchUsersList();
        this.fetchTeamData();
    }

    fetchTeamData(): void {
        this.apiService.getTeamData(this.guid).subscribe((response) => {
            console.log('fetchTeamData response', response);
            
            if (response.length > 0) {
                response.forEach((element) => {
                    try {
                        this.teamIds.push(element.cometchatuid.toString());
                    } catch (error) { }
                });
                let UIDs = this.teamIds.slice(this.skip, this.limit);
                this.usersRequest = new CometChat.UsersRequestBuilder()
                    .setLimit(this.limit)
                    .setUIDs(UIDs)
                    .build();
                this.fetchUsersList(UIDs);
            }
        }, (error) => {
            console.log('error', error);
        });
    }

    // fetch users list
    fetchUsersList(UIDs): void {
        if (UIDs.length > 0) {
            this.usersRequest.fetchNext().then(
                (userList: CometChat.User[]) => {
                    console.log('userList', userList);
                    
                    let users: any = [];
                    userList.map((data, i) => {
                        // if (!data.getAvatar()) {
                        //     data.setAvatar(
                        //         Helper.getSVGAvatar(
                        //             data.getUid(),
                        //             data.getName().substr(0, 1)
                        //         )
                        //     );
                        //     users.push({ selected: false, user: data });
                        // }
                        users.push({ selected: false, user: data });
                    });

                    this.userListData = [...this.userListData, ...users];

                    if (userList) {
                        this.skip += 30;
                    }
                }, (error: CometChat.CometChatException) => {
                    console.log("User list fetching failed with error:", error);
                }
            );
        }
    }

    search(event): void {
        // let UIDs = this.teamIds.slice(this.skip, this.limit);
        // console.log('this.searchElement', this.searchElement);
        let UIDs = this.teamIds.slice(0, 30);
        if (this.searchElement.length > 2) {
            this.usersRequest = new CometChat.UsersRequestBuilder()
                .setLimit(this.limit)
                .setUIDs(UIDs)
                .setSearchKeyword(this.searchElement)
                .build();
        } else if (this.searchElement == '') {
            this.usersRequest = new CometChat.UsersRequestBuilder()
                .setLimit(this.limit)
                .setUIDs(UIDs)
                .build();
        }

        this.userListData = [];
        this.fetchUsersList(UIDs);
    }

    // select user click on item
    onUserClick(selectedUser): any {
        this.userListData.map(
            (item: { selected: boolean; user: CometChat.User }, key) => {
                if (item.user.getUid() === selectedUser.getUid()) {
                    this.userListData[key] = {
                        selected: !item.selected,
                        user: selectedUser,
                    };
                }
            }
        );
    }

    // add memeber into group
    addMemberToGroup(): any {
        const membersList = [];
        this.userListData.map((item) => {
            if (item.selected) {
                membersList.push(
                    new CometChat.GroupMember(
                        item.user.uid,
                        CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
                    )
                );
            }
        }, (error) => {
            console.log('error', error);
        });

        if (membersList.length > 0) {
            this.utilitiesService.showLoadingWithPullRefreshSupport(true, 'Adding Members').then((success) => {
                CometChat.addMembersToGroup(this.guid, membersList, []).then(
                    (response: Object) => {
                        this.utilitiesService.hideLoadingWithPullRefreshSupport(true).then(() => {
                            this.modalCtrl.dismiss({
                                'dismissed': true,
                                reload: true
                            });
                        });
                    }, (error: CometChat.CometChatException) => {
                        console.log("Something went wrong", error);
                        this.utilitiesService.hideLoadingWithPullRefreshSupport(true).then(() => {

                        });
                    }
                );
            });
        }
    }

    getSantizeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    doInfinite(event) {
        if (event !== null) {
            setTimeout(() => {
                let UIDs = this.teamIds.slice(this.skip, this.skip += 30);
                this.usersRequest = new CometChat.UsersRequestBuilder()
                    .setLimit(this.limit)
                    .setUIDs(UIDs)
                    .build();
                this.fetchUsersList(UIDs);
                event.target.complete();
            }, 1000);
        }
    }


    setCharacter(name): void {
        var getFirstAfterSpace = name.match(/\b(\w)/g);
        var getData = getFirstAfterSpace.join('');

        return getData.charAt(0) + getData.charAt(1);
    }

    dismiss() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }


}
