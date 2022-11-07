import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { countDownTimerConfigModel, CountdownTimerService, countDownTimerTexts } from 'ngx-timer';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController , Platform} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DesginDataModel} from 'src/app/models/design.model';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ErrorModel } from 'src/app/models/error.model';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ROLES } from 'src/app/services/constants';

@Component({
  selector: 'app-prelim-details',
  templateUrl: './prelim-details.component.html',
  styleUrls: ['./prelim-details.component.scss'],
})



export class PrelimDetailsComponent implements OnInit {

    loggedInUser: User;
    prelimdesignId: number;
    prelimdesign: any;
    // prelimdesign: DesginDataModel;
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
    // user: import("j:/wattmonk/mobileapp/../../model/user.model").User;
    public nullValue = '-';
    public userAccessRights: any = {};
    public isUserDesigner: boolean = false;
    public isWattmonkUser:boolean = false;
    public showComments: boolean = false;
    public isClient: boolean = false;

    prelimCriteria: any = [];
    addcriteriacomment: string;
    isciteriacommentshow = false;
    selectedCriteria;
    designerCritera: any = [];

    checklistChecked: boolean = false;

    isEditChecklist: boolean = false;
    commentId: number;
    qualitycheckindex: number;
    commentindex: number;
    latestcommenteditdelete: boolean = false;
    designercomment;
    checklistcomments = new FormControl("", []);
    anyalistchecklistcomments = new FormControl("", []);
    public displayerror: boolean = false;
    public isUserAnalyst: boolean = false;
    public isPesuperadmin: boolean = false;
    public isUserPeEngineer: boolean = false;
    public isBDUser: boolean = false;
    public isWattmonkadmins: boolean = false;
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
        private formBuilder: FormBuilder,    private platform:Platform,

        private launchNavigator: LaunchNavigator,
        private toastController: ToastController,
        private imageCompress: NgxImageCompressService,
        private countdownservice: CountdownTimerService,
        private iab: InAppBrowser,
        private router: Router,
        private mixpanelService: MixpanelService

    ) {
        this.prelimdesignId = +this.route.snapshot.paramMap.get('id');
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
        // get access right permission data
        this.userAccessRights = this.utilities.getUserAccessRights('prelim');
        //this.isUserDesigner = this.utilities.isUserDesigner();this.isUserAnalyst = this.utilities.isUserAnalyst();
        //this.isWattmonkadmins = this.utilities.isWattmonkUser();
        //
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
        const browser = this.iab.create(this.prelimdesign.prelimdesign.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showRevisionImage(attachmentFile: any) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showreasonImage(attachmentFile: any) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showurl(i, value) {
        if (value == 'attachments') {
            this.browser = this.iab.create(this.prelimdesign.attachments[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        } else {
            this.browser = this.iab.create(this.prelimdesign.architecturaldesign[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
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

                    this.apiService.updateDesignForm(data, this.prelimdesignId).subscribe((success) => {
                        this.utilities.hideLoading().then(() => {
                            this.setData(success);
                            this.uploadpreliumdesign(this.prelimdesignId, 'prelimdesign');
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
        if (this.prelimdesign.status == "designassigned") {
            let cdate = new Date(this.prelimdesign.designstarttime);

            cdate.setHours(cdate.getHours() + 2);
            this.countdownservice.startTimer(cdate);
        } else if (this.prelimdesign.status == "reviewassigned") {
            let cdate = new Date(this.prelimdesign.reviewstarttime);
            cdate.setMinutes(cdate.getMinutes() + 15);
            this.countdownservice.startTimer(cdate);
        } else if (this.prelimdesign.status == 'designcompleted') {
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
         let type: string = 'prelims'
        this.utilities.showLoading('Getting Design Details').then((success) => {
            this.apiService.getAllDesignDetails(this.prelimdesignId,type).subscribe((result:any) => {
                console.log('getDesignDetails result', result);

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
        this.prelimdesign = result.data.attributes;
        console.log('DATA FROM FROM PELIM PAGE',this.prelimdesign);
        
        if (this.prelimdesign.isinrevisionstate && this.prelimdesign.status == 'designassigned') {
            this.imageName = [];
        } else {
            this.imageName = result.prelimdesign == null ? '' : result.prelimdesign.name + result.prelimdesign.ext;

        }

        if (this.prelimdesign.newconstruction == true) {
            this.prelimdesign.newconstruction = 'Yes';
        } else {
            this.prelimdesign.newconstruction = 'No';
        }
        this.assigned = this.prelimdesign.designassignedto !== null && this.prelimdesign.designassignedto !== undefined;

        // if (this.user.role.id == 7 || this.user.role.id == 6 || this.user.role.id == 30 || this.user.role.id == 15 || (this.user.role.id == 24 && this.user.parent.id != 232)) {
        //   this.isClient = true;
        // } else {
        //   this.isClient = false;
        // }
        //this.isClient = this.utilities.isClient();

        if ((this.isClient && this.prelimdesign.status == "delivered") || (this.isClient && this.user.role.id != 9) ||
          !this.isClient) {
            this.showComments = true;
        } else {
            this.showComments = false;
        }

        this.prelimCriteria = this.prelimdesign?.checklistcriteria;
        if (this.prelimdesign?.checklistcriteria) {
            this.prelimCriteria.map(item => {
                if (item && item.feedback == null) {
                    item.feedback = false
                }
            })
        } else {
            this.displayerror = true;
        }

        console.log('this.prelimCriteria ', this.prelimCriteria );
        console.log('status',this.prelimdesign.status);


        
        this.prelimdesign?.onholddesign.filter(onitem => {
            
            if (onitem.status == 'onhold') {

                if (onitem.file.length ) {
                    this.isOnholdAttachments = true;
                  }else{

                    this.isOnholdAttachments = false;
                  }
             this.filterPermitOnholdDesign.push(onitem);
             console.log(this.filterPermitOnholdDesign);
           }
         })

         this.prelimdesign?.onholddesign.filter(item => {
           if (item.status == 'unhold') {
            if (item.file.length) {
                this.isUnholdAttachments = true;
              }else{

                this.isUnholdAttachments = false;
              }
             this.filterPermitUnholdDesign.push(item);
           }
         })
        
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
            this.apiService.deleteDesign(this.prelimdesignId).subscribe((result) => {
                this.utilities.hideLoading().then(() => {
                    this.utilities.showSnackBar(this.prelimdesign.name + " " + 'has been deleted successfully');
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
                this.apiService.updateDesignForm(this.assigneeForm.value, this.prelimdesignId).subscribe((success) => {
                    this.utilities.hideLoading().then(() => {
                        this.setData(success);
                        this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " + 'successfully');
                        this.utilities.setHomepageDesignRefresh(true);
                        this.navController.navigateRoot(['home']);
                    });
                }, (error) => {
                    this.utilities.hideLoading().then(() => {
                        this.utilities.errorSnackBar('Some Error Occurred');
                    });
                });
            });

        }
    }

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

    showuploadbox() {
        this.apiService.deletePrelimImage(this.prelimdesign.prelimdesign.id).subscribe(_res => { })
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
                    // this.apiService.updateDesignForm({"status":'designcompleted'},this.prelimdesignId).subscribe((res)=>{
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
                    // this.apiService.updateDesignForm({"status":'designcompleted'},this.prelimdesignId).subscribe((res) =>{
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



            // console.log("this is"+ this.reviewstartdatetime);
            this.apiService.editDesign(
                this.prelimdesign.id,
                postData
            )
                .subscribe(
                    response => {
                        this.utilities.showSnackBar("Prelim design status has been updated successfully.");
                        this.utilities.setHomepageDesignRefresh(true);
                        if (this.user.role.type == 'qcinspector') {
                            this.navController.navigateRoot(['analyst-overview/design']);
                        }
                        else {
                            this.navController.navigateRoot(['home/design']);
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
                this.uploadpreliumdesign(this.prelimdesignId, 'permitdesign');//})
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
                this.prelimdesign.id,
                postData
            )
            .subscribe(
                response => {
                    this.utilities.showSnackBar("Prelim design status has been updated successfully.");
                    this.utilities.setHomepageDesignRefresh(true);
                    if (this.user.role.type == 'qcinspector') {
                        this.navController.navigateRoot(['analyst-overview/design']);
                    }
                    else {
                        this.navController.navigateRoot(['home/design']);
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

                // this.prelimCriteria[index].comments = response.comments;
                // this.prelimCriteria[index].commented = response.commented;
                //this.cdv.detectChanges();
            }
        )

    }

    onSaveCritetriaPrelimChecklist(item, i) {
        console.log('save item' + item.id + 'i=' + i);
        this.selectedCriteria = item;
        console.log(this.user.role.type + '+/' + this.selectedCriteria.id);
        this.selectedCriteria.completedby = this.user.role.type;

        this.prelimCriteria.forEach(ele => {
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

    async deleteChecklistCommentPrelimChecklist(comment, qualitycheckindex, commentindex) {

        console.log('comm_id' + comment.id);


        const toast = await this.alertController.create({
            header: 'Delete Comment',
            message: 'Are you sure you want to delete this comment?',
            cssClass: 'my-custom-delete-class',
            buttons: [
                {
                    text: 'Delete',
                    handler: () => {
                        console.log('Delete clicked');
                        this.apiService.deleteComment(comment.id).subscribe(() => {
                            this.prelimCriteria[qualitycheckindex].comments.splice(commentindex, 1);
                            /// this.loaderService.hide();
                        });
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

    onEditCommentsPrelimChecklist() {
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
            this.prelimCriteria[this.qualitycheckindex].comments[this.commentindex].message = res.message;
        })
    }

    onCancelCriteria(): void {
        this.checklistcomments.patchValue(" ");
        this.anyalistchecklistcomments.patchValue("");
        this.isciteriacommentshow = false;
        this.isEditChecklist = false;
    }
    

}

