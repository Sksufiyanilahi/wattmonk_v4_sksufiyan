import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { countDownTimerConfigModel, CountdownTimerService, countDownTimerTexts } from 'ngx-timer';
import { Subscription } from 'rxjs';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { DesginDataModel } from 'src/app/models/design.model';
import { ErrorModel } from 'src/app/models/error.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ROLES } from 'src/app/services/constants';

export function getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}

@Component({
    selector: 'app-design-details',
    templateUrl: './design-details.page.html',
    styleUrls: ['./design-details.page.scss'],
})

export class DesignDetailsPage implements OnInit, OnDestroy {

    designId: number;
    // design: DesginDataModel;
    design: any;
    permitdesign: any;

    assigned = false;
    listOfAssignees: AssigneeModel[] = [];
    dataSubscription: Subscription;
    assigneeForm: FormGroup;
    refreshDataOnPreviousPage = 0;
    imageName: string[] = [];
    imageName2: string[] = [];
    imagebox: boolean = false;
    reviewenddatetime: number;
    reviewstartdatetime: number;
    reviewIssues = '';
    isSelfUpdate: boolean;
    isprelimUpdate: boolean;
    enableDisable: boolean = false;
    prelimFileSize: number;
    // prelimFileType:any;
    ispermitUpdate: boolean;
    imageurls: any = [];
    slideOptsTwo = {
        initialSlide: 0,
        speed: 400
    };
    options: LaunchNavigatorOptions = {
        start: '',
        app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    prelimFiles: File[] = [];
    targetLength: any;
    image: string;
    timerConfig: any;
    user: User;
    commentsForm: FormGroup;
    reviewIssuesForm: FormGroup;
    //reviewIssues= new FormControl('', Validators.required);
    browser: any;
    exceedfileSize: any;
    public requestType: string = '';
    public requirementtype: string = '';
    public showComments: boolean = false;
    public isClient: boolean = true;
    // user: import("j:/wattmonk/mobileapp/src/app/model/user.model").User;
    public userAccessRights: any = {
        viewonly: true
    };
    designerCritera: any = [];
    addcriteriacomment: string;
    isciteriacommentshow = false;
    selectedCriteria;

    checklistChecked: boolean = false;
    nullValue = '-';

    isEditChecklist: boolean = false;
    commentId: number;
    qualitycheckindex: number;
    commentindex: number;
    latestcommenteditdelete: boolean = false;
    designercomment;
    checklistcomments = new FormControl("", []);
    anyalistchecklistcomments = new FormControl("", []);
    permitPlanList: any = [];
    permitFiles: File[] = [];
    permitFileSize: any;
    public isPesuperadmin: boolean = false;
    public isUserPeEngineer: boolean = false;
    public isBDUser: boolean = false;
    public displayerror: boolean = false;
    public isUserAnalyst: boolean = false;
    loggedInUser: User;
    isWattmonkadmins: boolean = false;
    isUserDesigner: boolean = false;
    filterPermitOnholdDesign :any = [] ;
    filterPermitUnholdDesign :any = [];
    filterPermitUnholdDesignlength: number;
    filterPermitOnholdDesignlength: number;
    isOnholdAttachments: boolean = false;
    isUnholdAttachments: boolean = false;
    constructor(
        private utilities: UtilitiesService,
        private apiService: ApiService,
        private route: ActivatedRoute,
        private navController: NavController,
        private alertController: AlertController,
        private storage: StorageService,
        private platform: Platform,
        private cdr: ChangeDetectorRef,

        private formBuilder: FormBuilder,
        private launchNavigator: LaunchNavigator,
        private toastController: ToastController,
        private imageCompress: NgxImageCompressService,
        private countdownservice: CountdownTimerService,
        private iab: InAppBrowser,
        private router: Router,
        private mixpanelService: MixpanelService

    ) {
        this.designId = +this.route.snapshot.paramMap.get('id');
        this.assigneeForm = this.formBuilder.group({
            designassignedto: new FormControl('', [Validators.required]),
            status: new FormControl('designassigned'),
        });

        this.commentsForm = this.formBuilder.group({
            comments: new FormControl(''),
            status: new FormControl('designcompleted'),
            prelimdesign: new FormControl(null, [Validators.required])
        })

        this.reviewIssuesForm = this.formBuilder.group({
            reviewIssues: new FormControl('', [Validators.required])
        })
        this.userAccessRights = this.utilities.getUserAccessRights('prelim');
        // this.isClient = this.utilities.isClient();

        // this.isUserAnalyst = this.utilities.isUserAnalyst();
        //this.isWattmonkadmins = this.utilities.isWattmonkUser();
        //this.isUserDesigner = this.utilities.isUserDesigner();
        /*if ((this.isClient && this.design.status == "delivered") || (this.isClient && this.user.role.id != 9) ||
          !this.isClient) {
            this.showComments = true;
        } else {
            this.showComments = false;
        }*/


        let loggedInUser = this.storage.getUser();

        if (loggedInUser.role.id == ROLES.PESuperAdmin) {
            this.isPesuperadmin = true;
        }
        if (
            loggedInUser.role.id == ROLES.ContractorSuperAdmin ||
            loggedInUser.role.id == ROLES.ContractorAdmin ||
            loggedInUser.role.id == ROLES.SuccessManager ||
            loggedInUser.role.id == ROLES.Master ||
            (loggedInUser.role.id == ROLES.TeamHead &&
                loggedInUser.parent.id != 232)
        ) {
            this.isUserDesigner = false;
            this.isClient = true;
            this.isUserAnalyst = false;
        } else if (
            loggedInUser.role.id == ROLES.SuperAdmin ||
            loggedInUser.role.id == ROLES.Admin ||
            (loggedInUser.role.id == ROLES.TeamHead &&
                loggedInUser.parent.id == 232)
        ) {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = false;
            this.isWattmonkadmins = true;
        } else if (loggedInUser.role.id == ROLES.Designer) {
            this.isUserDesigner = true;
            this.isClient = false;
            this.isUserAnalyst = false;
        } else if (loggedInUser.role.id == ROLES.Analyst) {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = true;
        } else if (loggedInUser.role.id == ROLES.Peengineer) {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = false;
            this.isUserPeEngineer = true;
        } else {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = false;
            this.isWattmonkadmins = false;
        }
        if (
            loggedInUser.role.id == ROLES.SuperAdmin ||
            loggedInUser.role.id == ROLES.Admin
        ) {
            // this.isShowReassign = true;
        }

        // loggedInUser = this.authService.currentUserValue.user
        if (loggedInUser.role.id == ROLES.ContractorSuperAdmin || loggedInUser.role.id == ROLES.ContractorAdmin || loggedInUser.role.id == ROLES.SuccessManager || loggedInUser.role.id == ROLES.Master || (loggedInUser.role.id == ROLES.TeamHead && loggedInUser.parent.id != 232)) {
            this.isUserDesigner = false;
            this.isClient = true;
            this.isUserAnalyst = false;
        } else if (
            loggedInUser.role.id == ROLES.SuperAdmin ||
            loggedInUser.role.id == ROLES.Admin ||
            (loggedInUser.role.id == ROLES.TeamHead &&
                loggedInUser.parent.id == 232)
        ) {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = false;
        } else if (loggedInUser.role.id == ROLES.Designer) {
            this.isUserDesigner = true;
            this.isClient = false;
            this.isUserAnalyst = false;
        } else if (loggedInUser.role.id == ROLES.Analyst) {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = true;
        } else if (loggedInUser.role.id == ROLES.Peengineer) {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = false;
            this.isUserPeEngineer = true;
        } else if (loggedInUser.role.id == ROLES.BD &&
            loggedInUser.parent.id == 232) {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = false;
            this.isBDUser = true;
        }
        else {
            this.isUserDesigner = false;
            this.isClient = false;
            this.isUserAnalyst = false;
        }

    }
    removePermit(i) {


    }
    removeArc(i, value) {
        this.permitPlanList.splice(i, 1);
    }
    SlideDidChange(object, slideView) {
        this.checkIfNavDisabled(object, slideView);
    }
    //Call methods to check if slide is first or last to enable disbale navigation
    checkIfNavDisabled(object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
    }

    checkisBeginning(object, slideView) {
        slideView.isBeginning().then((istrue) => {
            object.isBeginningSlide = istrue;
        });
    }
    checkisEnd(object, slideView) {
        slideView.isEnd().then((istrue) => {
            object.isEndSlide = istrue;
        });
    }
    permitfiles(event) {



        // for(var i=0; i< event.target.files.length;i++){
        // this.permitFiles.push(event.target.files)
        this.permitFiles = event.target.files;
        this.imageName = event.target.files[0].name;
        this.exceedfileSize = event.target.files[0].size;
        this.imagebox = true;
        // }

        this.targetLength = event.target.files.length;


        for (let i = 0; i < event.target.files.length; i++) {

            this.getFiletype(event.target.files[i]);
            // this.permitFiles.push(event.target.files[i])
            // var reader = new FileReader();
            let reader = getFileReader();
            reader.onload = (e: any) => {
                if (event.target.files[i].name.includes('.png') || event.target.files[i].name.includes('.jpeg') || event.target.files[i].name.includes('.jpg') || event.target.files[i].name.includes('.gif')) {

                    this.imageurls.push(e.target.result);
                } else {
                    this.imageurls.push('/assets/icon/file.png');
                }
                this.cdr.detectChanges();
            }
            reader.readAsDataURL(event.target.files[i]);
        }
    }
    getFiletype(file) {
        var extension = file.name.substring(file.name.lastIndexOf('.'));
        var mimetype = this.utilities.getMimetype(extension);
        window.console.log(extension, mimetype);
        // var data = new Blob([file], {
        //   type: mimetype
        // });
        // console.log(data);
        // let replaceFile = new File([data], file.name, { type: mimetype })

        this.cdr.detectChanges();
    }
    permitupdate(event) {
        //
        //
        for (var i = 0; i < event.target.files.length; i++) {
            this.permitPlanList.push(event.target.files[i])
        }
        // for(var i=0; i< event.target.files.length;i++){
        // this.permitFiles.push(event.target.files)
        this.permitFiles = event.target.files;
        this.permitFileSize = event.target.files[0].size;
        //this.imageName= event.target.files[0].name;
        //this.imagebox= true;
        // }
        //

        this.targetLength = event.target.files.length;



        var reader = new FileReader();
        reader.onload = (event: any) => {
            var orientation = -1;
            let localUrl = event.target.result;
            // this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
            //
            // this.image= res;
            this.imageCompress.compressFile(localUrl, orientation, 500, 500).then(
                result => {
                    this.image = result;
                    console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
                }
            );

            // })
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    workbyanalyst(event) {
        let checked = event.detail.checked
        if (checked) {
            console.log("workbyanalyst true");
        }
        else {
            //this.isSelfUpdate=false;
        }
    }
    ngOnInit() {
        this.enableDisable = false;
        this.user = this.storage.getUser();
        this.mixpanelService.track('PRELIM_DESIGN_DETAIL_PAGE_OPEN', {
        });

        this.dataSubscription = this.utilities.getDesignDetailsRefresh().subscribe((result) => {
            this.refreshDataOnPreviousPage++;
            this.getDesignDetails();
        });

    }
    showDesignImage() {
        if (this.design.requirementtype == 'permit') {
            const browser = this.iab.create(this.design.permitdesign.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        }
        else {

            const browser = this.iab.create(this.design.prelimdesign.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        }


    }
    showRevisionImage(attachmentFile: any) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showreasonImage(attachmentFile: any) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showurl(i, value) {
        if (value == 'attachments') {
            this.browser = this.iab.create(this.design.attachments[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        }else  if (value == 'moduleslayoutdesign') {
            this.browser = this.iab.create(this.permitdesign.designgeneralinformation.moduleslayoutdesign[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        } else {
            this.browser = this.iab.create(this.design.architecturaldesign[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        }

    }

    updatecomments() {
        if (this.commentsForm.status === 'INVALID') {
            this.utilities.errorSnackBar('Please select prelim design');
            return false;
        } else {
            if (this.exceedfileSize <= 25000000 || this.prelimFileSize <= 25000000) {
                var data = {}
                var date = Date.now();
                if (this.isprelimUpdate) {
                    data = {
                        status: "reviewassigned",
                        designendtime: date,
                        reviewstarttime: date,
                        comments: this.commentsForm.get('comments').value
                    }
                } else {
                    data = {
                        status: "designcompleted",
                        designendtime: date,
                        reviewstarttime: date,
                        comments: this.commentsForm.get('comments').value

                    }
                }

                this.utilities.showLoading('Submitting').then(() => {

                    this.apiService.updateDesignForm(data, this.designId).subscribe((success) => {
                        this.utilities.hideLoading().then(() => {
                            this.setData(success);
                            this.uploadpreliumdesign(this.designId, 'prelimdesign');
                            // this.utilities.hideLoading().then(() => {

                            // this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " +'successfully');
                            // this.utilities.setHomepageDesignRefresh(true);
                            //   this.utilities.getDesignDetailsRefresh();
                            //   if(this.isprelimUpdate){
                            //     this.utilities.setHomepageDesignRefresh(true);
                            //     // this.router.navigate(['designoverview/inreviewdesigns']);
                            //     this.navController.pop();

                            //   }

                            //   else
                            //   {
                            //     this.utilities.setHomepageDesignRefresh(true);
                            //     //this.router.navigate(['designoverview/completeddesigns'])
                            //   this.navController.pop();
                            // }
                            // this.navController.navigateRoot(['homepage']);
                        });
                    }, (error) => {
                        this.utilities.hideLoading().then(() => {
                            this.utilities.errorSnackBar('Some Error Occurred');
                        });
                    });
                })
            } else {
                this.utilities.errorSnackBar("File is greater than 25MB");
            }
        }
    }


    timer() {
        //countUpTimerConfigModel
        this.timerConfig = new countDownTimerConfigModel();

        //custom class
        this.timerConfig.timerClass = 'remainingtimerclass';

        //timer text values
        this.timerConfig.timerTexts = new countDownTimerTexts();
        this.timerConfig.timerTexts.hourText = " :"; //default - hh
        this.timerConfig.timerTexts.minuteText = " :"; //default - mm
        this.timerConfig.timerTexts.secondsText = " "; //default - ss
        if (this.design.status == "designassigned") {
            let cdate = new Date(this.design.designstarttime);

            cdate.setHours(cdate.getHours() + 2);
            this.countdownservice.startTimer(cdate);
        } else if (this.design.status == "reviewassigned") {
            let cdate = new Date(this.design.reviewstarttime);
            cdate.setMinutes(cdate.getMinutes() + 15);
            this.countdownservice.startTimer(cdate);
        } else if (this.design.status == 'designcompleted') {
            this.countdownservice.stopTimer();
        }

    }


    ngOnDestroy(): void {
        this.dataSubscription.unsubscribe();
        if (this.refreshDataOnPreviousPage > 1) {
            this.utilities.setHomepageDesignRefresh(true);
        }
    }

    getDesignDetails() {
        this.getAssignees();

        this.utilities.showLoading('Getting Design Details').then((success) => {
            this.apiService.getDesginDetail(this.designId).subscribe((result) => {
                this.utilities.hideLoading();
                this.setData(result);
                this.utilities.setDesignDetails(result);
                this.timer();
            }, (error) => {
                this.utilities.hideLoading();
            });
        });
    }

    goBack() {
        this.mixpanelService.track("PRELIM_DESIGN_DETAIL_PAGE_CLOSE", {
        });
        this.navController.pop();
    }

    editDesign() {

    }

    scheduleRoute(design) {
        if (design.requirementtype == "assessment") {
            this.router.navigate(['/schedule/design/' + design.id]);
        }
        else if (design.requirementtype == 'proposal') {
            this.router.navigate(['/schedule/sales-proposal/' + design.id]);
        }
    }

    setData(result: DesginDataModel) {
        this.design = result;
        if (this.design.requirementtype == 'proposal' || this.design.requirementtype == 'assessment') {
            if (this.design.isinrevisionstate && this.design.status == 'designassigned') {
                this.imageName = [];
            } else {
                this.imageName = result.prelimdesign == null ? '' : result.prelimdesign.name + result.prelimdesign.ext;

            }
        } else if (this.design.requirementtype == 'permit') {

            if (this.design.isinrevisionstate && this.design.status == 'designassigned') {
                this.imageName = [];
            } else {
                this.imageName = result.permitdesign == null ? '' : result.permitdesign.name + result.prelimdesign.ext;

            }


        }

        if (this.design.newconstruction == true) {
            this.design.newconstruction = 'Yes';
        } else {
            this.design.newconstruction = 'No';
        }
        this.assigned = this.design.designassignedto !== null && this.design.designassignedto !== undefined;
        console.log('this.design', this.design);

        this.requestType = this.design.requesttype;
        this.requirementtype = this.design.requirementtype;
        //this.isClient = this.utilities.isClient();

        if ((this.isClient && this.design.status == 'delivered') || (this.isClient && this.user.role.id != 8 && this.user.role.id != 9 && this.user.role.id != 10) ||
            !this.isClient) {
            this.showComments = true;
        } else {
            this.showComments = false;
        }

        this.design?.onholddesign.filter(onitem => {
            
            if (onitem.status == 'onhold') {

                if (onitem.file.length) {
                    this.isOnholdAttachments = true;
                  }else{

                    this.isOnholdAttachments = false;
                  }
             this.filterPermitOnholdDesign.push(onitem);
             console.log(this.filterPermitOnholdDesign);
           }
         })

         this.design?.onholddesign.filter(item => {
           if (item.status == 'unhold') {
            if (item.file.length) {
                this.isUnholdAttachments = true;
              }else{

                this.isUnholdAttachments = false;
              }
             this.filterPermitUnholdDesign.push(item);
           }
         })
   


        this.designerCritera = this.design?.checklistcriteria;
        if (this.design?.checklistcriteria) {
            this.designerCritera.map(item => {
                if (item && item.feedback == null) {
                    item.feedback = false
                }
            })
        } else {
            this.displayerror = true;
        }

        console.log('this.prelimCriteria ', this.designerCritera);
        console.log('status', this.design.status);


    }

    async deleteDesign() {
        this.enableDisable = true;
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

    deleteDesignFromServer() {
        this.utilities.showLoading('Deleting Design').then((success) => {
            this.apiService.deleteDesign(this.designId).subscribe((result) => {
                this.utilities.hideLoading().then(() => {
                    this.utilities.showSnackBar(this.design.name + " " + 'has been deleted successfully');
                    this.navController.pop();
                    this.utilities.setHomepageDesignRefresh(true);
                });
            }, (error) => {
                this.utilities.hideLoading().then(() => {
                    this.utilities.errorSnackBar('Some Error Occurred');
                });

            });
        });
    }

    getAssignees() {

        this.apiService.getDesigners().subscribe(assignees => {
            this.listOfAssignees = [];
            assignees.forEach(item => this.listOfAssignees.push(item));
        });
    }

    updateAssignee() {
        if (this.assigneeForm.status === 'INVALID') {
            this.utilities.errorSnackBar('Please select an assignee');
        } else {
            this.utilities.showLoading('Updating').then(() => {
                this.apiService.updateDesignForm(this.assigneeForm.value, this.designId).subscribe((success) => {
                    this.utilities.hideLoading().then(() => {
                        this.setData(success);
                        this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " + 'successfully');
                        this.utilities.setHomepageDesignRefresh(true);
                        this.navController.navigateRoot(['homepage']);
                    });
                }, (error) => {
                    this.utilities.hideLoading().then(() => {
                        this.utilities.errorSnackBar('Some Error Occurred');
                    });
                });
            });

        }
    }
    openAddressOnMap(address: string, event, latitude, longitude) {
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

    showuploadbox() {
        this.apiService.deletePrelimImage(this.design.prelimdesign.id).subscribe(_res => { })
        this.imageName = [];

    }

    prelimfiles(event) {


        // for(var i=0; i< event.target.files.length;i++){
        // this.prelimFiles.push(event.target.files)
        this.prelimFiles = event.target.files;
        this.imageName = event.target.files[0].name;
        this.imagebox = true;
        this.exceedfileSize = event.target.files[0].size;
        //this.prelimFileType = event.target.files[0].type;
        // }

        this.targetLength = event.target.files.length;



        var reader = new FileReader();
        reader.onload = (event: any) => {
            var orientation = -1;
            let localUrl = event.target.result;
            // this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
            // this.image= res;
            this.imageCompress.compressFile(localUrl, orientation, 500, 500).then(
                result => {
                    this.image = result;
                    console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
                }
            );

            // })
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    remove() {

        this.prelimFiles = [];
        this.imageName = [];
        this.imagebox = false;

        this.commentsForm.get('prelimdesign').setValue('');


    }

    prelimupdate(event) {
        // for(var i=0; i< event.target.files.length;i++){
        // this.prelimFiles.push(event.target.files)
        this.prelimFiles = event.target.files;
        this.prelimFileSize = event.target.files[0].size;
        //this.imageName= event.target.files[0].name;
        //this.imagebox= true;
        // }

        this.targetLength = event.target.files.length;



        var reader = new FileReader();
        reader.onload = (event: any) => {
            var orientation = -1;
            let localUrl = event.target.result;
            // this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
            // this.image= res;
            this.imageCompress.compressFile(localUrl, orientation, 500, 500).then(
                result => {
                    this.image = result;
                    console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
                }
            );

            // })
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    b64toBlobb = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    uploadpreliumdesign(designId?: number, key?: string) {

        // else{

        // const blob = this.utilities.getBlobFromImageData(this.prelimFiles);
        //  let blob= this.utilities.b64toBlob(this.image);

        const imageData = new FormData();
        for (var i = 0; i < this.prelimFiles.length; i++) {
            imageData.append("files", this.prelimFiles[i]);
            // if(i ==0){
            imageData.append('path', 'design/' + designId);
            imageData.append('refId', designId + '');
            imageData.append('ref', 'design');
            imageData.append('field', key);
            // }
        }
        this.utilities.showLoading("Prelim File Uploading").then(() => {
            this.apiService.uploaddesign(imageData).subscribe(res => {
                // this.utilities.hideUploadingLoading();
                this.utilities.hideLoading().then(() => {
                    this.imagebox = false;
                    // this.getDesignDetails();
                    // this.updatecomments();
                    // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res)=>{
                    //   this.utilities.getDesignDetailsRefresh();

                    // })
                    //this.utilities.getDesignDetailsRefresh();
                    if (this.isprelimUpdate) {
                        // this.router.navigate(['designoverview/inreviewdesigns']);
                        this.navController.pop();
                        this.utilities.setHomepageDesignRefresh(true);

                    }
                    else if (this.isSelfUpdate) {
                        this.reportDesignReviewSuccess();
                    }
                    else {
                        this.utilities.setHomepageDesignRefresh(true);
                        //this.router.navigate(['designoverview/completeddesigns'])
                        this.navController.pop();
                    }
                    //else{
                    // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res) =>{
                    // this.utilities.getDesignDetailsRefresh();
                    // });
                    //  }
                }, err => {
                    this.utilities.hideLoading().then(() => {

                    })
                })
            }, responseError => {
                // this.utilities.hideLoading();
                this.utilities.hideUploadingLoading();
                const error: ErrorModel = responseError.error;
                this.utilities.errorSnackBar(error.message[0].messages[0].message);
            })
            // })
            // }
        })

    }


    reportDesignReviewFailure() {
        if (this.reviewIssuesForm.valid) {
            this.countdownservice.stopTimer();
            let cdate = Date.now();
            this.reviewenddatetime = cdate;
            const postData = {
                status: "reviewfailed",
                reviewissues: this.reviewIssuesForm.get('reviewIssues').value,
                reviewstarttime: this.reviewstartdatetime,
                reviewendtime: this.reviewenddatetime,

            };

            this.apiService.editDesign(
                this.design.id,
                postData
            )
                .subscribe(
                    response => {
                        this.utilities.showSnackBar("Prelim design status has been updated successfully.");
                        this.utilities.setHomepageDesignRefresh(true);
                        if (this.user.role.type == 'qcinspector') {
                            this.navController.navigateRoot(['analystoverview/design']);
                        }
                        else {
                            this.navController.navigateRoot(['homepage/design']);
                        }
                        //this.data.triggerEditEvent = false;
                        //this.dialogRef.close(this.data);
                    },
                    error => {
                        this.utilities.errorSnackBar(

                            "Error"
                        );
                    }
                );
        } else {
            this.utilities.errorSnackBar("Please enter issues");
            this.reviewIssuesForm.markAsTouched();
            this.reviewIssuesForm.markAsDirty();
        }
    }


    designReviewSuccess() {

        if (this.isSelfUpdate && this.prelimFiles.length > 0) {
            if (this.prelimFileSize <= 25000000) {
                // this.utilities.showLoading("Uploading").then(()=>
                this.uploadpreliumdesign(this.designId, 'permitdesign');//})
            } else {
                this.utilities.errorSnackBar("File is greater than 25MB")
            }


        } else if (this.isSelfUpdate && this.prelimFiles.length == 0) {
            this.utilities.errorSnackBar("Please attach file");
        } else {
            this.reportDesignReviewSuccess();
        }
    }

    reportDesignReviewSuccess() {
        this.countdownservice.stopTimer();
        let cdate = Date.now();
        this.reviewenddatetime = cdate;
        const postData = {
            status: "reviewpassed",
            reviewissues: this.reviewIssuesForm.get('reviewIssues').value,
            reviewstarttime: this.reviewstartdatetime,
            reviewendtime: this.reviewenddatetime
        };
        this.apiService
            .editDesign(
                this.design.id,
                postData
            )
            .subscribe(
                response => {
                    this.utilities.showSnackBar("Prelim design status has been updated successfully.");
                    this.utilities.setHomepageDesignRefresh(true);
                    if (this.user.role.type == 'qcinspector') {
                        this.navController.navigateRoot(['analystoverview/design']);
                    }
                    else {
                        this.navController.navigateRoot(['homepage/design']);
                    }
                    // this.triggerEditEvent = false;
                    //this.dialogRef.close(this.data);
                },
                error => {
                    this.utilities.errorSnackBar(
                        "Error"
                    );
                }
            );
    }

    ionViewWillLeave() {
    }

    updateCriteriaPrelimChecklist(index?) {

        console.log('update' + this.selectedCriteria.designercomment);
        let postData;
        if (this.user.role.id == 8) {
            //  let commented;

            if (this.selectedCriteria.designercomment || (!this.selectedCriteria.feedback && this.designercomment.length)) {
                // commented=true;
                postData = {
                    comment: this.selectedCriteria.designercomment,
                    feedback: this.selectedCriteria.feedback,
                    designerid: this.user.id,
                    completedby: "designer",
                    commented: true
                }
            }
            else {
                //  commented=false;
                postData = {
                    comment: this.selectedCriteria.designercomment,
                    feedback: this.selectedCriteria.feedback,
                    designerid: this.user.id,
                    completedby: "designer",
                    commented: false
                }
            }


        }
        if (this.user.role.id == 10 || this.user.role.id == 4 || this.user.role.id == 5 || this.user.role.id === 24) {
            let commented;
            if (this.selectedCriteria.designercomment) {
                commented = true;
            }
            else {
                commented = false;
            }

            postData = {
                comment: this.selectedCriteria.analystcomment,
                feedback: this.selectedCriteria.feedback,
                analystid: this.user.id,
                completedby: "qcinspector",
                commented: commented
            };
        }

        this.apiService.updateChecklistCriteria(this.selectedCriteria.id, postData).subscribe(
            response => {

                this.latestcommenteditdelete = true;

                // this.designerCritera[index].comments = response.comments;
                // this.designerCritera[index].commented = response.commented;
                //this.cdv.detectChanges();
            }
        )

    }

    onSaveCritetria(item, i) {
        console.log('save item' + item.id + 'i=' + i);
        this.selectedCriteria = item;
        console.log(this.user.role.type + '+/' + this.selectedCriteria.id);
        this.selectedCriteria.completedby = this.user.role.type;

        this.designerCritera.forEach(ele => {
            if (ele.id == this.selectedCriteria.id) {
                console.log(ele.id)
                this.designercomment = ele.comments;
                console.log(this.designercomment)
            }
        })
        if (this.user.role.id == 8) {
            if (this.selectedCriteria.feedback) {
                this.selectedCriteria.designercomment = "";
                this.isciteriacommentshow = false;
                this.updateCriteriaPrelimChecklist(i);
            }
            else if (!this.selectedCriteria.feedback && this.checklistcomments.value.trim().length > 0) {
                this.selectedCriteria.designercomment = this.checklistcomments.value
                this.updateCriteriaPrelimChecklist(i)
                this.isciteriacommentshow = false
            }

            else {
                // console.log("uncheck")
                if (!this.selectedCriteria.feedback && this.designercomment.length) {
                    this.updateCriteriaPrelimChecklist(i);
                }
                // this.notifyService.showError("Please check the criteria or give a comment", "Error")
            }
        }
        if (this.user.role.id == 10 || this.user.role.id == 4 || this.user.role.id == 5 || this.user.role.id == 24) {
            if (this.selectedCriteria.feedback) {
                this.selectedCriteria.analystcomment = "";
                this.isciteriacommentshow = false;
                this.updateCriteriaPrelimChecklist(i)
            }
            else if (!this.selectedCriteria.feedback && this.anyalistchecklistcomments.value.trim().length > 0) {
                this.selectedCriteria.analystcomment = this.anyalistchecklistcomments.value
                this.updateCriteriaPrelimChecklist(i)
                this.isciteriacommentshow = false
            }
            else {

                // this.notifyService.showError("Please check the criteria or give a comment", "Error");
            }
        }



        this.checklistcomments.patchValue(" ");
        this.anyalistchecklistcomments.patchValue("");
    }


    ShowCommentCriteria(item) {

        console.log('commentshow' + item.id);
        //this.anyalistchecklistcomments.setValue("");
        this.checklistcomments.setValue("");
        this.selectedCriteria = item;
        this.isciteriacommentshow = true;
        console.log(this.selectedCriteria.id + 'commentshow' + item.id);
    }
    editChecklistComment(comment, qualitycheckindex, commentindex, item) {

        this.selectedCriteria = item;
        this.isEditChecklist = true;
        this.commentId = comment.id;
        console.log('commentshow' + this.commentId);
        this.qualitycheckindex = qualitycheckindex;
        this.commentindex = commentindex;
        this.checklistcomments.patchValue(comment.message);
    }

    editChecklistCommentForAnalyst(
        comment,
        qualitycheckindex,
        commentindex,
        item
    ): void {
        this.selectedCriteria = item;
        this.isEditChecklist = true;
        this.commentId = comment.id;
        this.qualitycheckindex = qualitycheckindex;
        this.commentindex = commentindex;
        // this.anyalistchecklistcomments.patchValue(comment.message);
    }

    async deleteChecklistComment(comment, qualitycheckindex, commentindex) {

        console.log('comm_id' + comment.id);


        const toast = await this.toastController.create({
            header: 'Delete Comment',
            message: 'Are you sure you want to delete this comment?',
            cssClass: 'my-custom-delete-class',
            buttons: [
                {
                    text: 'Delete',
                    handler: () => {
                        this.apiService.deleteComment(comment.id).subscribe(() => {
                            this.designerCritera[qualitycheckindex].comments.splice(commentindex, 1);
                            /// this.loaderService.hide();
                        });
                        console.log('Favorite clicked');
                    }
                }, {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();

    }

    onEditComments() {
        console.log('edit');
        let postData;

        if (this.user.role.id == 8) {
            postData = {
                message: this.checklistcomments.value
            }
        }
        else if (this.user.role.id == 10 || this.user.role.id == 5 || this.user.role.id === 4 || this.user.role.id === 24) {
            postData = {
                message: this.anyalistchecklistcomments.value
            }
        }
        this.apiService.editComments(this.commentId, postData).subscribe((res: any) => {
            this.isEditChecklist = false;
            this.isciteriacommentshow = false;
            this.designerCritera[this.qualitycheckindex].comments[this.commentindex].message = res.message;
        })
    }

    onCancelCriteria(): void {
        this.checklistcomments.patchValue(" ");
        this.anyalistchecklistcomments.patchValue("");
        this.isciteriacommentshow = false;
        this.isEditChecklist = false;
    }
}
