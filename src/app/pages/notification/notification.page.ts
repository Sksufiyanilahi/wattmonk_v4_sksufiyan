import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.page.html',
    styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

    notification: any = [];
    showLoader: boolean = false;
    disableContent: boolean = false;
    isNotification: boolean = false;
    today = new Date().toISOString();
    constructor(
        private apiservice: ApiService,
        private utilities: UtilitiesService,
        private mixpanelService: MixpanelService,
        private router: Router,
        private navController: NavController
    ) { }

    ngOnInit() {
        this.mixpanelService.track("NOTIFICATION_PAGE_OPEN", {
        });
        this.getNotification();
    }
    getNotification() {
        this.isNotification = false;
        this.apiservice.profileNotification().subscribe(res => {


            this.notification = res;
            this.showLoader = true;
            this.isNotification = true;
            console.log(this.notification.length);
            //  console.log("type",this.notification.design.requesttype);
            if (res !== []) {
                // this.isNotification=true;
                this.disableContent = true;
            }
        });
    }
    updateNotificationStatus(id, notification: any) {
        console.log('notification', notification)
        if (notification.type == 'survey') {
            console.log('notification.type', notification.type)
            this.utilities.setPrelimId(notification);
            this.utilities.setRequestType(notification.type);
            this.router.navigate(['master-details/survey-details/' + parseInt(notification.surveyid)])
        }
        if (notification.type == 'design') {
            console.log(notification.design.id, id)
            this.utilities.setPrelimId(notification);
            this.utilities.setRequestType(notification.design.requesttype);
            if (notification.design.requesttype == 'prelim') {
                this.router.navigate(['master-details/prelim-details/' + parseInt(notification.designid)])
            }
            if (notification.design.requesttype == 'permit') {
                this.router.navigate(['master-details/permit-details/' + parseInt(notification.designid)])
            }
        }
        if (notification.type == 'pestamp') {
            console.log(notification)
            this.utilities.setPrelimId(notification);
            this.utilities.setRequestType(notification.type);
            this.router.navigate(['master-details/pestamp-details/' + parseInt(notification.pestampid)])
        }
        let Notificationstatus = {
            status: 'read'
        }
        this.apiservice.updateNotification(id, Notificationstatus).subscribe(() => {
            // this.getNotification();
        })
    }
    ionViewWillLeave() {
    }
    onReturn() {
        this.navController.pop();
    }
    goToSearch() {
        this.router.navigate(['/search-bar']);
    }
    markAllAsRead() {
        this.apiservice.markAllAsRead().subscribe(res => {
            console.log(res);
            this.getNotification();
        })
    }

}
