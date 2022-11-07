import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DrawerState } from 'ion-bottom-drawer';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { DesginDataModel } from 'src/app/models/design.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ROLES } from 'src/app/services/constants';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AssignPage } from '../assign/assign.page';
import { DeclinePage } from '../decline/decline.page';
import { SurveyDataModel } from 'src/app/models/survey.model';
import { EmailModelPage } from '../email-model/email-model.page';
import { Types } from 'aws-sdk/clients/batch';


export class DesginDataHelper {
    listOfDesigns: DesginDataModel[];
    date: any;
    lateby: any;

    constructor() {
        this.listOfDesigns = [];
    }
}

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.page.html',
    styleUrls: ['./search-bar.page.scss'],
})


export class SearchBarPage implements OnInit {
    searchElement = '';
    DesignModel: any;
    SurveyModel: [];
    PestampModel: [];
    MixModel: [];
    MixModedat: [];

    SortedModel: any;
    sample: any;
    sample1: any;
    sample2: any;

    SearchData: any;
    surveyId = 0;
    surveyData: any;    reviewAssignedTo: any;
    public enableDisable: boolean = false;

    segments: any = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted';
    Type = 'all';
    listOfDesigns: DesginDataModel[];
    listOfDesignsHelper: any[];
    designerData: any;
    listOfAssignees: AssigneeModel[] = [];
    listOfAssignees2: AssigneeModel[] = [];
    drawerState = DrawerState.Bottom;
    assignForm: FormGroup;
    showBottomDraw: boolean = false;
    designId = 0;
    userData: any;
    selectedDesigner: any;
    public userAccessRights: any = {
        viewonly: true
    };
    public options: LaunchNavigatorOptions = {
        start: '',
        app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    updatechat_id: boolean = false;
    public isUserAnalyst: boolean = false;
    public isUserDesigner: boolean = false;
    public getuserData:any = {};
    isSearch_da: boolean =true;
    public isClient: boolean = true;
    public isPeSuperadmin: boolean = false;
    public isWattmonkUser:boolean = false;
    
    constructor(
        private apiService: ApiService, private navController: NavController, private formBuilder: FormBuilder,
        private storage: Storage,
        private storageService: StorageService,
        private socialsharing: SocialSharing,
        public utils: UtilitiesService,    private platform:Platform,

        private alertController: AlertController,
        public modalController: ModalController,
        private router: Router,
        private mixpanelService: MixpanelService,
        private launchNavigator: LaunchNavigator
    ) {
        this.assignForm = this.formBuilder.group({
            // assignedto: new FormControl('', [Validators.required]),
            // comment: new FormControl('')
            assignedto: new FormControl(0, [Validators.required]),
            status: new FormControl('assigned', [Validators.required])
        });
        
       
        
    }

    ngOnInit() {

        this.isClient = this.utils.isClient();
        console.log('client',this.isClient);
        this.userData = this.storageService.getUser();
        console.log('this.userData', this.userData);
        if (this.userData.role.id == ROLES.PESuperAdmin || this.userData.role.id == ROLES.PeAdmin) {
            this.isPeSuperadmin = true;
        }
        this.isWattmonkUser = this.utils.isWattmonkUser();
        this.isUserDesigner = this.utils.isUserDesigner();
        this.isUserAnalyst = this.utils.isUserAnalyst();
        this.mixpanelService.track("SEARCH_PAGE_OPEN", {
        });
        this.SortedModel = [];
        // get access right permission data
        setTimeout(() => {
            this.userAccessRights = this.utils.getUserAccessRights('prelim');
        }, 1000);

        if (this.userData.role.id == ROLES.Analyst) {
            this.isUserAnalyst = true;
        } else {
            this.isUserAnalyst = false;
        }

        if (this.userData.role.id == ROLES.Designer) {
            this.isUserDesigner = true;
          } else {
            this.isUserDesigner = false;
          }
    }

    searchfor(event) {
        if (this.userData.role.type == 'surveyors') {
            this.Type = "survey";
        }
        if (this.userData.role.id == ROLES.Designer || this.userData.role.id == ROLES.Analyst) {
            this.Type = "design";
          }

          if (this.userData.role.id == ROLES.Peengineer || this.userData.role.id == ROLES.PESuperAdmin) {
            console.log(this.userData.role.id);
            this.Type = "pestamp";
          }
        
        this.isSearch_da = true;
        if (this.searchElement != '') {
            this.isSearch_da = false;

            this.apiService.searchAllDesgin(this.searchElement).subscribe((dataModel: any) => {

                this.isSearch_da = true;

                if (this.Type == "survey") {
                    this.sample = this.fillinDynamicData(dataModel.survey);
                    this.SurveyModel = this.sample;
                    this.SortedModel = this.SurveyModel;
                    this.chatIcon(this.SortedModel);
                }
                if (this.Type == "design") {
                    this.sample = this.fillinDynamicData(dataModel.design);
                    this.DesignModel = this.sample;

                    this.SortedModel = this.DesignModel;
                    this.chatIcon(this.SortedModel);
                }
                if (this.Type == "pestamp") {
                    this.sample = this.fillinDynamicData(dataModel.pestamp);
                    this.PestampModel = this.sample;

                    this.SortedModel = this.PestampModel;
                    this.chatIcon(this.SortedModel);
                }
                if (this.Type == "all") {
                    this.sample = this.fillinDynamicData(dataModel.survey);
                    this.SurveyModel = this.sample;

                    this.sample1 = this.fillinDynamicData(dataModel.design);
                    this.DesignModel = this.sample1;
                    this.sample2 = this.fillinDynamicData(dataModel.pestamp);
                    this.PestampModel = this.sample2;
                    
                    //this.MixModel=this.SurveyModel.concat(this.DesignModel);
                    this.MixModel = dataModel.survey.concat(dataModel.design);

                    this.MixModedat = dataModel.pestamp.concat(this.MixModel);
                    //this.SortedModel=this.MixModel.sort((a,b) => a.id.localecompare(b.id));
                    this.SortedModel = this.MixModedat.sort((a: any, b: any) => b.id - a.id);
                    this.chatIcon(this.SortedModel);
                }
            })
            console.log('this.SortedModel', this.SortedModel);

        }
    }

    ///chat icon
    chatIcon(list: DesginDataModel[]) {
        list.forEach(element => {
            var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
                .build();
            groupMembersRequest.fetchNext().then(
                groupMembers => {

                    element.addedtogroupchat = true;
                },
                error => {

                }
            );
        })
    }

    fillinDynamicData(records: DesginDataModel[]): DesginDataModel[] {

        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            } else {
                element.isoverdue = false;
            }
            var reviewdate = new Date(element.reviewstarttime);
            reviewdate.setMinutes(reviewdate.getMinutes() + 15);
            element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
           
            var acceptancedate = new Date(element.designacceptancestarttime);
            element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
            var indesigndate = new Date(element.designstarttime);
            indesigndate.setHours(indesigndate.getHours() + 2);
            
            element.designremainingtime = this.utils.getRemainingTime(indesigndate.toString());
            //Setting acceptance timer
            if (element.status == "outsourced") {
                if (element.requesttype == "permit") {
                    var acceptancedate = new Date(element.designacceptancestarttime);
                    element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                } else {
                    var acceptancedate = new Date(element.designacceptancestarttime);
                    element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }

                if (element.designacceptanceremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }

            //Setting design timer
            if (element.status == "designassigned" || element.status == "requestdeclined" || element.status == "designcompleted") {
                if (element.requesttype == "permit") {
                    var acceptancedate = new Date(element.designstarttime);
                    acceptancedate.setHours(acceptancedate.getHours() + 6);
                    element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                } else {
                    var acceptancedate = new Date(element.designstarttime);
                    acceptancedate.setHours(acceptancedate.getHours() + 2);
                    element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                if (element.designremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }

            //Setting review timer
            if (element.status == "reviewassigned" || element.status == "reviewpassed" || element.status == "reviewfailed") {
                if (element.requesttype == "permit") {
                    var reviewdate = new Date(element.reviewstarttime);
                    reviewdate.setHours(reviewdate.getHours() + 2);
                    element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
                } else {
                    var reviewdate = new Date(element.reviewstarttime);
                    reviewdate.setMinutes(reviewdate.getMinutes() + 15);
                    element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
                }
                if (element.reviewremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
        
        
        
        });

        return records;
    }

    goBack() {
        this.mixpanelService.track("SEARCH_PAGE_CLOSE", {
        });
        this.navController.pop();
    }



    getDesigns(event) {
        ;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }

    fetchPendingDesigns(event, showLoader: boolean) {

        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        //this.isSearch_da = true;
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            // this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
            //   this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {


            //     if (event !== null) {
            //       event.target.complete();
            //     }
            //   });
            // }, responseError => {
            //   this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
            //     if (event !== null) {
            //       event.target.complete();
            //     }
            //     const error: ErrorModel = responseError.error;
            //     this.utils.errorSnackBar(error.message[0].messages[0].message);
            //   });
            // });
        });
    }

    openDesigners(id: number, designData) {

        this.designerData = designData;
        this.SearchData = designData;
        this.reviewAssignedTo = designData.reviewassignedto;

        if (this.listOfAssignees.length === 0) {

            this.utils.showLoading('Getting Designers').then(() => {
                this.apiService.getDesigners().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));

                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = DrawerState.Docked;
                        this.assignForm.patchValue({
                            assignedto: 0
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });

        } else {
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
                assignedto: 0
            });
        }
    }



    openSurveyors(id: number, surveyData, event) {
        event.stopPropagation();
        this.surveyData = surveyData;
        this.SearchData = surveyData;
        this.reviewAssignedTo = surveyData.assignedto;

        this.listOfAssignees = [];
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Surveyors').then(() => {
                this.apiService.getSurveyors().subscribe(assignees => {
                    this.utils.hideLoading().then(async () => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));



                        const modal = await this.modalController.create({
                            component: AssignPage,
                            cssClass: 'small-modal',
                            componentProps: {
                                
                                surveyData: assignees,
                                memberid: id
                            },
                            backdropDismiss: false,
                            showBackdrop: true,
                            
                        });
                        modal.onDidDismiss().then((data) => {
                           // console.log('user data', data)



                            this.getuserData = data.data;
                            if (this.getuserData != null || this.getuserData != undefined) {
                                if (this.getuserData.id != null) {
                                   
                                    this.selectedDesigner = this.getuserData.uData;
                                    this.surveyId = surveyData.id;
                                    this.assignToSurveyor();
                                } else {
                                    
                                }
                            } else {
                                
                            }

                            
                        })
                        return await modal.present();



                        this.showBottomDraw = true;
                        this.surveyId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = DrawerState.Docked;
                        this.assignForm.patchValue({
                            assignedto: ''
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });

        } else {
            this.surveyId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }


    }
/*
    resumeSurvey(surveyData, event) {
        event.stopPropagation();

        window.addEventListener('keyboardDidHide', () => {
            this.router.navigate(['/startsurvey/' + surveyData.id + '/' + surveyData.jobtype]);
        });
    }

    assignedTo(surveyData, event) {
        event.stopPropagation();
        let postData = {
            assignedto: this.userData.id,
            status: "assigned"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {

        });

        window.addEventListener('keyboardDidHide', () => {
            this.router.navigate(['/startsurvey/' + surveyData.id + '/' + surveyData.jobtype]);
        });


    }
*/


    resumeSurvey(surveyData, event) {
        event.stopPropagation();
        window.addEventListener('keyboardDidHide', () => {
        });
        setTimeout(() => {
            this.router.navigate(['/start-survey/' + surveyData.id + '/' + surveyData.jobtype]);
        }, 100);
    }
    assignedTo(surveyData, event) {
        event.stopPropagation();
        let postData = {
            assignedto: this.userData.id,
            status: "assigned"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {
        });
        window.addEventListener('keyboardDidHide', () => {
        });
        setTimeout(() => {
            this.router.navigate(['/start-survey/' + surveyData.id + '/' + surveyData.jobtype]);
        }, 100);
    }
    openAnalysts(id: number, designData) {

        this.designerData = designData;
        this.SearchData = designData;
        this.reviewAssignedTo = designData.reviewassignedto;

        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Analysts').then(() => {
                this.apiService.getAnalysts().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));

                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = DrawerState.Docked;
                        this.assignForm.patchValue({
                            assignedto: 0
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });

        } else {
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
                assignedto: 0
            });
        }
    }



    async openreviewPassed(id, designData) {
        this.designId = id;
        let data = designData;
        const alert = await this.alertController.create({
            cssClass: 'alertClass',
            header: 'Confirm!',
            message: 'Would you like to  Add Comments!!',
            inputs:
                [{
                    name: 'comment',
                    id: 'comment',
                    type: 'textarea',
                    placeholder: 'Enter Comment'
                }
                ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                }, {
                    text: 'deliver',
                    handler: (alertData) => {
                        var postData = {};
                        postData = {
                            status: "delivered",
                            comments: alertData.comment,
                        };

                        if (data.type == "design") {
                            this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                                this.utils.hideLoading().then(() => {
                                    ;

                                    this.utils.showSnackBar('Design request has been delivered successfully');

                                    this.utils.setHomepageDesignRefresh(true);
                                })
                            }, (error) => {
                                this.utils.hideLoading();
                                ;
                            });
                        }
                        if (data.type == "survey") {
                            this.apiService.updateSurveyForm(postData, this.designId).subscribe((value) => {
                                this.utils.hideLoading().then(() => {
                                    ;

                                    this.utils.showSnackBar('Survey request has been delivered successfully');

                                    this.utils.setHomepageDesignRefresh(true);
                                })
                            }, (error) => {
                                this.utils.hideLoading();
                                ;
                            });
                        }
                    }
                }
            ]
        });

        await alert.present();



    }


    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = DrawerState.Bottom;
            this.utils.setBottomBarHomepage(true);
        } else {
            this.showBottomDraw = true;
        }
    }

    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;


    }

    accept(id, data: string) {
        let event = null
        let status = {
            status: data
        }
        this.apiService.updateDesignForm(status, id).subscribe((res: any) => {

        })
        this.searchfor(event);

    }


    async decline(id) {
        const modal = await this.modalController.create({
            component: DeclinePage,
            cssClass: 'my-custom-modal-css',
            componentProps: {
                id: id
            },
            backdropDismiss: false
        });
        modal.onDidDismiss().then((data) => {

            if (data.data.cancel == 'cancel') {
            } else {
                this.getDesigns(null)
            }
        });
        // modal.dismiss(() => {
        //   ;
        //   this.getDesigns(null);
        // });
        return await modal.present();
    }


    dismissBottomSheet() {
        this.showBottomDraw = false;

        this.drawerState = DrawerState.Bottom;
        this.utils.setBottomBarHomepage(true);
        this.listOfAssignees = [];
    }

    //assigning to surveyor
    assignToSurveyor() {
        console.log('assignToSurveyor');

        console.log('assignToSurveyor');
        if (this.assignForm.status === 'INVALID' && (this.surveyData.status === 'reviewassigned' || this.surveyData.status === 'reviewfailed' || this.surveyData.status === 'reviewpassed')) {
            this.utils.errorSnackBar('Please select a analyst');
        } else if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a surveyor');
        } else if (this.reviewAssignedTo != null && (this.selectedDesigner.id == this.reviewAssignedTo.id)) {
            this.utils.errorSnackBar("This survey request has been already assigned to" + " " + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname)

        } else {
            var surveystarttime = new Date();
            var milisecond = surveystarttime.getTime();
            var additonalhours = 0;
            if (this.surveyData.requesttype == "prelim") {

                additonalhours = this.selectedDesigner.jobcount * 2;

                surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
            } else {
                additonalhours = this.selectedDesigner.jobcount * 6;
                surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
            }

            var postData = {};
            if (this.surveyData.createdby.id == this.userData.id) {
                if (this.selectedDesigner.parent.id == this.userData.parent.id) {
                    if (this.selectedDesigner.role.type == "qcinspector") {
                        postData = {
                            reviewassignedto: this.selectedDesigner.id,
                            status: "reviewassigned",
                            reviewstarttime: milisecond
                        };
                    }
                    if (this.selectedDesigner.role.type == "surveyors") {
                        postData = {
                            assignedto: this.selectedDesigner.id,
                            isoutsourced: "false",
                            status: "assigned",
                            surveystarttime: surveystarttime
                        };

                    }

                } else {
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced"
                    };
                }
            } else {
                if (this.selectedDesigner.role.type == "surveyors") {
                    postData = {
                        assignedto: this.selectedDesigner.id,
                        status: "assigned",
                        surveystarttime: surveystarttime
                    };
                }
                if (this.selectedDesigner.role.type == "qcinspector") {
                    postData = {
                        reviewassignedto: this.selectedDesigner.id,
                        status: "reviewassigned",
                        reviewstarttime: milisecond
                    };
                }
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        this.createNewDesignChatGroup(value);
                        this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname + ' ' + 'successfully');

                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.sethomepageSurveyRefresh(true);
                        this.addUserToGroupChat();
                    })
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });

            // var designstarttime = new Date();
            // var milisecond = designstarttime.getTime();
            // var additonalhours = 0;
            // console.log('this.surveyData', this.surveyData);
            // console.log('this.userData', this.userData);

            // console.log('this.surveyData.requesttype', this.surveyData.requesttype);

            // if (this.surveyData.requesttype == "prelim") {

            //     additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;

            //     designstarttime.setHours(designstarttime.getHours() + additonalhours);
            // } else {
            //     additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
            //     designstarttime.setHours(designstarttime.getHours() + additonalhours);
            // }

            // var postData = {};
            // if (this.surveyData.createdby.id == this.userData.id) {
            //     if (this.selectedDesigner.company == this.userData.company) {
            //         if (this.selectedDesigner.role.type == "qcinspector") {
            //             postData = {
            //                 reviewassignedto: this.selectedDesigner.id,
            //                 status: "reviewassigned",
            //                 reviewstarttime: milisecond
            //             };
            //         }
            //         if (this.selectedDesigner.role.type == "surveyor") {
            //             postData = {
            //                 designassignedto: this.selectedDesigner.id,
            //                 isoutsourced: "false",
            //                 status: "assigned",
            //                 designstarttime: designstarttime
            //             };

            //         }

            //     }
            //     else {
            //         postData = {
            //             outsourcedto: this.selectedDesigner.id,
            //             isoutsourced: "true",
            //             status: "outsourced"
            //         };
            //     }
            // } else {
            //     if (this.selectedDesigner.role.type == "surveyor") {
            //         postData = {
            //             designassignedto: this.selectedDesigner.id,
            //             status: "assigned",
            //             designstarttime: designstarttime
            //         };
            //     }
            //     if (this.selectedDesigner.role.type == "qcinspector") {
            //         postData = {
            //             reviewassignedto: this.selectedDesigner.id,
            //             status: "reviewassigned",
            //             reviewstarttime: milisecond
            //         };
            //     }
            // }
            // this.utils.showLoading('Assigning').then(() => {
            //     this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
            //         this.utils.hideLoading().then(() => {
            //             ;

            //             this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + ' ' + this.selectedDesigner.lastname + ' ' + 'successfully');
            //             this.dismissBottomSheet();
            //             this.showBottomDraw = false;
            //             this.utils.setHomepageDesignRefresh(true);
            //         })
            //     }, (error) => {
            //         this.utils.hideLoading();
            //         this.dismissBottomSheet();
            //         this.showBottomDraw = false;
            //     });
            // })
        }

    }
    addUserToGroupChat(): void {
        // let GUID = this.surveyData.chatid;
        // let userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
        // if (this.isclientassigning) {
        //     userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
        // }
        // let membersList = [
        //     new CometChat.GroupMember(
        //         "" + this.surveyData.cometchatuid,
        //         userscope
        //     ),
        // ];
        // CometChat.addMembersToGroup(GUID, membersList, []).then(
        // );

        let GUID: string = this.surveyData.chatid;
        console.log('GUID', GUID);
        let UID: string = JSON.stringify(this.selectedDesigner.cometchatuid);
        console.log('UID', UID);
        let membersList: CometChat.GroupMember[] = [
            new CometChat.GroupMember(UID, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT)
        ];
        console.log('membersList', membersList);

        CometChat.addMembersToGroup(GUID, membersList, []).then(
            (response: Object) => {
                console.log("response", response);
            }, (error: CometChat.CometChatException) => {
                console.log("Something went wrong", error);
            }
        );
    }

    createNewDesignChatGroup(survey: SurveyDataModel) {
        var GUID = survey.chatid;
        var address = survey.address.substring(0, 60);
        var groupName = survey.name + "_" + address;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = survey.groupchatpassword;

        var group = new CometChat.Group(GUID, groupName, groupType, password);

        CometChat.createGroup(group).then(
            group => {
                let membersList = [
                    new CometChat.GroupMember("" + survey.createdby.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
                    new CometChat.GroupMember("" + this.userData.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
                    new CometChat.GroupMember("" + this.selectedDesigner.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT)
                ];
                CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
                    response => {
                        this.updatechat_id = true;
                        let chatgroupusers = [];
                        chatgroupusers.push(survey.createdby.cometchatuid, this.userData.cometchatuid, this.selectedDesigner.cometchatuid);
                        let inputData = {
                            title: groupName,
                            guid: GUID,
                            parentid: survey.createdby?.parent,
                            chatgroupusers: chatgroupusers
                        }
                        this.apiService.addChatGroup(inputData).subscribe(response => {
                        })
                    },
                    error => {
                    }
                );
            },
            error => {

            }
        );

    }

    //assigning to designer
    assignToDesigner() {


        if (this.assignForm.status === 'INVALID' && (this.designerData.status === 'designcompleted' || this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')) {
            this.utils.errorSnackBar('Please select a analyst');
        }
        else if (this.assignForm.status === 'INVALID' && (this.designerData.status === 'created' || this.designerData.status === 'requestaccepted' || this.designerData.status === 'designassigned')) {
            this.utils.errorSnackBar('Please select a designer');
        } else {


            var designstarttime = new Date();
            var milisecond = designstarttime.getTime();
            var additonalhours = 0;
            if (this.designerData.requesttype == "prelim") {
                additonalhours = this.selectedDesigner.jobcount * 2;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            } else {
                additonalhours = this.selectedDesigner.jobcount * 6;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            var postData = {};
            if (this.designerData.createdby.id == this.userData.id) {
                if (this.selectedDesigner.company == this.userData.company) {
                    if (this.selectedDesigner.role.type == "qcinspector") {
                        postData = {
                            reviewassignedto: this.selectedDesigner.id,
                            status: "reviewassigned",
                            reviewstarttime: milisecond
                        };
                    }
                    if (this.selectedDesigner.role.type == "designer") {
                        postData = {
                            designassignedto: this.selectedDesigner.id,
                            isoutsourced: "false",
                            status: "designassigned",
                            designstarttime: designstarttime
                        };

                    }

                }
                else {
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced"
                    };
                }
            } else {
                if (this.selectedDesigner.role.type == "designer") {
                    postData = {
                        designassignedto: this.selectedDesigner.id,
                        status: "designassigned",
                        designstarttime: designstarttime
                    };
                }
                if (this.selectedDesigner.role.type == "qcinspector") {
                    postData = {
                        reviewassignedto: this.selectedDesigner.id,
                        status: "reviewassigned",
                        reviewstarttime: milisecond
                    };
                }
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        ;

                        this.utils.showSnackBar('Design request has been assigned to' + ' ' + this.selectedDesigner.firstname + ' ' + this.selectedDesigner.lastname + ' ' + 'successfully');
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.setHomepageDesignRefresh(true);
                    })
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            })
        }

    }



    //method for bottom drawer confirm
    assign() {
        console.log('this.assignForm', this.assignForm);

        if (this.assignForm.status == 'INVALID') {
            if (this.surveyData.type == 'survey') {
                this.utils.errorSnackBar('Please select a surveyor');
            } else if (this.surveyData.type == 'design') {
                this.utils.errorSnackBar('Please select a designer');
            }
            // if (this.selectedDesigner.role.type == "designer") {
            //     this.utils.errorSnackBar('Please select a designer');
            // }
            // else if (this.selectedDesigner.role.type == "surveyor") {
            //     this.utils.errorSnackBar('Please select a surveyor');
            // }
            // else if (this.selectedDesigner.role.type == "qcinspector") {
            //     this.utils.errorSnackBar('Please select a analyst');
            // }
        } else {
            console.log('this.selectedDesigner.role.type', this.selectedDesigner.role.type);

            if (this.selectedDesigner.role.type == "designer") {
                this.assignToDesigner();
            } else if (this.selectedDesigner.role.type == "surveyors") {
                this.assignToSurveyor();
            } else if (this.selectedDesigner.role.type == "qcinspector") {

                if (this.SearchData.type == "design") {
                    this.assignToDesigner();
                }
                if (this.SearchData.type == "survey") {
                    this.assignToSurveyor();
                }
            }
        }
    }

    shareWhatsapp(designData) {
        this.socialsharing.share(designData.prelimdesign.url);
    }

    async shareViaEmails(id, designData) {
        const modal = await this.modalController.create({
            component: EmailModelPage,
            cssClass: 'email-modal-css',
            componentProps: {
                id: id,
                designData: designData
            },

        });
        modal.onDidDismiss().then((data) => {

            if (data.data.cancel == 'cancel') {
            } else {
                this.getDesigns(null)
            }
        });
        return await modal.present();
    }

    refreshData(event) {
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }

    gotoChats(surveyData, event) {
        event.stopPropagation();
        console.log(surveyData)
        let objToSend: NavigationExtras = {
            queryParams: {
                name: surveyData.name + '_' + surveyData.address,
                guid: surveyData.chatid
            },
            skipLocationChange: false,
            fragment: 'top'
        };


        window.addEventListener('keyboardDidHide', () => {
        });
        setTimeout(() => {
            this.router.navigate(['chat/' + surveyData.chatid], {
                state: { productdetails: objToSend }
            });
                }, 100);


     

        
    }

    gotoActivity(search, event) {
        event.stopPropagation();

        window.addEventListener('keyboardDidHide', () => {
        });
        setTimeout(() => {
            this.router.navigate(['/activity-details' + '/' + search.id + '/design']);
        }, 100);


       
       
    }

    gotoPEStampActivity(search, event) {
        event.stopPropagation();

       


        window.addEventListener('keyboardDidHide', () => {
        });
        setTimeout(() => {
            this.router.navigate(['/activity-details' + '/' + search.id + '/pestamp']);
        }, 100);

        
    }

    gotoSurveyActivity(search, event) {
        event.stopPropagation();
        window.addEventListener('keyboardDidHide', () => {
            this.router.navigate(['/activity-details' + '/' + search.id + '/survey']);
        });
       
    }

    // open address
    openAddressOnMap(address: string,event,latitude,longitude) {
        event.stopPropagation();
    
    
        if (this.platform.is('ios')) {
          //try google maps first
          this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS).then(
              response => {
                  if (response) {
                      this.launchNavigator.navigate(address, this.options);
                  } else {
                      window.open('maps://?q=' + latitude + ',' + longitude, '_system');
                  }
              },
              failure => {
                  //check failed;
              }
          );
      } else {
          this.launchNavigator.navigate(address, this.options);
      }
    
        //this.launchNavigator.navigate(address, this.options);
      }

    // open mail click on email id
    onMailClick(email: string, event): void {
        event.stopPropagation();
        window.location.href = "mailto:" + email;
    }

    gotoDetails(search, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        // this.router.navigate(['/survey-detail/' + surveyData.id])
       this.utils.setPrelimId(search)
        this.utils.setRequestType('pestamp')

        console.log('search','pestamp');

      //  window.addEventListener('keyboardDidHide', () => {
          //  this.router.navigate(['/master-details/'+search.type+'/' + search.id])
       // });
        
    }


    gotoDetailspage(path,id,search, type){

        this.utils.setPrelimId(search)
        this.utils.setRequestType(type)

        console.log('search',type);

console.log('psth' , path + id);

window.addEventListener('keyboardDidHide', () => {
});
setTimeout(() => {
    this.router.navigate([path + id]);
}, 100);


    }


}


