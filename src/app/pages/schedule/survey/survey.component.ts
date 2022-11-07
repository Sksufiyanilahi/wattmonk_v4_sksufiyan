import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormArray, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { AlertController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AddressModel } from 'src/app/models/address.model';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { FIELD_REQUIRED, INVALID_ADDRESS, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE, INVALID_PHONE_NUMBER, ScheduleFormEvent, WHITESPACES } from 'src/app/models/constants';
import { ErrorModel } from 'src/app/models/error.model';
import { SurveyDataModel } from 'src/app/models/survey.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ADDRESSFORMAT, MAILFORMAT, NAME, NUMBERPATTERN, MOBILEPATTERN } from 'src/app/services/constants';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { DesginDataModel } from 'src/app/models/design.model';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { requireSlotbtnsToBeCheckedValidator } from 'src/app/directive/number-only/require-slotbtns-to-be-checked-validator';
import { TimeSlotsModel } from '../../../models/timeslots.model';
import { AssignPage } from '../../assign/assign.page';
import { User } from 'src/app/models/user.model';
import { DrawerState } from 'ion-bottom-drawer';


@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

    public surveyForm: FormGroup;
    listOfAssignees: AssigneeModel[] = [];
    private subscription: Subscription;
    private addressSubscription: Subscription;

    nameError = INVALID_NAME_MESSAGE;
    emailError = INVALID_EMAIL_MESSAGE;
    phoneError = INVALID_PHONE_NUMBER;
    fieldRequired = FIELD_REQUIRED;
    whitespaces = WHITESPACES
    addressError = INVALID_ADDRESS;
    surveyId = 0;
    private survey: SurveyDataModel;
    address: string;
    userData: any;

    GoogleAutocomplete: google.maps.places.AutocompleteService;
    autocompleteItems: any[];
    map: any;
    fieldDisabled = false;

    geoEncoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };

    geocoder = new google.maps.Geocoder();
    autoCompleteOff: boolean = false;
    // isSelectSearchResult: boolean = false;
    isSelectSearchResult: boolean = true;
    surveydatapresent: boolean = false;
    data: any;
    surveydata: any;
    browser: any;
    SurveyResponce: any;
    SurveyResp1: any;
    public propertytypevalue: any;
    public my_date: any;
    public my_time: any;
    public mydate: any;
    public mytime: any;
    public dateModal: any;
    public timeModal: any;
    public currentDate: any;
    design: DesginDataModel = null;
    btnArray = [];
    slotsArr: Array<TimeSlotsModel>;
    public slotvalue: any;
    reviewAssignedTo: any;
    selectedDesigner: User;
    public getuserData: any = {};
    public surveyData: any;
    drawerState = DrawerState.Bottom;
    showBottomDraw: boolean = false;
    assignForm: FormGroup;
    isclientassigning: boolean = false;
    updatechat_id: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private navController: NavController,
        private utilities: UtilitiesService,
        private platform: Platform,
        private apiService: ApiService,
        private storage: StorageService,
        private route: ActivatedRoute,
        private router: Router,
        private zone: NgZone,
        private cdr: ChangeDetectorRef,
        private nativeGeocoder: NativeGeocoder,
        private iab: InAppBrowser,
        private alertControl: AlertController,
        private toastController: ToastController,
        private eventService: CustomEventsService,
        private datePipe: DatePipe,
        private modalCtrl: ModalController
    ) {

        this.surveyId = +this.route.snapshot.paramMap.get('id');
        this.currentDate = new Date().toISOString();
        const mydates: any = new Date().getTime();
        this.mydate = moment(this.currentDate).format('YYYY-MM-DD');
        this.my_date = moment(this.currentDate).format('YYYY-MM-DD');
        this.my_time = moment(this.currentDate).format('HH:mm');

        this.assignForm = this.formBuilder.group({
            assignedto: new FormControl(0, [Validators.required]),
            status: new FormControl('assigned', [Validators.required])
        });

        this.surveyForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.pattern(NAME)]),
            email: new FormControl(''),
            phonenumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(MOBILEPATTERN)]),
            jobtype: new FormControl('', [Validators.required]),
            projecttype: new FormControl('', [Validators.required]),
            surveydatetime: new FormControl(mydates),
            datetime: new FormControl(''),
            time: new FormControl('', [Validators.required]),

            comments: new FormControl(''),
            address: new FormControl('', [Validators.required, Validators.pattern(ADDRESSFORMAT)]),
            source: new FormControl(this.utilities.checkPlatform(), [Validators.required]),
            assignedto: new FormControl(null),
            createdby: new FormControl(parseInt(this.storage.getUserID()), [Validators.required]),
            latitude: new FormControl(null),
            longitude: new FormControl(null),
            country: new FormControl(''),
            state: new FormControl(''),
            city: new FormControl(''),
            postalcode: new FormControl(null),
            status: new FormControl('created'),
            chatid: new FormControl(null),
            groupchatpassword: new FormControl(null),
            oldcommentid: new FormControl(''),
            prelimdesignsurvey: new FormControl(null),
            isdesigndelivered: new FormControl(false),
            sameemailconfirmed: new FormControl(null),
            creatorparentid: new FormControl(parseInt(this.storage.getParentId())),
            projectsubtype: new FormControl('', [Validators.required]),
            date_my: new FormControl(this.datePipe.transform(new Date(this.currentDate), 'd MMM YYYY')),
            time_my: new FormControl(this.datePipe.transform(new Date(this.currentDate), 'hh:mm aa')),
        });
        this.surveyForm.get('jobtype').setValue('pv');

        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
    }


    ngOnInit() {
        this.surveydatapresent = false
        this.data = this.router.getCurrentNavigation().extras.state;
        if (this.data != undefined) {
            this.surveydata = this.data.productdetails.queryParams.designData;
            // this.tabsDisabled = this.data.productdetails.queryParams.tabsDisabled;
            // this.nonEditableField = this.data.productdetails.queryParams.nonEditableField;

            this.surveydatapresent = true


        }
        this.fieldDisabled = false;
        this.userData = this.storage.getUser();
        // this.address= this.storage.getData();
        this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
            switch (event) {
                case ScheduleFormEvent.SAVE_SURVEY_FORM:
                    this.saveSurvey();
                    break;
                case ScheduleFormEvent.START_SURVEY:
                    this.startSurvey();
                    break;
            }
        });

        if (this.surveyId !== 0) {
            this.getSurveyDetails();
        } else if (this.surveydatapresent) {
            this.getsurveydata();
        }
        this.getAssignees();
        this.getslotsData(this.datePipe.transform(new Date(this.currentDate), 'YYYY-MM-dd'));
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
        // if (this.surveyId === 0) {
        //   this.addressSubscription.unsubscribe();
        // }
        // this.utilities.getScheduleFormEvent().unsubscribe();
    }

    startSurvey() {
        if (this.surveyForm.status === 'INVALID') {
            this.showInvalidFormAlert();
        } else {
            this.utilities.showLoading('Saving Survey').then(() => {
                // if(this.userData.role.type=== 'surveyors'){
                //   this.surveyForm.get('status').setValue('assigned');
                // }
                if (this.surveyId !== 0) {
                    this.surveyForm.get('chatid').setValue(this.survey.chatid);
                    this.surveyForm.get('groupchatpassword').setValue(this.survey.groupchatpassword);
                    this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
                        this.utilities.hideLoading().then(() => {
                            this.surveyData = survey;

                            this.utilities.setDesignDetailsRefresh(true);
                            this.router.navigate(['/start-survey/' + survey.id + '/' + survey.jobtype]);
                        });
                    },
                        responseError => {
                            this.utilities.hideLoading().then(() => {
                                const error: ErrorModel = responseError.error;
                                this.utilities.errorSnackBar(responseError.error.message.message);
                            });
                            //
                        });
                } else {

                    // if starting survey directly, assign the survey to yourself
                    this.surveyForm.get('assignedto').setValue(this.storage.getUserID());
                    // if(this.userData.role.type === 'surveyors'){
                    console.log('new', this.surveyForm.get('surveydatetime').value);
                    var selectedDate: any = moment(this.surveyForm.get('date_my').value + ' ' + this.surveyForm.get('time_my').value);
                    this.surveyForm.get('datetime').setValue(new Date(selectedDate._d).getTime());
                    this.surveyForm.get('status').setValue('created');
                    // }else{
                    // this.surveyForm.get('status').setValue('created');
                    // }

                    this.surveyForm.get('chatid').setValue('survey' + "_" + new Date().getTime());
                    this.surveyForm.get('groupchatpassword').setValue('wattmonk' + new Date().getTime());
                    this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
                        this.utilities.hideLoading().then(() => {

                            this.surveyData = survey;
                            //this.createChatGroup(this.surveyData);
                            this.utilities.setDesignDetailsRefresh(true);
                            this.router.navigate(['/start-survey/' + survey.id + '/' + survey.jobtype]);
                        });
                    },
                        responseError => {
                            this.utilities.hideLoading();
                            const error: ErrorModel = responseError.error;
                            console.log(error)
                            if (responseError.error.status == "alreadyexist") {
                                var message = responseError.error.message.message;
                                this.confirmEmail(message, "start");
                            }
                            else {
                                this.utilities.errorSnackBar(responseError.error.message.message);
                            }
                            //
                        }
                    );
                }
            });
        }
    }

    getsurveydata() {

        this.surveyForm.patchValue({
            prelimdesignsurvey: this.surveydata.id,
            name: this.surveydata.name,
            email: this.surveydata.email,

            address: this.surveydata.address,
            phonenumber: this.surveydata.phonenumber,
            createdby: this.surveydata.createdby.id,
            // architecturaldesign: this.surveydata.architecturaldesign,
            jobtype: this.surveydata.formattedjobtype,
            projecttype: this.surveydata.projecttype,
            latitude: this.surveydata.latitude,
            longitude: this.surveydata.longitude,
            country: this.surveydata.country,
            state: this.surveydata.state,
            city: this.surveydata.city,
            postalcode: this.surveydata.postalCode,
            isdesigndelivered: true,
            time: this.surveydata.time

            // issurveycompleted: true,
            //attachments:this.design.attachments,

            // attachments: this.surveydata.attachments,

        });
        this.surveyForm.get("jobtype").setValue("pv");
        this.utilities.setStaticAddress(this.surveydata.address);
        if (this.surveyForm.get('email').value == '') {
            this.fieldDisabled = false;
        } else {
            this.fieldDisabled = true;
        }
    }

    saveSurvey() {
        const invalid = [];
        const controls = this.surveyForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);

            }
        }
        console.log('this.surveyForm', this.surveyForm);

        if (this.surveyForm.status === 'INVALID') {
            if (this.surveyForm.value.name == '') {
                this.utilities.errorSnackBar('Please enter name.');
            } else if (this.surveyForm.value.phonenumber == '') {
                this.utilities.errorSnackBar('Please enter phone number.');
            } else if (this.surveyForm.value.jobtype == '') {
                this.utilities.errorSnackBar('Please enter job type.');
            } else if (this.surveyForm.value.time == '') {
                this.utilities.errorSnackBar('Please fill the slot.');
            }
            else if (this.surveyForm.value.projecttype == '') {
                this.utilities.errorSnackBar('Please fill the Property Type.');
            } else if (this.surveyForm.value.projectsubtype == '') {
                this.utilities.errorSnackBar('Please fill the Property Sub Type.');
            } else {
                this.utilities.errorSnackBar('Address not found. Make sure your location is on in device.');
            }
            return;
        } else {
            this.utilities.showLoading('Saving Survey').then(() => {
                var selectedDate: any = moment(this.surveyForm.get('date_my').value + ' ' + this.surveyForm.get('time_my').value);
                this.surveyForm.get('datetime').setValue(new Date(selectedDate._d).getTime());

                // this.surveyForm.get('datetime').setValue(this.utilities.formatDate(this.surveyForm.get('surveydatetime').value));
                if (this.userData.role.type === 'surveyors') {
                    this.surveyForm.get('assignedto').setValue(this.storage.getUserID());
                    this.surveyForm.get('status').setValue('created');
                }
                if (this.surveyId !== 0) {
                    this.surveyForm.get('chatid').setValue(this.survey.chatid);
                    this.surveyForm.get('groupchatpassword').setValue(this.survey.groupchatpassword);
                    this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
                        this.utilities.hideLoading().then(() => {
                            this.surveyData = survey;
                            //this.createChatGroup(this.surveyData);
                            this.utilities.showSnackBar('Survey has been updated');
                            this.utilities.setSurveyDetailsRefresh(true);
                            // this.navController.navigateRoot('home/survey');
                            this.navController.pop();

                            this.eventService.publish('foo:get-survey', {
                                getSurvey: true
                            });
                        });
                    },
                        responseError => {

                            this.utilities.hideLoading().then(() => {
                                const error: ErrorModel = responseError.error;

                                this.utilities.errorSnackBar(responseError.error.message.message);
                            });
                            //
                        });

                } else {
                    if (this.surveyForm.get('assignedto').value !== ''
                        && this.surveyForm.get('assignedto').value !== null
                        && this.surveyForm.get('assignedto').value !== undefined
                        && this.surveyForm.get('assignedto').value !== 0
                    ) {
                        this.surveyForm.get('status').setValue('assigned');
                    }

                    this.surveyForm.get('chatid').setValue('survey' + "_" + new Date().getTime());
                    this.surveyForm.get('groupchatpassword').setValue('wattmonk' + new Date().getTime());
                    console.log('this.surveyForm.value', this.surveyForm.value);

                    this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
                        console.log('survey', survey);
                        this.utilities.hideLoading().then(() => {
                            this.surveyData = survey;
                            //this.createChatGroup(this.surveyData);
                            if (this.userData.role.type === 'surveyors') {
                                this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
                                    this.utilities.hideLoading();
                                    // this.navController.pop();
                                    modal.present();
                                    modal.onWillDismiss().then((dismissed) => {
                                        this.utilities.sethomepageSurveyRefresh(true);

                                        this.navController.navigateRoot('surveyor-overview/new-surveys');
                                        this.eventService.publish('foo:get-survey', {
                                            getSurvey: true
                                        });

                                    });
                                    // });
                                });
                            } else {
                                this.openSurveyors(survey.id, survey);
                            }
                        });

                        // this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
                        //     this.utilities.hideLoading();
                        //     // this.navController.pop();
                        //     modal.present();
                        //     modal.onWillDismiss().then((dismissed) => {
                        //         this.utilities.sethomepageSurveyRefresh(true);
                        //         if (this.userData.role.type === 'surveyors') {
                        //             this.navController.navigateRoot('surveyor-overview/new-surveys');
                        //         } else {
                        //             this.navController.navigateRoot('home/survey');
                        //         }
                        //         this.eventService.publish('foo:get-survey', {
                        //             getSurvey: true
                        //         });

                        //     });
                        //     // });
                        // });

                    },
                        responseError => {
                            this.utilities.hideLoading();
                            const error: ErrorModel = responseError.error;
                            console.log(responseError.error.message.message)
                            if (responseError.error.status == "alreadyexist") {
                                var message = responseError.error.message.message;
                                this.confirmEmail(message, "save");
                            }
                            else {
                                this.utilities.errorSnackBar(responseError.error.message.message);
                            }
                            //
                        }
                    );
                }
            });

        }
    }

    async openSurveyors(id: number, getData) {
        console.log('openSurveyors');
        this.listOfAssignees = [];
        this.reviewAssignedTo = getData.assignedto;
        if (this.listOfAssignees.length === 0) {
            this.utilities.showLoading('Getting Surveyors').then(() => {
                this.apiService.getSurveyors().subscribe(assignees => {
                    this.utilities.hideLoading().then(async () => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        const modal = await this.modalCtrl.create({
                            component: AssignPage,
                            cssClass: 'small-modal',
                            componentProps: {
                                assignedDateTime: getData.datetime,
                                surveyData: assignees,
                                memberid: id,
                                isBtnAssignText: true
                            },
                            backdropDismiss: false,
                            showBackdrop: true,

                        });
                        modal.onDidDismiss().then((data) => {
                            console.log('cancel user data', data);
                            if (data.data.isCreatGroupChat) {
                                this.createChatGroup(getData);
                                this.surveyId = id;
                                if (this.userData.role.type === 'surveyors') {
                                    this.navController.navigateRoot('surveyor-overview/new-surveys');
                                } else {
                                    this.navController.navigateRoot('home/survey');
                                }
                                this.eventService.publish('foo:get-survey', {
                                    getSurvey: true
                                });
                            } else {
                                this.getuserData = data.data;
                                if (this.getuserData != null || this.getuserData != undefined) {
                                    if (this.getuserData.id != null) {

                                        this.selectedDesigner = this.getuserData.uData;
                                        this.surveyId = getData.id;
                                        this.assignToSurveyor();
                                    }
                                } else {
                                    if (this.userData.role.type === 'surveyors') {
                                        this.navController.navigateRoot('surveyor-overview/new-surveys');
                                    } else {
                                        this.navController.navigateRoot('home/survey');
                                    }
                                    this.eventService.publish('foo:get-survey', {
                                        getSurvey: true
                                    });
                                }
                            }
                        });
                        return await modal.present();
                        // this.showBottomDraw = true;
                        // this.surveyId = id;
                        // this.utils.setBottomBarHomepage(false);
                        // this.drawerState = DrawerState.Docked;
                        // this.assignForm.patchValue({
                        //     assignedto: ''
                        // });
                    });
                }, (error) => {
                    this.utilities.hideLoading().then(() => {
                        this.utilities.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });

        } else {
            this.surveyId = id;
            this.utilities.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    }

    assignToSurveyor() {

        console.log('assignToSurveyor');
        if (this.assignForm.status === 'INVALID' && (this.surveyData.status === 'reviewassigned' || this.surveyData.status === 'reviewfailed' || this.surveyData.status === 'reviewpassed')) {
            this.utilities.errorSnackBar('Please select a analyst');
        } else if (this.assignForm.status === 'INVALID') {
            this.utilities.errorSnackBar('Please select a surveyor');
        } else if (this.reviewAssignedTo != null && (this.selectedDesigner.id == this.reviewAssignedTo.id)) {
            this.utilities.errorSnackBar("This survey request has been already assigned to" + " " + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname)

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
            this.utilities.showLoading('Assigning').then(() => {
                this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
                    console.log('value', value);

                    this.utilities.hideLoading().then(() => {
                        // this.createNewDesignChatGroup(value);
                        if (this.userData.role.type === 'surveyors') {
                            this.navController.navigateRoot('surveyor-overview/new-surveys');
                        } else {
                            this.navController.navigateRoot('home/survey');
                        }
                        this.eventService.publish('foo:get-survey', {
                            getSurvey: true
                        });

                        this.createNewDesignChatGroup(value);
                        this.addUserToGroupChat();
                        this.isclientassigning = true;
                        this.utilities.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname + ' ' + 'successfully');

                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utilities.sethomepageSurveyRefresh(true);

                    })
                }, (error) => {
                    this.utilities.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
    }

    dismissBottomSheet() {
        this.showBottomDraw = false;

        this.drawerState = DrawerState.Bottom;
        this.utilities.setBottomBarHomepage(true);
        this.listOfAssignees = [];
        // this.assignForm.get('comment').setValue("");
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


    addUserToGroupChat(): void {
        let GUID: string = this.surveyData.chatid;
        console.log('GUID', GUID);
        let UID: string = JSON.stringify(this.selectedDesigner.cometchatuid);
        console.log('UID', UID);
        let userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
        if (this.isclientassigning) {
            userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
        }
        let membersList: CometChat.GroupMember[] = [
            new CometChat.GroupMember(UID, userscope)
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

    showInvalidFormAlert() {
        let error = '';
        Object.keys(this.surveyForm.controls).forEach((key: string) => {
            const control: AbstractControl = this.surveyForm.get(key);
            if (control.invalid) {
                if (error !== '') {
                    error = error + '<br/>';
                }
                if (control.errors.required === true) {
                    if (key === 'name') {
                        error = error + 'Name is required';
                    } else if (key === 'phonenumber') {
                        error = error + 'Phone Number is required';
                    } else if (key === 'projecttype') {
                        error = error + 'Property Type is required';
                    } else if (key === 'projectsubtype') {
                        error = error + 'Property Sub Type is required';
                    }

                    else {
                        error = error + this.utilities.capitalizeWord(key) + ' is required';
                    }
                }


                if (control.errors.error !== null && control.errors.error !== undefined) {
                    error = error + control.errors.error;
                }
            }
        });

        this.utilities.showAlert(error);
    }

    getAssignees() {
        this.apiService.getSurveyors().subscribe(assignees => {
            this.listOfAssignees = [];
            assignees.forEach(item => this.listOfAssignees.push(item));

        });
    }

    getSurveyDetails() {
        this.utilities.showLoading('Getting Survey Details').then((success) => {
            this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
                this.utilities.hideLoading().then(() => {
                    this.survey = result;
                    this.fieldDisabled = true;
                    var date = this.survey.datetime;
                    var offset = date.getTimezoneOffset();
                    date.setMinutes(date.getMinutes() + offset);
                    //   var userTimezoneOffset = date.getTimezoneOffset();
                    //  date= new Date(userTimezoneOffset - date.getTime() );

                    this.surveyForm.patchValue({
                        name: this.survey.name,
                        email: this.survey.email,
                        jobtype: this.survey.jobtype,
                        phonenumber: this.survey.phonenumber,
                        surveydatetime: date.getTime(),
                        datetime: date,
                        comments: this.survey.comments == '' ? '' : this.survey.comments[0].message,
                        address: this.survey.address,
                        source: this.survey.source,
                        createdby: this.survey.createdby.id,
                        latitude: this.survey.latitude,
                        longitude: this.survey.longitude,
                        projecttype: this.survey.projecttype,
                        country: this.survey.country,
                        state: this.survey.state,
                        city: this.survey.city,
                        postalcode: this.survey.postalcode,
                        oldcommentid: this.survey.comments == '' ? '' : this.survey.comments[0].id
                    });
                    if (this.survey.assignedto !== null && this.survey.assignedto !== undefined) {
                        this.surveyForm.patchValue({
                            assignedto: this.survey.assignedto.id,
                            status: 'assigned'
                        });
                    }
                    this.utilities.setStaticAddress(this.survey.address);

                });
            }, (error) => {
                this.utilities.hideLoading();
            });
        });
    }

    assignedTo(surveyData) {

        let postData = {
            assignedto: this.userData.id,
            status: "assigned"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {

            this.router.navigate(['/start-survey/' + surveyData.id + '/' + surveyData.jobtype]);
        })


    }

    ionViewDidEnter() {
        this.autocompleteItems = [];
    }

    /* FOR SEARCH SHIPPING ADDRESS */
    updateSearchResults(event) {
        //this.autoCompleteOff = true;
        const input = event.detail.value;

        if (input === '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({
            input, componentRestrictions: {
                country: 'us'
            }
        }, (predictions, status) => {
            this.autocompleteItems = [];
            this.zone.run(() => {
                predictions.forEach((prediction) => {
                    this.autocompleteItems.push(prediction);
                });
            });
        });

        console.log('this.autocompleteItems', this.autocompleteItems);

    }

    forAutoComplete(e) {
        this.autoCompleteOff = true;
        this.isSelectSearchResult = false;

    }

    //   /* FOR SELECT SEARCH SHIPPING ADDRESS*/
    selectSearchResult(item) {
        this.utilities.showLoading('Loading').then(() => {
            this.isSelectSearchResult = true;
            this.geocoder.geocode({
                placeId: item.place_id
            }, (responses, status) => {

                this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address);
            });
            this.autocompleteItems = []
        })
    }

    getGeoEncoder(latitude, longitude, formattedAddress) {

        // this.utilities.showLoading('Loading').then(() => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result: NativeGeocoderResult[]) => {

                let add = '';
                if (formattedAddress === '') {
                    add = this.generateAddress(result[0]);
                } else {
                    add = formattedAddress;
                }
                this.utilities.hideLoading().then(() => {

                    const address: AddressModel = {
                        address: add,
                        lat: latitude,
                        long: longitude,
                        country: result[0].countryName,
                        state: result[0].administrativeArea,
                        city: result[0].locality,
                        postalcode: result[0].postalCode
                    };
                    this.utilities.setAddress(address);
                    this.addressValue();
                    //this.goBack();
                });

            })
            .catch((error: any) => {
                this.utilities.hideLoading().then(() => {
                    alert('Error getting location' + JSON.stringify(error));
                });

            });
        //  });
    }

    generateAddress(addressObj) {
        const obj = [];
        let address = '';
        for (const key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (const val in obj) {
            if (obj[val].length) {
                address += obj[val] + ', ';
            }
        }
        return address.slice(0, -2);
    }

    onCancel() {

        this.autocompleteItems = [];

    }

    addressValue() {
        // }
        this.addressSubscription = this.utilities.getAddressObservable().subscribe((address) => {


            // this.firstFormGroup.get('address').setValue('124/345');
            // this.firstFormGroup.get('latitude').setValue('24.553333');
            // this.firstFormGroup.get('longitude').setValue('80.5555555555');
            // this.firstFormGroup.get('country').setValue('india');
            // this.firstFormGroup.get('city').setValue('Lucknow');
            // this.firstFormGroup.get('state').setValue('UP');
            // this.firstFormGroup.get('postalcode').setValue(3232343);
            this.surveyForm.get('address').setValue(address.address);
            this.surveyForm.get('latitude').setValue(address.lat);
            this.surveyForm.get('longitude').setValue(address.long);
            this.surveyForm.get('country').setValue(address.country);
            this.surveyForm.get('city').setValue(address.city);
            this.surveyForm.get('state').setValue(address.state);
            this.surveyForm.get('postalcode').setValue(address.postalcode);
        }, (error) => {
            this.surveyForm.get('address').setValue('');
            this.surveyForm.get('latitude').setValue(null);
            this.surveyForm.get('longitude').setValue(null);
            this.surveyForm.get('country').setValue('');
            this.surveyForm.get('city').setValue('');
            this.surveyForm.get('state').setValue('');
            this.surveyForm.get('postalcode').setValue(null);
        });

        this.autoCompleteOff = false;



    }

    onBlur() {
        setTimeout(() => {
            this.autocompleteItems = [];
        }, 100);
    }

    // async showAlert(){
    //   await this.alertControl.create({
    //     header: "Email Already Exists!!!",
    //     message: this.SurveyResp1,
    //     buttons:[
    //       {
    //         text: "yes", handler: (res) => {
    //           console.log(this.surveyForm.value.sameemailconfirmed);
    //           this.surveyForm.value.sameemailconfirmed = true;
    //           this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
    //             this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
    //               this.utilities.hideLoading();
    //               // this.navController.pop();
    //               modal.present();
    //               modal.onWillDismiss().then((dismissed) => {
    //                 this.utilities.sethomepageSurveyRefresh(true);
    //                 if (this.userData.role.type === 'surveyors') {
    //                   this.navController.navigateRoot('surveyoroverview/newsurveys');
    //                 } else {
    //                   this.navController.navigateRoot('homepage/survey');
    //                 }

    //               });
    //               // });
    //             });

    //           },
    //             responseError => {
    //               this.utilities.hideLoading().then(() => {
    //                 var error = responseError.error;
    //                 this.utilities.errorSnackBar(error.message);
    //               });
    //               //
    //             }
    //           );

    //         }
    //       },
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         cssClass: 'secondary',
    //         handler: (blah) => {
    //           console.log('Confirm Cancel: blah');
    //         }
    //       },
    //     ]
    //   }).then(res=>res.present());
    // }

    // showurl(i){
    //     this.browser = this.iab.create(this.surveydata.prelimdesign[i].url,'_system', 'location=yes,hardwareback=yes,hidden=yes');

    // }
    async confirmEmail(message, value) {

        const toast = await this.toastController.create({
            header: message,
            message: 'Do you want to create again?',
            cssClass: 'my-custom-confirm-class',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.surveyForm.get('sameemailconfirmed').setValue(true);
                        if (value == 'save') {
                            this.saveSurvey()
                        } else {
                            this.startSurvey();
                        }
                    }
                }, {
                    text: 'No',
                    handler: () => {

                    }
                }
            ]
        });
        toast.present();
    }

    public noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespaces': true };
    }

    public trimValidator: ValidatorFn = (control: FormControl) => {
        if (control.value.startsWith(' ')) {
            return {
                'trimError': { value: 'whitespaces' }
            };
        }
        return null;
    };

    PropertyTypeOption(e) {
        this.propertytypevalue = e.target.value;
    }


    NumbersOnly(event): boolean {
        let charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    }
    /*
        changeDate(event) {
            this.surveyForm.get('date_my').setValue(moment(event.detail.value).format('d MMM YYYY'));
            this.my_date = moment(event.detail.value).format('YYYY-MM-DD');
            this.surveyForm.get('surveydatetime').setValue(new Date(this.my_date + ' ' + this.my_time).getTime());
        }
    
        changetime(event) {
            this.surveyForm.get('time_my').setValue(moment(event.detail.value).format('hh:mm'));
            this.my_time = moment(event.detail.value).format('HH:mm');
            this.surveyForm.get('surveydatetime').setValue(new Date(this.my_date + ' ' + this.my_time).getTime());
        }*/
    /* changeDate(event) {
         this.surveyForm.get('date_my').setValue(moment(event.detail.value).format('d MMM YYYY'));
         this.my_date = moment(event.detail.value).format('YYYY-MM-DD');
         var timeAndDate: any = moment(this.my_date + ' ' + this.my_time);
         this.surveyForm.get('surveydatetime').setValue(new Date(timeAndDate._d).getTime());
         console.log('this.surveyForm', this.surveyForm);
     }
     changetime(event) {
         this.surveyForm.get('time_my').setValue(moment(event.detail.value).format('hh:mm'));
         this.my_time = moment(event.detail.value).format('HH:mm');
         var timeAndDate: any = moment(this.my_date + ' ' + this.my_time);
         this.surveyForm.get('surveydatetime').setValue(new Date(timeAndDate._d).getTime());
         console.log('this.surveyForm', this.surveyForm);
     }*/

    changeDate(event) {
        console.log('changeDate', event);

        // this.surveyForm.get('date_my').setValue(moment(event.detail.value).format('d MMM YYYY'));
        this.surveyForm.get('date_my').setValue(this.datePipe.transform(new Date(event.detail.value), 'd MMM YYYY'));
        // this.surveyForm.get('date_my').setValue(moment(event.detail.value).format('d MMM YYYY'));
        this.my_date = moment(event.detail.value).format('YYYY-MM-DD');
        var timeAndDate: any = moment(this.my_date + ' ' + this.my_time);
        this.surveyForm.get('surveydatetime').setValue(new Date(timeAndDate._d).getTime());
        this.getslotsData(this.my_date);
        console.log('this.surveyForm', this.surveyForm);
    }

    changeTime(event) {
        console.log('changetime', event.detail.value);
        let hh: any = this.datePipe.transform(event.detail.value, 'hh');
        let mm: any = this.datePipe.transform(event.detail.value, 'mm');
        let timezone: any = this.datePipe.transform(event.detail.value, 'a');
        let obj: any = {
            slotname: hh + ':' + mm,
            totalSurveys: 0,
            isdisabled: false,
            value: timezone
        }

        console.log('obj', obj);

        this.slotsArr.push(obj);

        this.selectTime('', this.slotsArr.length - 1, obj.slotname, obj.slotname + ' ' + obj.value);
    }

    selectTime(event, ind, slot, time) {
        this.surveyForm.get('time_my').setValue(time);
        this.surveyForm.get('time').setValue(slot);
        for (let i = 0; i < this.slotsArr.length; i++) {
            this.slotsArr[i].isselected = false;
        }
        this.slotsArr[ind].isselected = true;

        // console.log('first', moment(this.surveyForm.get('date_my').value + ' ' + this.surveyForm.get('time_my').value));

        // var selectedDate: any = moment(this.surveyForm.get('date_my').value + ' ' + this.surveyForm.get('time_my').value).utc();
        // console.log('1 selectedDate ', selectedDate);
        // console.log('2 selectedDate ', new Date(selectedDate._d));
        // console.log('3 selectedDate ', new Date(selectedDate._d).getTime());


        // let date = new Date();
        // let myDate: String = new Date(selectedDate._d.getTime() - 
        //     date.getTimezoneOffset() * 60000).toISOString();
        // console.log('sdfsdf', new Date(selectedDate._d.getTime() + date.getTimezoneOffset() * 60000));

        // console.log('myDate', myDate);
    }

    modalOpen(type) {
        if (type === 'dateModal') {
            this.dateModal = true;
            this.timeModal = false;
        } else if (type === 'timeModal') {
            this.timeModal = true;
            this.dateModal = false;
        }
    }

    dismissModal() {
        this.timeModal = false;
        this.dateModal = false;
    }

    updateTNVal(event) {
        console.log('event', event);
        let value = event.target.value;

        var newVal = "";
        value = value.replace(/\D/g, "");
        if (0 < value.length && value.length <= 3) {
            newVal = value;
        } else if (3 < value.length && value.length <= 6) {
            newVal = value.slice(0, 3) + "-" + value.slice(3);
        } else if (6 < value.length) {
            newVal = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6, 10);
        }

        this.surveyForm.get('phonenumber').setValue(newVal);

    }

    filterByTN(startTn) {

        var actualphonenumber = "";
        if (startTn) {
            actualphonenumber = startTn.split("-");
        }
        if (startTn && actualphonenumber.length == 1) {

            actualphonenumber = "1" + actualphonenumber[0];
        }
        else if (startTn && actualphonenumber.length == 2) {
            actualphonenumber = "1" + actualphonenumber[0] + actualphonenumber[1];
        }
        else if (startTn && actualphonenumber.length == 3) {
            actualphonenumber = "1" + actualphonenumber[0] + actualphonenumber[1] + actualphonenumber[2];
        }

    }

    createChatGroup(design: DesginDataModel) {
        console.log('createChatGroup design', design);
        
        var GUID = 'survey' + "_" + new Date().getTime();

        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = design.groupchatpassword;

        var group = new CometChat.Group(GUID, groupName, groupType, password);

        CometChat.createGroup(group).then(group => {
            let membersList = [
                new CometChat.GroupMember("" + design.createdby.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
            ];
            console.log('group', group);

            let passData: any = {
                chatid: group.getGuid()
            }
            this.apiService.updateSurveyForm(passData, this.surveyId).subscribe((value) => {
            }, (error) => {
            });
            
            CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                this.cdr.detectChanges();
            })
        })
    }

    get slotsFormArray() {
        return this.surveyForm.controls.time as FormArray;
    }

    getslotsData(selecteddate) {
        this.utilities.showLoading('Loading slots').then(() => {
            console.log("Date", selecteddate);

            this.apiService.getSlots(this.storage.getParentId(), selecteddate).subscribe(slotsData => {
                this.utilities.hideLoading().then(() => {
                    console.log("SlotsData", slotsData);
                    this.setSlotsData(slotsData);
                });
            },
                responseError => {
                    this.utilities.hideLoading().then(() => {
                        const error: ErrorModel = responseError.error;
                        this.utilities.errorSnackBar(error.message);
                    });
                });
        });
    }

    setSlotsData(slotsData) {
        this.slotsArr = new Array<TimeSlotsModel>();
        for (let slot of slotsData) {
            let slotObj = new TimeSlotsModel();
            slotObj.slotname = slot.slotname;
            slotObj.totalsurvey = slot.totalSurveys;
            slotObj.isdisabled = slot.isdisabled;
            slotObj.value = slot.value;
            slotObj.isselected = false;
            this.slotsArr.push(slotObj);
        }
        console.log('Slot array', this.slotsArr);
        this.slotsArr.forEach(() => this.slotsFormArray.push(new FormControl(false)));
        this.surveyForm.setControl('timeSlots', this.formBuilder.array(this.slotsArr));
        this.surveyForm.updateValueAndValidity();

    }

    SlotTypeOption(e) {
        this.slotvalue = e.target.value;
    }

    btnAction(event, ind) {
        this.surveyForm.get('time_my').setValue(moment(event.detail.value).format('hh:mm'));
        this.my_time = moment(event.detail.value).format('HH:mm');
        var timeAndDate: any = moment(this.my_date + ' ' + this.my_time);
        this.surveyForm.get('surveydatetime').setValue(new Date(timeAndDate._d).getTime());

        console.log('this.surveyForm', this.surveyForm);
        console.log("Btn action method called");
        for (let i = 0; i < this.slotsArr.length; i++) {
            this.slotsArr[i].isselected = false;
        }
        this.slotsArr[ind].isselected = true;
    }

}
