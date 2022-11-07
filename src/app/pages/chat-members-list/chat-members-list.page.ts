import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { ROLES } from 'src/app/services/constants';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ChatAddMemberPage } from '../chat-add-member/chat-add-member.page';

@Component({
    selector: 'app-chat-members-list',
    templateUrl: './chat-members-list.page.html',
    styleUrls: ['./chat-members-list.page.scss'],
})
export class ChatMembersListPage implements OnInit {
    public groupMemberRequest: CometChat.GroupMembersRequest;
    public usersRequest: CometChat.UsersRequest;
    public guid: string;
    public limit: number = 30;
    public groupMembersData: any = [];
    public searchElement: string = '';
    public canAddMembers = false;

    constructor(
        private modalCtrl: ModalController,
        private navController: NavController,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private storage: StorageService
    ) {
        this.guid = this.route.snapshot.paramMap.get('id');
        let loggedInUser = this.storage.getUser();
        if (
            (loggedInUser.role.id == ROLES.ContractorSuperAdmin ||
                loggedInUser.role.id == ROLES.ContractorAdmin ||
                loggedInUser.role.id == ROLES.SuccessManager ||
                loggedInUser.role.id == ROLES.Admin ||
                loggedInUser.role.id == ROLES.SuperAdmin ||
                loggedInUser.role.id == ROLES.PeAdmin || loggedInUser.role.id == ROLES.TeamHead) &&
            loggedInUser.parent.usertype != "individual"
        ) {
            this.canAddMembers = true;
        } else {
            this.canAddMembers = false;
        }
    }

    ngOnInit() {
        this.searchElement = '';
        this.getGroupMemberRequest();
    }

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

            // groupMembers.map((data, i) => {
            //     if (!data.getAvatar()) {
            //         data.setAvatar(
            //             Helper.getSVGAvatar(
            //                 data.getUid(),
            //                 data.getName().substr(0, 1)
            //             )
            //         );
            //         groupMembers[i] = data;
            //     }
            // });
            this.groupMembersData = [...this.groupMembersData, ...groupMembers];
        }, error => {
            console.log("Group Member list fetching failed with exception:", error);
        });
    }

    // add members 
    async addMemberModal() {
        const modal = await this.modalCtrl.create({
            component: ChatAddMemberPage,
            componentProps: {
                guid: this.guid
            }
        });
        modal.onDidDismiss().then((data) => {
            console.log('data', data);
            if (data.data.reload) {
                this.groupMembersData = [];
                this.groupMemberRequest = new CometChat.GroupMembersRequestBuilder(this.guid)
                    .setLimit(this.limit)
                    .build();
                this.fetchGroupMembers();
            }
        });
        return await modal.present();
    }

    getSantizeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    doInfinite(event) {
        if (event !== null) {
            setTimeout(() => {
                this.fetchGroupMembers();
                event.target.complete();
            }, 1000);
        }
    }

    setCharacter(name): void {
        var getFirstAfterSpace = name.match(/\b(\w)/g);
        var getData = getFirstAfterSpace.join('');

        return getData.charAt(0) + getData.charAt(1);
    }

    goBack() {
        this.navController.pop();
    }

}
