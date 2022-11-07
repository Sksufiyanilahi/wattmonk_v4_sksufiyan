import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, NavController, NavParams, Platform, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
    selector: 'app-team-details',
    templateUrl: './team-details.page.html',
    styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {

    enableDisable: boolean = false;
    teamData: any;
    designId: number;
    design: any;
    id: any;
    designData: any
    value: any;
    user: User;
    data: any;
    //contact:number;
    constructor(private network: NetworkDetectService,
        private platform: Platform,
        private route: Router,
        private modalCtrl: ModalController,
        private nav: NavParams,
        private utils: UtilitiesService,
        private navController: NavController,
        private toastController: ToastController,
        private apiservices: ApiService,
        private iab: InAppBrowser,
        private storageService: StorageService,
        private mixpanelService: MixpanelService,
        private router: ActivatedRoute
    ) {
        this.designId = +this.router.snapshot.paramMap.get('id');
        console.log(this.designId)
    }
    ngOnInit() {
        this.designData = this.nav.get('teamData');


        console.log(this.designData);
        // this.designData = this.route.getCurrentNavigation().extras.state;
        //  this.data = this.designData.productdetails.queryParams.designData;
        // this.getDesignDetails();

    }
    // getDesignDetails() {

    //   this.utils.showLoading('Getting Design Details').then((success) => {
    //     this.apiservices.getTeamDetails(this.designId).subscribe((result) => {
    //       this.utils.hideLoading();
    //       this.design=result;
    //       console.log(this.design)
    //     })
    //   })
    // }

    edit() {
        this.modalCtrl.dismiss({ 'dismissed': true })

        // this.route.navigate(['/team-schedule/'+this.designData.id])
        let objToSend: NavigationExtras = {
            queryParams: {
                designData: this.designData,


            },
            skipLocationChange: false,
            fragment: 'top'
        };



        this.route.navigate(['/team-schedule/' + this.designData.id], {
            state: { productdetails: objToSend }
        });
    }
    goBack() {
        this.mixpanelService.track("TEAM_DESIGN_DETAIL_PAGE_CLOSE", {});
        this.modalCtrl.dismiss({ 'dismissed': true })
        this.route.navigate(['/team-home/team'])
        //this.utils.setteamModuleRefresh(true);
        //this.modalCtrl.dismiss({'dismissed':true})
        // this.utils.setteamModuleRefresh(true);
        // this.navController.pop();

    }
    //     modal.present();
    //     modal.onWillDismiss().then((dismissed) => {
    //       this.utils.setHomepageDesignRefresh(true);
    //       this.navController.pop();
    //     });
    //   });
    // 2000)
    // }
    // }
    async deleteDesign() {

        this.enableDisable = true;
        const toast = await this.toastController.create({
            header: 'Delete Design',
            message: 'Are you sure you want to delete this Team Member ?',
            cssClass: 'my-custom-delete-class',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.deleteDesignFromServer();
                    }
                }, {
                    text: 'No',
                    handler: () => {
                        this.enableDisable = false;
                    }
                }
            ]
        });
        toast.present();
    }
    deleteDesignFromServer() {
        console.log(this.designData)
        this.utils.showLoading('Deleting Design').then((success) => {
            this.apiservices.deleteTeam(this.designData.id).subscribe((result) => {
                console.log('result', result);
                this.utils.hideLoading().then(() => {
                    this.utils.showSnackBar(this.designData.firstname + " " + 'has been deleted successfully');
                    //  this.navController.pop();
                    this.modalCtrl.dismiss({ 'dismissed': true })


                    this.route.navigate(['/team-home/team'])
                    this.utils.setteamModuleRefresh(true);
                    // this.utils.setteamModuleRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('Some Error Occurred');
                });
            });
        });
    }
    trackdesign(index, design) {
        return design.id;
    }

}
