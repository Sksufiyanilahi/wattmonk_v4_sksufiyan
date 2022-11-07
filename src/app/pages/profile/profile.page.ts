import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PaymentGatewayPageModule } from '../payment-gateway/payment-gateway.module';
import { PaymentGatewayPage } from '../payment-gateway/payment-gateway.page';
import { AddMoneyPage } from '../add-money/add-money.page';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { Subscription } from 'rxjs';
import { ProfileEditModalPage } from '../profile-edit-modal/profile-edit-modal.page';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AppComponent } from 'src/app/app.component';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { User } from 'src/app/models/user.model';
import { SurveyStorageModel } from 'src/app/models/survey-storage.model';
import { ImageUploadModel } from 'src/app/models/constants';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
    getemail: boolean = false;
    getnotification: boolean = false;
    imageUploadIndex = 1;
    totalImagesToUpload = 0;
    totalSurveys = 0;
    surveyIndex = 1;
    listOfSurveysToSave: SurveyStorageModel[] = [];
    enableDisable: boolean = false;
    profile: any;
    user: User;
    userdata: any;
    statuscount: any;
    activedesignjobs; any;
    public getAutoSyncSurvey: boolean;
    public currentUserRole: any = '';
    userlogo: any;

    constructor(
        private alertCtrl: AlertController,
        private navController: NavController,
        private apiService: ApiService,
        private storage: StorageService,
        private deviceStorage: Storage,
        private utilities: UtilitiesService,
        private toastController: ToastController,
        public modalController: ModalController,
        public router: Router,
        private route: ActivatedRoute,
        private mixpanelService: MixpanelService,
    ) {

    }

    ngOnInit() {


        this.user = this.storage.getUser(); // get data from resolver
        
        console.log(this.userlogo)
        this.mixpanelService.track("PROFILE_PAGE_OPEN", {
            $id: this.user.id,
            $email: this.user.email,
            $name: this.user.firstname + this.user.lastname
        });
        this.enableDisable = false;
        // this.user = this.storage.getUser();

        // this.getProfileData();

    }

    ionViewWillEnter() {
        this.user = this.storage.getUser();
        console.log('this.user', this.user);

        this.getProfileData();
        this.deviceStorage.get('autoSyncSurvey').then((success) => {
            this.getAutoSyncSurvey = success;
        })
    }

    goBack() {
        this.mixpanelService.track("PROFILE_PAGE_CLOSE", {
        });
        this.navController.pop();
    }

    getProfileData() {
        this.apiService.getProfileDetails().subscribe((res :any) => {
            console.log(res);
            this.profile = res.data[0].attributes;
            console.log(this.profile);

            this.getemail = this.profile.getemail;
            this.getnotification = this.profile.getnotification;
            this.getAutoSyncSurvey = this.profile.surveyautosync;

            if (this.profile.roleid == 10) {
                this.currentUserRole = "Analyst";
            } else if (this.profile.roleid == 9) {
                this.currentUserRole = "Surveyor";
            } else if (this.profile.roleid == 4 || this.profile.roleid == 6) {
                this.currentUserRole = "Super Admin";
            } else if (this.profile.roleid == 5 || this.profile.roleid == 7) {
                this.currentUserRole = "Admin";
            } else if (this.profile.roleid == 3) {
                this.currentUserRole = "Design Manager";
            } else {
                this.currentUserRole = this.profile.role.name;
            }
        })
        // this.apiService.getStatusCount(this.user.id).subscribe(
        //     response => {
        //         this.statuscount = response;
        //         this.activedesignjobs = this.statuscount.waitingforassigned + this.statuscount.waitingforacceptance + this.statuscount.requestaccepted + this.statuscount.designassigned
        //             + this.statuscount.reviewassigned + this.statuscount.reviewpassed + this.statuscount.reviewfailed;

        //     }, error => {
        //         this.utilities.errorSnackBar("Error");
        //     })
    }

    isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
    }

    AddWallet() {
        // this.router.navigate(['add-money',{mode:'wallet'}]);
        let objToSend: NavigationExtras = {
            queryParams: {
                //id:response.id,
                mode: 'wallet'
            },
            skipLocationChange: false,
            fragment: 'top'
        };


        this.router.navigate(['/add-money'], {
            state: { productdetails: objToSend }
        });

    }

    async logout() {
        this.mixpanelService.track("SIGNOUT", {
            $id: this.user.id,
            $email: this.user.email,
            $name: this.user.firstname + this.user.lastname
        });
        this.enableDisable = true;
        const toast = await this.toastController.create({
            header: 'Please confirm',
            message: 'Are you sure you want to logout?',
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.utilities.showLoading('Logging Out').then(() => {
                            let data: any = {
                                userid: JSON.parse(this.storage.getUserID()),
                                pushtoken: this.storage.getPushToken()
                            }

                            console.log('data', data);

                            this.apiService.updatePushToken(data).subscribe((success) => {
                                console.log('success', success);
                            }, (error) => {
                                console.log('error', error);
                            });

                            CometChat.logout().then(() => {
                                this.utilities.hideLoading().then(() => {
                                    this.storage.logout();
                                    this.deviceStorage.remove('pvsurveyjson');
                                    this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
                                    // this.deviceStorage.clear();
                                    this.apiService.resetHeaders();
                                    this.navController.navigateRoot('login');
                                })
                            }, err => {
                                this.storage.logout();
                                this.deviceStorage.remove('pvsurveyjson');
                                this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
                                // this.deviceStorage.clear();
                                this.apiService.resetHeaders();
                                this.utilities.hideLoading();
                                this.navController.navigateRoot('login');
                            });
                        }, err => {

                            this.utilities.hideLoading();
                        })
                    }
                }, {
                    text: 'No',
                    handler: () => {
                        this.enableDisable = false;
                    }
                }
            ]
        });
        await toast.present();

    }

    syncSurvey() {
        this.listOfSurveysToSave = [];
        this.deviceStorage.keys().then((listOfKeys) => {
            listOfKeys.forEach((item) => {
                this.deviceStorage.get(item).then((data: SurveyStorageModel) => {
                    if (data.saved) {
                        this.listOfSurveysToSave.push(data);
                    }
                });
            });
        });
        this.utilities.showLoading('Uploading Images').then(() => {
            this.totalSurveys = this.listOfSurveysToSave.length;
            this.uploadAllSurveys();
        });
    }

    uploadAllSurveys() {
        if (this.listOfSurveysToSave.length !== 0) {
            this.uploadAllImagesOfSurvey(this.listOfSurveysToSave[0]);
        } else {
            this.utilities.hideLoading().then(() => {
                this.utilities.showSuccessModal('Survey images have been uploaded').then((modal) => {
                    modal.present();
                });
            });
        }
    }

    uploadAllImagesOfSurvey(surveyData: SurveyStorageModel) {
        const mapOfImages: ImageUploadModel[] = [];
        surveyData.surveyMenu.forEach((mainMenu) => {
            if (mainMenu.imageModel !== null && mainMenu.imageModel !== undefined) {
                mainMenu.imageModel.forEach((imageModel) => {
                    if (imageModel.image !== '') {
                        const image = new ImageUploadModel();
                        image.key = imageModel.imageUploadTag;
                        image.imageData = imageModel.image;
                        image.imagename = imageModel.imageName;
                        mapOfImages.push(image);
                    }

                });
            }
            if (mainMenu.subMenu !== null && mainMenu.subMenu !== undefined) {
                mainMenu.subMenu.forEach((submenu) => {
                    submenu.images.forEach((imageModel) => {
                        if (imageModel.image !== '') {
                            const image = new ImageUploadModel();
                            image.key = imageModel.imageUploadTag;
                            image.imageData = imageModel.image;
                            image.imagename = imageModel.imageName;
                            mapOfImages.push(image);
                        }
                    });
                });
            }
        });

        const image = new ImageUploadModel();
        image.key = 'electricalslocation';
        image.imageData = surveyData.canvasImage;
        image.imagename = 'electricalslocation';
        mapOfImages.push(image);

        this.imageUploadIndex = 1;
        this.totalImagesToUpload = mapOfImages.length;
        this.uploadImageByIndex(mapOfImages, surveyData.surveyid);

    }

    uploadImageByIndex(mapOfImages: ImageUploadModel[], surveyId: number) {
        if (mapOfImages.length !== 0) {
            const imageToUpload = mapOfImages[0];
            const blob = this.utilities.getBlobFromImageData(imageToUpload.imageData);
            let filename = '';
            if (imageToUpload.imagename === '') {
                filename = Date.now().toString() + '.png';
            } else {
                filename = imageToUpload.imagename + '.png';
            }
            this.utilities.setLoadingMessage('Uploading Image ' + this.imageUploadIndex + '/' + this.totalImagesToUpload + ' of survey ' + this.surveyIndex + '/' + this.totalSurveys);
            this.apiService.uploadImage(surveyId, imageToUpload.key, blob, filename).subscribe((data) => {
                this.imageUploadIndex++;
                mapOfImages.splice(0, 1);
                this.uploadImageByIndex(mapOfImages, surveyId);
            }, (error) => {
                this.imageUploadIndex++;
                mapOfImages.splice(0, 1);
                this.uploadImageByIndex(mapOfImages, surveyId);
            });
        } else {
            this.deviceStorage.remove(surveyId + '');
            this.surveyIndex++;
            this.listOfSurveysToSave.splice(0, 1);
            this.uploadAllSurveys();
        }
    }

    async addPoints() {
        this.navController.navigateForward('/payment-gateway');
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.

    }

    onToggleChange(data, value, event) {
        const id = data.id;
        if (value == 'notification') {
            const postData = {
                getnotification: event.detail.checked
            }
            this.apiService.updateUser(id, postData).subscribe(res => {

            })
        } else if (value == 'email') {
            const postData = {
                getemail: event.detail.checked
            }
            this.apiService.updateUser(id, postData).subscribe(res => {

            })
        } else if (value == 'survey') {
            const postData = {
                surveyautosync: event.detail.checked
            }
            this.apiService.updateUser(id, postData).subscribe(res => {
                this.deviceStorage.set('autoSyncSurvey', event.detail.checked);
            })
        }
    }

    async profileEdit() {
        // const modal = await this.modalController.create({
        //   component: ProfileEditModalPage,
        //   cssClass: 'profie-edit',
        //   componentProps: {
        //     'user':this.user
        //   }
        // });
        let modal = await this.modalController.create({
            component: ProfileEditModalPage,
            cssClass: 'profie-edit',
            backdropDismiss: false,
            componentProps: {
                'user': this.user
            }
        });
        modal.onDidDismiss().then(() => {
            this.user = this.storage.getUser();
            this.getProfileData();
        })
        return await modal.present();
    }

    Settings() {
        this.router.navigate(['/settings']);
    }

    async blockUser() {
        console.log('blockUser');
        
        const toast = await this.alertCtrl.create({
            header: 'Delete',
            message:  "Are you sure you want to delete..!",
            // cssClass: 'my-custom-delete-class',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.utilities.showLoading('Deleteing User..').then(() => {
                            let postData = {
                                blocked: true
                            }
                    
                            this.apiService.editProfile(postData, this.user.id).subscribe((res) => {
                                console.log('res', res);
                                if (res.blocked) {
                                    this.utilities.hideLoading().then(() => {
                                        this.log_ou();
                                    });
                                }
                            });
                        }, err => {
                            this.utilities.hideLoading();
                        });
                    }
                }, {
                    text: 'No',
                    handler: () => {
                        // this.enableDisable = false;
                    }
                }
            ]
        });
        toast.present();
    }

    log_ou(){

        this.utilities.showLoading('Logging Out').then(() => {
            let data: any = {
                userid: JSON.parse(this.storage.getUserID()),
                pushtoken: this.storage.getPushToken()
            }
    
            console.log('data', data);
    
            this.apiService.updatePushToken(data).subscribe((success) => {
                console.log('success', success);
            }, (error) => {
                console.log('error', error);
            });
    
            CometChat.logout().then(() => {
                this.utilities.hideLoading().then(() => {
                    this.storage.logout();
                    this.deviceStorage.remove('pvsurveyjson');
                    this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
                    // this.deviceStorage.clear();
                    this.apiService.resetHeaders();
                    this.navController.navigateRoot('login');
                })
            }, err => {
                this.storage.logout();
                this.deviceStorage.remove('pvsurveyjson');
                this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
                // this.deviceStorage.clear();
                this.apiService.resetHeaders();
                this.utilities.hideLoading();
                this.navController.navigateRoot('login');
            });
    
        }, err => {
            this.utilities.hideLoading();
        });
    }
    
}
