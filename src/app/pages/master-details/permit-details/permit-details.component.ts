import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ROLES } from 'src/app/services/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
export function getFileReader(): FileReader {
  const fileReader = new FileReader();
  const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
  return zoneOriginalInstance || fileReader;
}
@Component({
  selector: 'app-permit-details',
  templateUrl: './permit-details.component.html',
  styleUrls: ['./permit-details.component.scss'],
})


export class PermitDetailsComponent implements OnInit {

    nullValue = '-';

    permitdesignId: number;
    permitdesign: any;
    // permitdesign: DesginDataModel;
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
    ispermitUpdate: boolean;
    enableDisable: boolean = false;
    exceedfileSize: any;
    permitFileSize: any;

    options: LaunchNavigatorOptions = {
        start: '',
        app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    permitFiles: File[] = [];
    permitPlanList: any = [];
    targetLength: any;
    image: string;
    timerConfig: any;
    user: User;
    commentsForm: FormGroup;
    reviewIssuesForm: FormGroup;
    //reviewIssues= new FormControl('', Validators.required);
    browser: any;
    deactivateNetworkSwitch: Subscription;
    netSwitch: boolean;
    commentbox: any;
    commentboxdata: any;
    private _link: any;
    // user: import("j:/wattmonk/mobileapp/../../model/user.model").User;
   // nullValue = '-';
    public userAccessRights: any = {};
    designerCritera: any = [];
    addcriteriacomment: string;
    isciteriacommentshow = false;
    selectedCriteria;

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
    public isClient: boolean = true;
public isUserAnalyst: boolean = false;
public isPesuperadmin: boolean = false;
public isUserPeEngineer: boolean = false;
public isBDUser: boolean = false;
loggedInUser: User;
isWattmonkadmins: boolean = false;
isUserDesigner : boolean = false ;
imageurls: any = [];

slideOptsTwo = {
    initialSlide: 0,
    speed: 400
  };

  filterPermitOnholdDesign :any = [] ;
  filterPermitUnholdDesign :any = [];
  filterPermitUnholdDesignlength: number;
  filterPermitOnholdDesignlength: number;
  isOnholdAttachments: boolean = false;
  isUnholdAttachments: boolean = false;
    constructor(
        private _element: ElementRef,
        private sanitizer: DomSanitizer,
        private utilities: UtilitiesService,
        private apiService: ApiService,
        private route: ActivatedRoute,
        private navController: NavController,
        private alertController: AlertController,
        private storage: StorageService,
        private formBuilder: FormBuilder,    private platform:Platform,
        private cdr: ChangeDetectorRef,

        private launchNavigator: LaunchNavigator,
        private toastController: ToastController,
        private imageCompress: NgxImageCompressService,
        private countdownservice: CountdownTimerService,
        private iab: InAppBrowser,
        private router: Router,
        private network: NetworkDetectService,
        private mixpanelService: MixpanelService

    ) {
        this.permitdesignId = +this.route.snapshot.paramMap.get('id');
        this.assigneeForm = this.formBuilder.group({
            designassignedto: new FormControl('', [Validators.required]),
            status: new FormControl('designassigned'),
        });

        this.commentsForm = this.formBuilder.group({
            comments: new FormControl(''),
            status: new FormControl('designcompleted'),
            permitdesign: new FormControl(null, [Validators.required])
        })

        this.reviewIssuesForm = this.formBuilder.group({
            reviewIssues: new FormControl('', [Validators.required])
        })

        // get access right permission data

        this.userAccessRights = this.utilities.getUserAccessRights('permit');
        console.log('permit this.userAccessRights', this.userAccessRights);
        //this.isClient = this.utilities.isClient();
        //this.isUserAnalyst = this.utilities.isUserAnalyst();
        //this.isWattmonkadmins = this.utilities.isWattmonkUser();
        //this.isUserDesigner = this.utilities.isUserDesigner();


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

    ionViewDidEnter() {

        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;

        })

    }

    ngOnInit() {
        this.enableDisable = false;
        this.user = this.storage.getUser();

        this.mixpanelService.track('PERMIT_DESIGN_DETAIL_PAGE_OPEN', {
        });
        //
        // this.utilities.getHomepagePermitRefresh().subscribe(()=>{})

        this.dataSubscription = this.utilities.getPermitDesignDetailsRefresh().subscribe((result) => {
            this.refreshDataOnPreviousPage++;
            this.getDesignDetails();
        });




        

    }
    showDesignImage() {
        const browser = this.iab.create(this.permitdesign.permitdesign.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showRevisionImage(attachmentFile: any) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showreasonImage(attachmentFile: any) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showurl(i, value) {
        if (value == 'attachments') {
            this.browser = this.iab.create(this.permitdesign.attachments[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        } else  if (value == 'moduleslayoutdesign') {
            this.browser = this.iab.create(this.permitdesign.designgeneralinformation.moduleslayoutdesign[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        } else {
            this.browser = this.iab.create(this.permitdesign.architecturaldesign[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        }

    }

    updatecomments() {
        if (this.commentsForm.status === 'INVALID') {
            this.utilities.errorSnackBar('Please select permit design');
            return false;
        } else {
            if (this.exceedfileSize <= 25000000 || this.permitFileSize <= 25000000) {
                var data = {}
                var date = Date.now();
                if (this.ispermitUpdate) {
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

                    this.apiService.updateDesignForm(data, this.permitdesignId).subscribe((success) => {
                        this.utilities.hideLoading().then(() => {
                            this.setData(success);
                            this.uploadpreliumdesign(this.permitdesignId, 'permitdesign');
                            // this.utilities.hideLoading().then(() => {


                            // this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " +'successfully');
                            // this.utilities.setHomepageDesignRefresh(true);

                            // this.navController.navigateRoot(['homepage']);
                        });
                    }, (error) => {
                        this.utilities.hideLoading().then(() => {
                            this.utilities.errorSnackBar('Some Error Occurred');
                        });
                    });
                })
            }
            else {
                this.utilities.errorSnackBar("File is greater than 25MB")
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
        if (this.permitdesign.status == "designassigned") {
            let cdate = new Date(this.permitdesign.designstarttime);


            cdate.setHours(cdate.getHours() + 6);
            this.countdownservice.startTimer(cdate);
        } else if (this.permitdesign.status == "reviewassigned") {
            let cdate = new Date(this.permitdesign.reviewstarttime);
            cdate.setHours(cdate.getHours() + 2);
            this.countdownservice.startTimer(cdate);
        } else if (this.permitdesign.status == 'designcompleted') {
            this.countdownservice.stopTimer();
        }

    }


    ngOnDestroy(): void {
        this.dataSubscription.unsubscribe();
        if (this.refreshDataOnPreviousPage > 1) {
            this.utilities.setHomepagePermitRefresh(true);
            this.deactivateNetworkSwitch.unsubscribe();
        }
    }

    getDesignDetails() {
        this.getAssignees();
         let type : string = 'permits'
        this.utilities.showLoading('Getting Design Details').then((success) => {
            this.apiService.getAllDesignDetails(this.permitdesignId,type).subscribe((result:any) => {
                this.utilities.hideLoading();
                //

                // this.commentboxdata = result.comments[0].message;
                //  const urlArray=  Array.from(getUrls(this.commentbox));

                //  urlArray.map(url=>{

                //    this.commentbox.replace(url,`<a href="${url}">${url}</a>`)
                //   })
                //   setTimeout(()=>{
                //     const urlData=this._element.nativeElement.querySelectorAll('a');
                //      urlData.forEach(url=>{
                //        url.addEventListener('click', (event) =>
                //           {
                //              event.preventDefault();
                //              this._link = event.target.href;
                //
                //
                //              this.openUrl(this._link);
                //           }, false);
                //      })
                //      this.commentboxdata=this.sanitizer.bypassSecurityTrustHtml(this.commentbox);
                //
                //   },2000)

                this.setData(result);
                this.timer();
            }, (error) => {
                this.utilities.hideLoading();
            });
        });
    }

    openUrl(url) {

        const browser = this.iab.create(url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }

    goBack() {
        // this.mixpanelService.track("PERMIT_DESIGN_DETAIL_PAGE_CLOSE", {
        // });
        this.navController.pop();
    }

    editDesign() {

    }

    setData(result: DesginDataModel) {
        this.permitdesign = result.data.attributes;
        console.log("this.permitdesign",this.permitdesign);
        
        if (this.permitdesign.isinrevisionstate && this.permitdesign.status == 'designassigned') {
            this.imageName = [];
        } else {
            this.imageName = result.permitdesign == null ? '' : result.permitdesign.name + result.permitdesign.ext;

        }

        if (this.permitdesign.newconstruction == true) {
            this.permitdesign.newconstruction = 'Yes';
        } else {
            this.permitdesign.newconstruction = 'No';
        }
        this.assigned = this.permitdesign.designassignedto !== null && this.permitdesign.designassignedto !== undefined;

        console.log('this.permitdesign', this.permitdesign);
        this.designerCritera = this.permitdesign?.checklistcriteria;
        if (this.permitdesign?.checklistcriteria) {
            this.designerCritera.map(item => {
                if (item && item.feedback == null) {
                    item.feedback = false
                }
            })
        } else {
            this.displayerror = true;
        }

        console.log('this.designerCritera ', this.designerCritera ); 
    
    
        this.permitdesign?.onholddesign.filter(onitem => {
            
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

          this.permitdesign?.onholddesign.filter(item => {
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
            this.apiService.deleteDesign(this.permitdesignId).subscribe((result) => {

                this.utilities.hideLoading().then(() => {
                    this.utilities.showSnackBar(this.permitdesign.name + " " + 'has been deleted successfully');
                    this.navController.pop();
                    this.utilities.setHomepagePermitRefresh(true);
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
                this.apiService.updateDesignForm(this.assigneeForm.value, this.permitdesignId).subscribe((success) => {
                    this.utilities.hideLoading().then(() => {

                        this.setData(success);
                        this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " + 'successfully');
                        this.utilities.setHomepagePermitRefresh(true);
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
        //
        this.apiService.deletePrelimImage(this.permitdesign.permitdesign.id).subscribe(_res => { })

        this.imageName = [];

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

        this.permitFiles = [];
        this.imageName = [];
        this.imagebox = false;
        this.commentsForm.get('permitdesign').setValue('');


    }
    removePermit(i){


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

        // const blob = this.utilities.getBlobFromImageData(this.permitFiles);
        //
        //  let blob= this.utilities.b64toBlob(this.image);
        //

        //

        const imageData = new FormData();
        for (var i = 0; i < this.permitFiles.length; i++) {
            imageData.append("files", this.permitFiles[i]);
            // if(i ==0){
            imageData.append('path', 'design/' + designId);
            imageData.append('refId', designId + '');
            imageData.append('ref', 'design');
            imageData.append('field', key);
            // }
        }
        this.utilities.showLoading("Permit File Uploading").then(() => {
            this.apiService.uploaddesign(imageData).subscribe(res => {
                //this.utilities.hideUploadingLoading();
                this.utilities.hideLoading().then(() => {
                    this.imagebox = false;
                    // this.getDesignDetails();
                    // this.updatecomments();
                    // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res)=>{
                    //   this.utilities.getDesignDetailsRefresh();
                    //

                    // })
                    //this.utilities.getPermitDesignDetailsRefresh();
                    if (this.ispermitUpdate) {
                        this.router.navigate(['permit-design-overview/permit-inreview-design']);
                        this.utilities.setHomepagePermitRefresh(true);

                    }
                    else if (this.isSelfUpdate) {
                        this.reportDesignReviewSuccess();
                    }
                    else {
                        this.router.navigate(['permit-design-overview/permit-completed-design'])
                        this.utilities.setHomepagePermitRefresh(true);

                    }
                    //else{
                    // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res) =>{
                    // this.utilities.getDesignDetailsRefresh();





                    // });
                    //  }
                }, err => {
                    //this.utilities.hideUploadingLoading();
                    this.utilities.hideLoading().then(() => {


                    })
                })
            })
            // })
            // }
        })

    }


    reportDesignReviewFailure() {
        //
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

            //
            this.apiService.editDesign(
                this.permitdesign.id,
                postData
            )
                .subscribe(
                    response => {
                        this.utilities.showSnackBar("Permit design status has been updated successfully.");
                        this.utilities.setHomepagePermitRefresh(true);
                        if (this.user.role.type == 'qcinspector') {
                            this.router.navigate(['analyst-overview/permit-design']);
                        }
                        else {
                            this.navController.navigateRoot(['permit-home/permit-design']);
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

        if (this.isSelfUpdate && this.permitFiles.length > 0) {
            if (this.permitFileSize <= 25000000) {
                //  this.utilities.showLoading("Uploading").then(()=>
                // {
                this.uploadpreliumdesign(this.permitdesignId, 'permitdesign');
                // })

            }
            else {
                this.utilities.errorSnackBar("File is greater than 25MB");
            }
        } else if (this.isSelfUpdate && this.permitFiles.length == 0) {
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
                this.permitdesign.id,
                postData
            )
            .subscribe(
                response => {
                    this.utilities.showSnackBar("permit design status has been updated successfully.");
                    this.utilities.setHomepagePermitRefresh(true);
                    if (this.user.role.type == 'qcinspector') {
                        this.navController.navigateRoot(['analyst-overview/permit-design']);
                    }
                    else {
                        this.navController.navigateRoot(['permit-home/permit-design']);
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

    workbyanalyst(event) {
        let checked = event.detail.checked
        if (checked) {
            console.log("workbyanalyst true");
        }
        else {
            //this.isSelfUpdate=false;
        }
    }

    removeArc(i, value) {
        this.permitPlanList.splice(i, 1);
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
        const toast = await this.alertController.create({
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

