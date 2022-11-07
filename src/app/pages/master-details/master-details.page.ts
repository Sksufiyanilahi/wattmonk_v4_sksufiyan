import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { PaypalPaymentPage } from '../paypal-payment/paypal-payment.page';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import {
    Downloader, DownloadRequest,
    NotificationVisibility,
} from '@ionic-native/downloader/ngx';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
@Component({
    selector: 'app-master-details',
    templateUrl: './master-details.page.html',
    styleUrls: ['./master-details.page.scss'],
})
export class MasterDetailsPage implements OnInit {
    @ViewChild('tabs', { static: true }) tabs: IonTabs;

    data: any;
    allData: any;
    requesttype: string;
    user: any;
    requirementtype: string;
    dataCheck: any;
    isPrelim: boolean = false;
    isPermit: boolean = false;
    isSurvey: boolean = false;
    isPestamp: boolean = false;
    enableDisable: boolean = false;

    isTabCheck: boolean = true;
    isEditHide: boolean = false;

    dataSubscription: Subscription;

    public previousPageName: string = '';
    public innerHeight: number = 0;

    public userAccessRights: any = {
        viewonly: true
    };
    status: any;

    public sourceType: string = '';
    constructor(
        private navController: NavController,
        private utils: UtilitiesService,
        private router: Router,
        private apiService: ApiService,
        private toastController: ToastController,
        private storageService: StorageService,
        private modalCtrl: ModalController,
        private eventService: CustomEventsService,
    ) {
        this.allData = this.utils.getPrelimId().value;
        this.requesttype = this.utils.getRequestType().value;
        this.requirementtype = this.allData.requirementtype;

        console.log('this.allData', this.allData);
        console.log('this.requirementtype', this.requesttype);

        this.status = this.allData.status
        console.log(this.status)
        // if(this.allData.design != null)
        // {
        //   this.isPermit = true
        // }
        // else if(this.allData.design.survey != null)
        // {
        //   this.isSurvey = true
        // }
        if (this.requesttype == 'prelim') {
            this.isPrelim = true;
        } else if (this.requesttype == 'survey') {
            this.isSurvey = true
            if (this.allData.prelimdesignsurvey != null) {
                this.isPrelim = true;
            }
        } else if (this.requesttype == 'permit') {
            this.isPermit = true;
            if (this.allData.survey != null) {
                this.isSurvey = true;
                if (this.allData.survey.prelimdesignsurvey != null) {
                    this.isPrelim = true;
                }
            }
        } else if (this.requesttype == 'pestamp') {
            this.isPestamp = true;
            if (this.allData.design != null) {
                this.isPermit = true;
                if (this.allData.design.survey != null) {
                    this.isSurvey = true;
                    this.apiService.getSurveyDetail(this.allData.design.survey).subscribe((res: any) => {

                        this.dataCheck = res;
                        if (res.prelimdesignsurvey != null) {
                            this.isPrelim = true;
                        }
                    })
                }
            }
        }

        setTimeout(() => {
            this.userAccessRights = this.utils.getUserAccessRights(this.requesttype);
        }, 1000);
        this.checkTabs();
    }

    ionViewWillEnter() {
        this.innerHeight = window.innerHeight;
        console.log('this.innerHeight', this.innerHeight);
    }

    ngOnInit() {
        this.user = this.storageService.getUser();
        this.sourceType = this.storageService.getSourceType();

        this.previousPageName = this.router.getCurrentNavigation().previousNavigation.finalUrl.toString();
        console.log('this.previousPageName', this.previousPageName);
    }

    checkTabs() {
        if (this.isPrelim && !this.isPermit && !this.isSurvey && !this.isPestamp) {
            this.isTabCheck = false;
        }
        else if (this.isPermit && !this.isPrelim && !this.isSurvey && !this.isPestamp) {
            this.isTabCheck = false;
        }
        else if (this.isSurvey && !this.isPrelim && !this.isPermit && !this.isPestamp) {
            this.isTabCheck = false;
        }
        else if (this.isPestamp && !this.isPrelim && !this.isPermit && !this.isSurvey) {
            this.isTabCheck = false;
        }
        else {
            this.isTabCheck = false;
        }

    }

    goBack() {
        console.log('goBack');

        /*  const back_dro1=document.getElementsByClassName('tag_after_back');
    const back_dro=document.getElementsByClassName('tag_after_back').length;
    if(back_dro)
    {
      document.getElementById.style.
     document.getElementsByClassName().styleshee
      back_dro1.style.setProperty('display', 'none');
      document. getElementsByClassName(tag_after_back).classList.add(‘MyClass’);
      tag_after_back
    }
          */
        if (this.previousPageName != '') {
            let redirectHome = localStorage.getItem('redirectHome');
            if (redirectHome == 'true') {
                localStorage.removeItem('redirectHome');
                if (this.user.role.type == 'surveyors') {
                    this.utils.sethomepageSurveyRefresh(true);
                    this.navController.navigateRoot('surveyor-overview');
                } else {
                    this.utils.sethomepageSurveyRefresh(true);
                    this.navController.navigateRoot('home/survey');
                }
                this.eventService.publish('foo:get-survey', {
                    getSurvey: true
                });
            } else {
                this.navController.pop();
            }
        } else {
            this.utils.onRedirectIfPreviousPageNotFound();
        }
    }

    changeToggle(event) {
        console.log('event', event);

        if (event == this.requesttype) {
            this.isEditHide = false;
        }
        else {
            this.isEditHide = true;
        }
        if (event == 'prelim') {
            if (this.requesttype == 'survey') {
                this.tabs.select('prelim/' + this.allData.prelimdesignsurvey.id);

                //this.router.navigate(['master-details/prelim/' + this.allData.prelimdesignsurvey.id])
            }
            else if (this.requesttype == 'permit') {
                this.tabs.select('prelim/' + this.allData.prelimdesignsurvey.id);

                // this.router.navigate(['master-details/prelim/' + this.allData.survey.prelimdesignsurvey.id])
            }
            else {
                this.tabs.select('prelim/' + this.dataCheck.prelimdesignsurvey.id);

                // this.router.navigate(['master-details/prelim/' + this.dataCheck.prelimdesignsurvey.id])
            }
            // this.data = this.utils.getPrelimId()

            // this.router.navigate(['master-details/prelim/'+this.prelimId.value])
        }
        else if (event == 'survey') {

            if (this.requesttype == 'permit') {

                this.tabs.select('survey/' + this.allData.survey.id);
                // this.router.navigate(['master-details/survey/' + this.allData.survey.id])
            }
            else if (this.requesttype == 'pestamp') {

                this.tabs.select('survey/' + this.allData.design.survey);
                // this.router.navigate(['master-details/survey/' + this.allData.design.survey])
            }
            // this.data = this.utils.getPrelimId()

            // this.tabs.select('prelim/'+this.prelimId.value);
            // this.router.navigate(['master-details/prelim/'+this.prelimId.value])
        }
        else if (event == 'permit') {
            if (this.requesttype == 'pestamp') {
                this.tabs.select('permit/' + this.allData.design.id);
                // this.router.navigate(['master-details/permit/' + this.allData.design.id])
            }
            debugger;
            // this.data = this.utils.getPrelimId()

            // this.tabs.select('prelim/'+this.prelimId.value);
            // this.router.navigate(['master-details/prelim/'+this.prelimId.value])
        }
    }

    edit() {
        if (this.requesttype == 'prelim') {
            if (this.allData.requirementtype == "assessment") {
                this.router.navigate(['/schedule/design/' + this.allData.id]);
            }
            else if (this.allData.requirementtype == 'proposal') {
                this.router.navigate(['/schedule/sales-proposal/' + this.allData.id]);
            }
        }
        else if (this.requesttype == 'permit') {
            this.router.navigate(['/permit-schedule/' + this.allData.id]);
        }
        else if (this.requesttype == 'survey') {
            this.router.navigate(['/schedule/survey/' + this.allData.id]);
        }
        else {
            this.router.navigate(['/pestamp-schedule/' + this.allData.id]);
        }
    }

    async deleteDesign() {
        this.enableDisable = true;
        if (this.requesttype == 'survey') {
            const toast = await this.toastController.create({
                header: 'Delete Design',
                message: 'Are you sure you want to delete this survey?',
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
        else {
            const toast = await this.toastController.create({
                header: 'Delete Design',
                message: 'Are you sure you want to delete this design?',
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
    }

    deleteDesignFromServer() {
        this.utils.showLoading('Deleting Design').then((success) => {
            if (this.requesttype == 'prelim') {
                this.apiService.deleteDesign(this.allData.id).subscribe((result) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.showSnackBar(this.allData.name + " " + 'has been deleted successfully');
                        this.navController.pop();
                        this.utils.setHomepageDesignRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some Error Occurred');
                    });

                });
            }
            else if (this.requesttype == 'permit') {
                this.apiService.deleteDesign(this.allData.id).subscribe((result) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.showSnackBar(this.allData.name + " " + 'has been deleted successfully');
                        this.navController.pop();
                        this.utils.setHomepagePermitRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some Error Occurred');
                    });

                });
            }
            else if (this.requesttype == 'survey') {
                this.apiService.deleteSurvey(this.allData.id).subscribe((result) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.showSnackBar('Survey deleted successfully');
                        this.navController.pop();
                        this.utils.sethomepageSurveyRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some Error Occurred');
                    });
                });
            }
            else {
                this.apiService.deletePestampDesign(this.allData.id).subscribe((result) => {

                    this.utils.hideLoading().then(() => {
                        this.utils.showSnackBar(this.allData.personname + " " + 'has been deleted successfully');
                        this.navController.pop();
                        this.utils.setPeStampRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some Error Occurred');
                    });

                });
            }
        });
    }

    async openPaymentModal(type) {
        console.log('openPaymentModal', type);
        console.log('openPaymentModal this.allData', this.allData);
        this.utils.showLoading('Please wait...').then(() => {
            let surveyPDF;
            if (this.allData.surveypdf == null) {
                console.log('if null');
                this.apiService.generatePdf(this.allData.id).subscribe((data) => {
                    console.log('generatePdf data', data);
                    let getData: any = data;
                    this.allData.surveypdf = getData.surveypdf;
                    
                    surveyPDF = getData.surveypdf;
                    surveyPDF.address = getData.address;
                    surveyPDF.surveypdf_payment = getData.surveypdf_payment;

                    console.log('surveyPDF', surveyPDF);
                    if (surveyPDF?.surveypdf_payment == true) {
                        this.utils.hideLoading().then(() => {
                            if (type == 'share') {
                                this.utils.socialShare(surveyPDF);
                            } else if (type == 'download') {
                                this.utils.fileDownload(surveyPDF);
                            }
                        });
                    } else {
                        this.utils.hideLoading().then(async () => {
                            const modal = await this.modalCtrl.create({
                                component: PaypalPaymentPage,
                                cssClass: 'paypal-payment-modal',
                                componentProps: {
                                    id: this.allData.id
                                },
                                backdropDismiss: false
                            });
                            modal.onDidDismiss().then((data) => {
                                if (data.data.success) {
                                    if (type == 'share') {
                                        this.utils.socialShare(surveyPDF);
                                    } else if (type == 'download') {
                                        this.utils.fileDownload(surveyPDF);
                                    }
                                }

                            });
                            return await modal.present();
                        });
                    }
                }, (error) => {
                    console.log('error', error);
                    this.utils.hideLoading();
                });
            } else {
                console.log('if else');
                surveyPDF = this.allData.surveypdf;
                surveyPDF.address = this.allData.address;
                surveyPDF.surveypdf_payment = this.allData.surveypdf_payment;

                console.log('surveyPDF', surveyPDF);
                if (surveyPDF?.surveypdf_payment == true) {
                    this.utils.hideLoading().then(() => {
                        if (type == 'share') {
                            this.utils.socialShare(surveyPDF);
                        } else if (type == 'download') {
                            this.utils.fileDownload(surveyPDF);
                        }
                    });
                } else {
                    this.utils.hideLoading().then(async () => {
                        const modal = await this.modalCtrl.create({
                            component: PaypalPaymentPage,
                            cssClass: 'paypal-payment-modal',
                            componentProps: {
                                id: this.allData.id
                            },
                            backdropDismiss: false
                        });
                        modal.onDidDismiss().then((data) => {
                            if (data.data.success) {
                                if (type == 'share') {
                                    this.utils.socialShare(surveyPDF);
                                } else if (type == 'download') {
                                    this.utils.fileDownload(surveyPDF);
                                }
                            }

                        });
                        return await modal.present();
                    });
                }
            }
        }, (error) => {
            console.log('error', error);
            this.utils.hideLoading();
        });
    }
}
