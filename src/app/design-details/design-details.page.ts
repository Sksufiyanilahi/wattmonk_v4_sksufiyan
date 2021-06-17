import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UtilitiesService } from '../utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DesginDataModel, PrelimDesign } from '../model/design.model';
import { UserRoles } from '../model/constants';
import { AssigneeModel } from '../model/assignee.model';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CountdownTimerService, countDownTimerConfigModel, countDownTimerTexts } from 'ngx-timer';
import { User } from '../model/user.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { MixpanelService } from '../utilities/mixpanel.service';
import { ErrorModel } from '../model/error.model';



@Component({
  selector: 'app-design-details',
  templateUrl: './design-details.page.html',
  styleUrls: ['./design-details.page.scss'],
})
export class DesignDetailsPage implements OnInit, OnDestroy {

  designId: number;
  design: DesginDataModel;
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
  // user: import("j:/wattmonk/mobileapp/src/app/model/user.model").User;


  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController,
    private storage: StorageService,
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
    const browser = this.iab.create(this.design.prelimdesign.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
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
      this.router.navigate(['/schedule/salesproposal/' + design.id]);
    }
  }

  setData(result: DesginDataModel) {
    this.design = result;
    if (this.design.isinrevisionstate && this.design.status == 'designassigned') {
      this.imageName = [];
    } else {
      this.imageName = result.prelimdesign == null ? '' : result.prelimdesign.name + result.prelimdesign.ext;

    }

    if (this.design.newconstruction == true) {
      this.design.newconstruction = 'Yes';
    } else {
      this.design.newconstruction = 'No';
    }
    this.assigned = this.design.designassignedto !== null && this.design.designassignedto !== undefined;
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

  openAddressOnMap(address: string) {
    this.launchNavigator.navigate(address, this.options);
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
}
